var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    socketio   = require('socket.io'),
    _          = require('lodash'),
    jobs       = require('./lib/server/jobs'),
    history    = require('./lib/server/history');

history.load().then(function () {
  var server = app.listen(3141, function () {
    console.log('Mockboard listening on port 3141');
  });

  var io = socketio.listen(server);

  io.on('connection', function (socket) {
    // send latest data to widget on connection
    socket.on('subscribe', function (channel) {
      var currentHistory = history.getHistory();
      if (_.has(currentHistory, channel)) {
        socket.emit(channel, currentHistory[channel]);
      }
    });
  });

  /**
   * send data to widgets
   * adds updatedAt value with current time
   * updates history
   *
   * @param {String} event - Event name
   * @param {Object} data - Event data
   */
  function sendData(event, data) {
    data.updatedAt = Math.round(new Date().getTime() / 1000.0);
    history.updateHistory(event, data);
    io.emit(event, data);
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/assets', express.static(__dirname + '/lib/client/dist/assets'));

  // api endpoint for custom widget data updates
  app.post('/api/widgets/:event', function (req, res) {
    var event = req.params.event;
    var body = req.body;
    sendData(event, body);
    res.sendStatus(204);
  });

  app.all('*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/lib/client/dist' });
  });

  jobs.registerEmit(sendData);
  jobs.scheduleJobs();
});
