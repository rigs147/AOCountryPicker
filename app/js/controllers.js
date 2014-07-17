'use strict';

/* Controllers */

landingApp.controller('MyCtrl1', ['$scope', function ($scope) {

}]);
landingApp.controller('MyCtrl2', ['$scope', function ($scope) {

}]);

landingApp.controller('CountryPickerCtrl', function ($scope, $log, $cookieStore) {

    //populate country list

    //If 'US' selected, set cookie, value = 'US', redirect to US office
    //$cookieStore.put('aoCookie', { message: 'US' });

});