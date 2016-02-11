var jsonfile = require('jsonfile'),
    Promise  = require('bluebird'),
    path     = require('path'),
    fs       = require('fs'),

    appRoot     = path.resolve(__dirname, '../../'),
    historyFile = path.resolve(appRoot, 'history.json');

function HistoryManager() {
  this._history = {};
}

/**
 * load history file
 * create history file if it doesn't exist
 *
 * @return {Promise}
 */
HistoryManager.prototype.load = function () {
  var _this = this;

  return new Promise(function (resolve, reject) {
    fs.stat(historyFile, function (err) {
      var historyFileExists = err ? false : true;

      if (historyFileExists) {
        jsonfile.readFile(historyFile, function (err, obj) {
          if (err) {
            reject(err);
          } else {
            _this._history = obj;
            resolve(obj);
          }
        });
      } else {
        jsonfile.writeFile(historyFile, _this._history, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(_this._history);
          }
        });
      }
    });
  });
};

/**
 * save history
 * create history file if it doesn't exist
 *
 * @param {Object} obj - History object
 */
HistoryManager.prototype.saveHistory = function (obj) {
  this._history = obj;
  jsonfile.writeFile(historyFile, this._history, { spaces: 2 }, function (err) {
    if (err) {
      console.error(err);
    }
  });
};

/**
 * get current history
 *
 * @return {Object} history - History object
 */
HistoryManager.prototype.getHistory = function () {
  return this._history;
};

/**
 * update history and persist to local file
 *
 * @param {String} event - Name of event
 * @param {Object} data - Event data
 */
HistoryManager.prototype.updateHistory = function (event, data) {
  var history = this.getHistory();
  history[event] = data;
  this.saveHistory(history);
};

module.exports = new HistoryManager();
