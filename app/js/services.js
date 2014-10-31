'use strict';

/* Services */

landingApp.factory('deviceService', function ($log, $window, $cookieStore, $location, deviceType) {

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
//            else if (/webOS|PlayBook|BlackBerry|IEMobile|Opera Mini|SymbianOS/i.test(navigator.userAgent)) {
//                //what receiver files will these use? e.g, nokia = SymbianOA; Nokia Lumia = IEMobile?;
////                deviceType.isIos = true;//for now have these os's follow IOS as will be using the same config file
//
//            }

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

deleteCookieApp.factory('deleteCookieService', function ($cookieStore, $window, $rootScope) {

    var cookie = $cookieStore.get('aoCookie');

    if (cookie != undefined) {
        $cookieStore.remove('aoCookie');
        $rootScope.$digest();
    }

    $window.location.href = 'index.html';

});




