'use strict';


// Declare app level module which depends on filters, and services
//angular.module('landingApp', [
//  'ngRoute',
//  'landingApp.filters',
//  'landingApp.services',
//  'landingApp.directives',
//  'landingApp.controllers'
//]).

var landingApp = angular.module('landingApp', ['ngRoute', 'ngCookies']);

landingApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/CountryPicker', {templateUrl: 'partials/CountryPicker.html', controller: 'CountryPickerCtrl'});

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
