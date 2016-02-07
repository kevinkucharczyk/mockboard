var nodeSchedule = require('node-schedule'),
    fs           = require('fs'),
    path         = require('path'),
    Promise      = require('bluebird'),
    jobsPath     = path.join(__dirname, '../../jobs'),
    jobsModule,
    socket;

function findJobs() {
  return new Promise(function (resolve, reject) {
    fs.readdir(jobsPath, function (err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function requireJob(file) {
  return require(jobsPath + '/' + file);
}

function emit(event, data) {
  socket.emit(event, data);
}

function schedule(job) {
  nodeSchedule.scheduleJob(job.cron, function () {
    emit(job.channel, job.data());
  });
}

jobsModule = {
  registerSocket: function (io) {
    socket = io;
  },

  loadJobs: function () {
    return Promise.map(findJobs(), requireJob).then(function (jobs) {
      return jobs;
    });
  },

  scheduleJobs: function () {
    this.loadJobs().then(function (jobs) {
      jobs.forEach(function (job) {
        schedule(job);
      });
    });
  }
};

module.exports = jobsModule;
