'use strict';

/* Services */

landingApp.factory('deviceService', function ($log, $window, $cookieStore, $location, deviceType) {

    return function () {


        console.log($location.path());
        console.log('yo');
        $log.info('yo');

        if (/Android|webOS|iPhone|iPad|iPod|PlayBook|BlackBerry|IEMobile|Opera Mini|SymbianOS/i.test(navigator.userAgent)) {
            //Filter for mobile devices. This service runs at app start

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                deviceType.isIos = true;
            }
            else if (/Android/i.test(navigator.userAgent)) {
                deviceType.isAndroid = true;
            }
            else if (/webOS|PlayBook|BlackBerry|IEMobile|Opera Mini|SymbianOS/i.test(navigator.userAgent)) {
                //what receiver files will these use? e.g, nokia = SymbianOA; Nokia Lumia = IEMobile?;
//                deviceType.isIos = true;//for now have these os's follow IOS as will be using the same config file

            }

            deviceType.isDesktop = false;

            $location.path('/CountryPicker');
        }
        else {
            //you are on a desktop
            var cookie = $cookieStore.get('aoCookie');
            if (cookie != undefined) {

                //Go to office of aoCookie value
                $window.location.href = cookie.message;

            } else {
                $location.path('/CountryPicker');

            }

        }
    }
});



landingApp.factory('utilityService', function () {

    return {
        getItemByName: function (name, items) {
            var foundItem = _.find(items, function (item) {

                return item.name === name;

            });

            return foundItem;
        },
        getEntryById: function (entryId, entries) {

            var foundEntry = _.find(entries, function (entry) {

                return entry.sys.id === entryId;

            });

            return foundEntry;

        },
        getAssetById: function (assetId, assets) {

            var foundAsset = _.find(assets, function (asset) {

                return asset.sys.id === assetId;

            });

            return foundAsset;

        },
        dataHasErrors: function (data) {

            var errors = data.errors;
            return (typeof errors !== "undefined");

        }
    }

});

deleteCookieApp.factory('deleteCookieService', function ($cookieStore, $window, $rootScope) {

    var cookie = $cookieStore.get('aoCookie');

    if (cookie != undefined) {
        $cookieStore.put('seanCookie');
        $cookieStore.remove('aoCookie');
        cookie = undefined;
        console.log(cookie);
        location.reload();
        $rootScope.$digest();
    }
//    $location.path('/CountryPicker');
    $window.location.href = 'http://myallenoverylandingpage.azurewebsites.net/app/index.html';

});



