var nodeSchedule = require('node-schedule'),
    fs           = require('fs'),
    path         = require('path'),
    Promise      = require('bluebird'),
    jobsPath     = path.join(__dirname, '../../jobs'),
    jobsModule,
    sendData;

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

function schedule(job) {
  nodeSchedule.scheduleJob(job.cron, function () {
    sendData(job.channel, job.data());
  });
}

jobsModule = {
  registerEmit: function (f) {
    sendData = f;
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
