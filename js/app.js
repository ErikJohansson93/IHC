var idelinjen = angular.module('ihc', []);

idelinjen.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

idelinjen.controller('ihcCtrl', function ($scope, $http, $timeout, $window) {

  $http({method: 'GET', url: 'http://192.168.0.5:3000/getTemp'}).success(function(data) {
    // Get temperature.
    $scope.temp = data;

    // Content is loaded.
    $scope.contentLoaded = true;
  }).error(function(data) {
    $scope.err = true;
    $scope.message = data;
  });

  /**
   * Function that toggles the power of and device.
   */
  $scope.togglePower = function(device) {
    // Set togglePower init variables.
    $scope.success = false;
    $scope.err = false;
    $scope.actionLoading = true;

    // Do request to toggle devices status.
    $http({method: 'GET', url: 'http://192.168.0.5:3000/toggleDevice/' + device.id}).success(function(response) {
      // Set the request as success.
      $scope.success = true;

      // Set message.
      $scope.message = response;
    }).error(function(data) {
      // Set the request as failed.
      $scope.err = true;

      // Set message.
      $scope.message = response;
    });

    // Finished.
    $scope.actionLoading = false;
  };

  /**
   * Function that gets an updated list of devices.
   */
  $scope.updateDevices = function() {
    // Do request to update devices status.
    $http({method: 'GET', url: 'http://192.168.0.5:3000/getDevices'}).success(function(data) {
      // Store devices in scope.
      $scope.devices = data;
    }).error(function(data) {
      // Show error message.
      $scope.err = true;

      // Set message.
      $scope.message = data;
    });
  };

});
