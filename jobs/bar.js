var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];

function rand(range) {
  return Math.floor(Math.random() * (range + 1));
}

var job = {
  channel: 'barchart',

  cron: '*/10 * * * * *',

  data: function () {
    var bars = chars.map(function (char) {
      return {
        label: char,
        value: rand(100)
      };
    });

    return {
      data: bars
    };
  }
};

module.exports = job;
