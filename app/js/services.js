'use strict';

/* Services */

landingApp.factory('deviceService', function ($log, $window, $cookieStore, $location, deviceType, localStorageService) {

    return function () {


        console.log($location.path());

        if (/Android|webOS|iPhone|iPad|iPod|PlayBook|BlackBerry|IEMobile|Opera Mini|SymbianOS/i.test(navigator.userAgent)) {
            //Filter for mobile devices. This service runs at app start

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                deviceType.isIos = true;
            }
            else if (/Android/i.test(navigator.userAgent)) {
                deviceType.isAndroid = true;
            }

            deviceType.isDesktop = false;

            $location.path('/CountryPicker');
        }
        else {
            //you are on a desktop

            var cookie = localStorageService.get('aoCookie')

            if (cookie != undefined) {

                //Go to office of aoCookie value
                $window.location.href = cookie;

            } else {
                $location.path('/CountryPicker');

            }

        }
    }
});

deleteCookieApp.factory('deleteCookieService', function ($window, $rootScope, localStorageService) {

    var cookie = localStorageService.get('aoCookie');


    if (cookie != undefined) {
        localStorageService.remove('aoCookie');
        $rootScope.$digest();
    }

    $window.location.href = 'index.html';

});




