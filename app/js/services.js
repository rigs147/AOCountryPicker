'use strict';

/* Services */

landingApp.factory('myService', function ($log, $cookieStore, $location) {

    return function () {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $log.info('You are on a mobile device. ');
            //open native receiver. search for citrix receiver.exe?? Get receiver file
        }
        else {

            $log.info('you are using a desktop');

            var cookie = $cookieStore.get('aoCookie');
            if (cookie != undefined) {

                //Go to office of aoCookie value

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

landingApp.run(function (myService) {
    myService();
});



