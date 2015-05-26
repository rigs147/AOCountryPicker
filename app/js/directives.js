

/* Directives */


//angular.module('landingApp.directives', []).
//  directive('appVersion', ['version', function(version) {
//    return function(scope, elm, attrs) {
//      elm.text(version);
//    };
//  }]);
//landingApp.directive('fileDownload', [function () {
//    return {
//        restrict: 'A',
//        replace: true,
//        template: '<button class="btn btn-default" data-ng-click="download()"><span class="glyphicon glyphicon-download"></span></button>',
//        controller: ['$rootScope', '$scope', '$element', '$attrs', '$timeout', function ($rootScope, $scope, $element, $attrs, $timeout) {
//            $scope.progress = 0;
//
//            function prepare(url) {
//                //dialogs.wait("Please wait", "Your download starts in a few seconds.", $scope.progress);
//                fakeProgress();
//            }
//            function success(url) {
//                $rootScope.$broadcast('dialogs.wait.complete');
//            }
//            function error(response, url) {
//                dialogs.error("Couldn't process your download!");
//            }
//
//            function fakeProgress() {
//                $timeout(function () {
//                    if ($scope.progress < 95) {
//                        $scope.progress += (96 - $scope.progress) / 2;
//                        $rootScope.$broadcast('dialogs.wait.progress', { 'progress': $scope.progress });
//                        fakeProgress();
//                    }
//                }, 250);
//            }
//
//            $scope.download = function () {
//                $scope.progress = 0;
//                $.fileDownload($attrs.href, { prepareCallback: prepare, successCallback: success, failCallback: error });
//            }
//        }]
//    }
//}]);