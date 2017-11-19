var bleno = require('bleno');
var util = require('util');

var LoadAverageCharacteristic = require('./characteristics/loadaverage');
var UptimeCharacteristic = require('./characteristics/uptime');
var MemoryCharacteristic = require('./characteristics/memory');
var WifiConfigCharacteristic = require('./characteristics/wifi')
function SystemInformationService() {

  bleno.PrimaryService.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57snm07',
    characteristics: [
      new LoadAverageCharacteristic(),
      new UptimeCharacteristic(),
      new MemoryCharacteristic(),
      new WifiConfigCharacteristic()
    ]
  });
};

util.inherits(SystemInformationService, bleno.PrimaryService);
module.exports = SystemInformationService;
