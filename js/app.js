'use strict';

var landingApp = angular.module('landingApp', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'LocalStorageModule'
]);

//possible device types. There are only 2 citrix congig files/ .cr and .xml. Android .xml and all other os's are .cr for now.
landingApp.value('deviceType' , {
    isDesktop: true,
    isAndroid: false,
    isIos: false
});

landingApp.constant('version' , {
    version: ''
});

landingApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/CountryPicker', {templateUrl: 'partials/CountryPicker.html', controller: 'CountryPickerCtrl'});
  $routeProvider.when('/Redirect', {templateUrl: 'partials/Redirect.html'});
  $routeProvider.otherwise({redirectTo: '/CountryPicker'});
}]);

landingApp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setStorageCookieDomain(window.location.host)
});

landingApp.run(function(deviceService, version){
    version.version = 1.1;
    deviceService();
});

var deleteCookieApp = angular.module('deleteCookieApp', [
    'ngCookies',
    'ngResource',
    'LocalStorageModule'
]);

deleteCookieApp.run(function(deleteCookieService){
    deleteCookieService();
});
