(function() {
    "use strict";

    /*
     * Here we create the module that is referenced by the ng-app directive.
     *
     * See https://docs.angularjs.org/api/ng/function/angular.module
     */
    let app = angular.module('myApp', []);

    /*
     * We can define constants to inject into other services, controllers, etc.
     */
    app.constant('stocksUri', '//csw08724.appspot.com/example.ajax');
    /*
     * Injecting the $http service to provide AJAX functionality. Also
     * injecting the constant defined above.
     *
     * See: https://docs.angularjs.org/api/ng/service/$http
     */
    app.controller("stocksController", ["$scope", "$http", "stocksUri", "$log", function($scope, $http, stocksUri, $log) {
        /*
         * The $http service uses Promises underneath! Angular uses
         * a slightly different implementation than the native ones. We could use native ones
         * but using Angular's instead:
         *
         * https://docs.angularjs.org/api/ng/service/$q
         */
        $http.get(stocksUri, {
            responseType: "json"
        }).then(function(response) {
            $scope.stockData = response.data;
        }, function(response) {
            $log.error(response.statusText);
        });
    }]);
})();
