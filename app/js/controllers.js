'use strict';

/* Controllers */

landingApp.controller('CountryPickerCtrl', function (deviceService, $scope,  deviceType, version, $window, $filter, $resource, localStorageService) {

    $scope.name = "CountryPickerCtrl";
    $scope.isDesktop = deviceType.isDesktop;
    $scope.isAndroid = deviceType.isAndroid;
    $scope.isIos = deviceType.isIos;

    $scope.version = version.version;

    $scope.isProgress = true;

    $resource('data.json').get(
        function (data) {
            $scope.countries = data.countries;
            $scope.isProgress = false;
        },
        function (error) {
            $scope.isProgress = false;
        }

    );

    //set cookie so netscaler URL is saved
    $scope.pushCookie = function (officeUrl) {

        localStorageService.set('aoCookie', officeUrl);

    };

    //Can't use generic filter as can't discern between office and country (both fields.name)
    $scope.countrySearch = function (country) {

        if ($scope.searchTerm) {
            var countryName = [country.fields.name]; // Wrapping in array since the 'filter' $filter expects an array.
            var countrySearch = countryName[0].slice(0, $scope.searchTerm.length);
            var matches = $filter('filter')(countrySearch.toUpperCase(), $scope.searchTerm.toUpperCase()); // Running country name through filter searching for $scope.searchTerm
            if(countrySearch.toUpperCase() !== $scope.searchTerm.toUpperCase())matches = 0;
            return matches.length > 0;
        }
        else {
            return true;
        }
    }
});

