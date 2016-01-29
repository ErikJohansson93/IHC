var exec = require('child_process').exec;
var express = require('express');
var telldus = require('telldus');
var app = express();

// Allow cross domain requests.
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

// Set up a server.
var server = app.listen(3000, function() {

  // Endpoint for getting devices.
  app.get('/getDevices', function(req, res){
    // Get all devices.
    telldus.getDevices(function(err, devices) {
      // A list of all configured devices is returned.
      res.send(devices);
    });
  });


  // Endpoint for dimming a device.
  app.get('/dimDevice/:device/:level', function(req, res){
    // Get device.
    var id = parseInt(req.params.device);
    var level = parseInt(req.params.level);

    // Get array key.
    var i = id - 1;

    telldus.getDevices(function(err, devices) {
      // Dim.
      telldus.dim(devices[i].id, parseInt(req.params.level),function(err) {
       res.send(devices[i].name + ' is dimmed to ' + req.params.level + '%');
      });
    });
  });

  // Endpoint for Turning on an device.
  app.get('/toggleDevice/:input', function(req, res){
    // Get and id and set it as an int.
    var id = parseInt(req.params.input);

    // Get array key.
    var i = id - 1;

    // Get all devices so that we can check status.
    telldus.getDevices(function(err, devices) {
      // Start device if off.
      if (devices[i].status.name === 'OFF') {
        // Turn on the device.
        telldus.turnOn(id, function(err) {
          res.send(devices[i].name + ' is now activated');
        });
      }
      // Turn off device if on.
      else if (devices[i].status.name === 'ON') {
        // Turn off the device.
        telldus.turnOff(id, function(err) {
          res.send(devices[i].name + ' is now deactivated');
        });
      }
    });
  });
});
