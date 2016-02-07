var job = {
  channel: 'gauge',

  cron: '*/2 * * * * *',

  data: function () {
    return {
      value: Math.floor(Math.random() * 100),
      max: 100
    };
  }
};

module.exports = job;
