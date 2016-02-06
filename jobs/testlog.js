var job = {
  channel: 'testlog',

  cron: '*/3 * * * * *',

  data: function() {
    return Math.floor(Math.random() * 100);
  }
}

module.exports = job;
