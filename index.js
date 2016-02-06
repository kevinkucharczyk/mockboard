var express  = require('express'),
    app      = express(),
    socketio = require('socket.io'),
    jobs     = require('./lib/server/jobs');

app.use('/assets', express.static(__dirname + '/lib/client/dist/assets'));

app.all('*', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname + '/lib/client/dist' });
});

var server = app.listen(3141, function () {
  console.log('Mockboard listening on port 3141');
});

var io = socketio.listen(server);

jobs.registerSocket(io);
jobs.scheduleJobs();
