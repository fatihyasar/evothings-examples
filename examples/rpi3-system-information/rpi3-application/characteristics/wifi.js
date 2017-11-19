var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var WifiConfigCharacteristic = function() {

    WifiConfigCharacteristic.super_.call(this, {
    uuid: '7EF8C29B-6C63-4E0A-B09F-4173A1ACA7B6',
    properties: ['read', 'write'],
  });

 this._value = new Buffer(0);
};

WifiConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if(!offset) {
    this._value = new Buffer(JSON.stringify({
      'wifi' : '->'
    }));
  }

  console.log('WifiConfigCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

WifiConfigCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else {
    console.log('WifiConfigCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
  }

  callback(this.RESULT_SUCCESS);
};

util.inherits(WifiConfigCharacteristic, BlenoCharacteristic);
module.exports = WifiConfigCharacteristic;
