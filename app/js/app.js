var ihc = angular.module('ihc', []);
var ihc = angular.module('ihc', ['ngCookies']);

ihc.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

ihc.controller('ihcCtrl', function ($scope, $http, $window, $cookieStore) {
  if ($cookieStore.get('ip-address') !== undefined) {
    // Specify the server ip-address.
    var ip_address = $cookieStore.get('ip-address');

    var dimmer = document.getElementsByClassName("dimmer");

    // Initial value
    $scope.ip_set = true;
    $scope.contentLoaded = true;
    $scope.online = true;
  }

  /**
   * Function that toggles the power of and device.
   */
  $scope.setIP = function(ipAddress) {
    // Store cookie.
    $cookieStore.put("ip-address", ipAddress);

    // Show devices form.
    $scope.ip_set = true;

    // Content is loaded.
    $scope.contentLoaded = true;
    $scope.online = true;

    // Get list.
    $scope.updateDevices();
  }

  /**
   * Function that toggles the power of and device.
   */
  $scope.togglePower = function(device) {
    // Bail if IP not set.
    if ($cookieStore.get('ip-address') === undefined) {
      return;
    }

    // Do request to toggle devices status.
    $http({method: 'GET', url: 'http://' + $cookieStore.get('ip-address') + ':3000/toggleDevice/' + device.id}).success(function(response) {
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

  $scope.dimDevice = function(device, level) {
    // Do request to update devices status.
    $http({method: 'GET', url: 'http://' + $cookieStore.get('ip-address') + ':3000/dimDevice/' + device.id + '/' + level}).success(function(data) {
      // Set the request as success.
      $scope.success = true;

      // Set message.
      $scope.message = data;
    }).error(function(data) {
      console.log(data);
      // Show error message.
      $scope.err = true;
      // Set message.
      $scope.message = data;
    });
  };

  /**
   * Function that gets an updated list of devices.
   */
  $scope.updateDevices = function() {
    // Bail if IP not set.
    if ($cookieStore.get('ip-address') === undefined) {
      return;
    }

    // Do request to update devices status.
    $http({method: 'GET', url: 'http://' + $cookieStore.get('ip-address') + ':3000/getDevices'}).success(function(data) {
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
