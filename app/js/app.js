'use strict';

var landingApp = angular.module('landingApp', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'angular-1.2.10-contentful'
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

landingApp.run(function(contentfulConfig, deviceService, version){
    contentfulConfig.spaceId = "8u2cofzt5au2";
    contentfulConfig.accessToken = "2e7c6010bb1c87d6e0714e178c464c99719e3d55d4015d71cb723b58a156bd2b";
    version.version = 1;
    deviceService();
});

var deleteCookieApp = angular.module('deleteCookieApp', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'angular-1.2.10-contentful'
]);

//deleteCookieApp.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/CountryPicker', {templateUrl: 'partials/CountryPicker.html', controller: 'CountryPickerCtrl'});
//    $routeProvider.when('/DeleteCookie', {templateUrl: 'partials/DeleteCookie.html', controller: 'DeleteCookieCtrl'});
//    $routeProvider.otherwise({redirectTo: '/CountryPicker'});
//}]);

deleteCookieApp.run(function(deleteCookieService){
    deleteCookieService();
});
