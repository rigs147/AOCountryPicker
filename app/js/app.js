'use strict';

var landingApp = angular.module('landingApp', [
    'ngRoute',
    'ngCookies',
    'ngResource'
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
//  $routeProvider.when('/DeleteCookie', {templateUrl: 'partials/DeleteCookie.html', controller: 'DeleteCookieCtrl'});
  $routeProvider.otherwise({redirectTo: '/CountryPicker'});
}]);

landingApp.run(function(deviceService, version){
    version.version = 1;
    deviceService();
});

var deleteCookieApp = angular.module('deleteCookieApp', [
    'ngCookies',
    'ngResource'
]);

//deleteCookieApp.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/CountryPicker', {templateUrl: 'partials/CountryPicker.html', controller: 'CountryPickerCtrl'});
//    $routeProvider.when('/DeleteCookie', {templateUrl: 'partials/DeleteCookie.html', controller: 'DeleteCookieCtrl'});
//    $routeProvider.otherwise({redirectTo: '/CountryPicker'});
//}]);

deleteCookieApp.run(function(deleteCookieService){
    deleteCookieService();
});
