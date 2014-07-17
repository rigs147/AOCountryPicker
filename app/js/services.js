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

landingApp.run(function (myService) {
    myService();
});
