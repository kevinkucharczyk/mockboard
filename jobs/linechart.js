function rand(range) {
  return Math.random() * (range + 1) - range;
}

var now = Date.now();

var data = [];
var value = 50;
for (var i = 0; i < 100; i += 1) {
  var newValue = value + rand(1);
  if (newValue < 0) {
    value = 0;
  } else if (newValue > 100) {
    value = 100;
  } else {
    value = newValue;
  }

  var point = {
    date: now - i * 20000,
    value: value.toFixed(2)
  };
  data.unshift(point);
}

var job = {
  channel: 'linechart',

  cron: '*/10 * * * * *',

  data: function () {
    var lastValue = parseFloat(data[data.length - 1].value);
    var newValue = lastValue + rand(1);

    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }

    data.shift();

    var point = {
      date: Date.now(),
      value: newValue.toFixed(2)
    };

    data.push(point);

    return {
      data: data
    };
  }
};

module.exports = job;
