var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    socketio   = require('socket.io'),
    jobs       = require('./lib/server/jobs');

var server = app.listen(3141, function () {
  console.log('Mockboard listening on port 3141');
});

var io = socketio.listen(server);

function sendData(event, data) {
  data.updatedAt = Math.round(new Date().getTime() / 1000.0);
  io.emit(event, data);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/lib/client/dist/assets'));

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
