'use strict';

/* Controllers */

landingApp.controller('CountryPickerCtrl', function (deviceService, $scope, $log, $cookieStore, contentfulConfig, contentful, utilityService, deviceType, version, $window, $filter) {

    $scope.name = "CountryPickerCtrl";
    $scope.isDesktop = deviceType.isDesktop;
    $scope.isAndroid = deviceType.isAndroid;
    $scope.isIos = deviceType.isIos;

    // check that the config is set
    $scope.spaceId = contentfulConfig.spaceId;
    $scope.accessToken = contentfulConfig.accessToken;
    $scope.version = version.version;

//    $scope.isProgress = false;

    var spaceid, query, contentTypes;

    spaceid = contentfulConfig.spaceId;

    $scope.isProgress = true;
    contentful.contentDelivery.httpGet(spaceid, "content_types").then(
        function (response) { // SUCCESS CALLBACK

            console.log('SUCCESS CALLBACK', response); // todo: delete me

            contentTypes = response.data.items;

            var contentType = utilityService.getItemByName('Country', contentTypes);

            console.log("contentType", contentType); // todo: delete me

            // set up the querystring params that get sent to contentful
            query = {
                "content_type": contentType.sys.id,
                "include": 2
            };


            // get countries
            // chaining promises: https://egghead.io/lessons/angularjs-chained-promises
            contentful.contentDelivery.httpGet(spaceid, "entries", undefined, query).then(
                function (countryResponse) { // SUCCESS CALLBACK

                    console.log("SUCCCESS countryResponse:", countryResponse); // todo: delete me

                    console.log("COUNTRIES PRE PROCESS", countryResponse.data); // todo: delete me

                    // START: POST PROCESS
                    var items = countryResponse.data.items;
                    var entries = countryResponse.data.includes.Entry;
                    var assets = countryResponse.data.includes.Asset;

                    //seans change - specifically error handling from contentful
                    var error = countryResponse.data.includes.errors;
                    if (error !== undefined) {
                        $log.info(error);
                    }
                    //end of error handling

                    //Seans change - Need to get all assets only for mobile only page
                    $scope.assets = assets;//todo: no longer needed
                    $log.info(assets);//todo: delete
                    //end of seans change

                    // roll up entries and assets into the country items...
                    _.forEach(items, function (item) {


                        //get the flag for each country item
                        var foundFlag = utilityService.getAssetById(item.fields.flag.sys.id, assets);
                        item.fields.flag = foundFlag;
                        //end sean


                        // roll up office entries for the item...
                        var foundOffices = [];

                        _.forEach(item.fields.office, function (office) {


                            var foundOffice = utilityService.getEntryById(office.sys.id, entries);

                            // get the netscaler for the office
                            var foundNetscaler = utilityService.getEntryById(foundOffice.fields.netscaler.sys.id, entries);

                            // get the config files
                            var foundConfigs = [];

                            _.forEach(foundNetscaler.fields.config, function (config) {

                                var foundConfig = utilityService.getAssetById(config.sys.id, assets);

                                foundConfigs.push(foundConfig);

                            });

                            foundNetscaler.fields.config = foundConfigs;

                            foundOffice.fields.netscaler = foundNetscaler;

                            foundOffices.push(foundOffice);


                        });

                        item.fields.office = foundOffices;


                    });
                    // END: POST PROCESS

                    console.log("COUNTRIES POST PROCESS", countryResponse.data.items); // todo: delete me

                    $scope.countries = countryResponse.data.items;


                }, function (data, status, headers, config) { // ERROR CALLBACK

                    console.log("ERROR country get:" + data); // todo: delete me
                    $scope.isProgress = false;

                });

            $scope.isProgress = false;
        },
        function (data, status, headers, config) { // ERROR CALLBACK
            console.log("ERROR content type get:" + data); // todo: delete me
            $scope.isProgress = false;

        }
    ).then();

    //set cookie so netscaler URL is saved
    $scope.pushCookie = function (officeUrl) {
        $cookieStore.put('aoCookie', { message: officeUrl });
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

landingApp.controller('DeleteCookieCtrl', function ($scope, $log, $cookieStore, $location) {
    var cookie = $cookieStore.get('aoCookie');

    if (cookie != undefined) {

        $cookieStore.remove('aoCookie');
    }
    $location.path('/CountryPicker');

});