(function() {
    "use strict";

    var app = angular.module('myThirdPartyApp', ['chart.js']);

    app.constant('stocksUri', '//csw08724.appspot.com/example.ajax');
    /*
     * Injecting the $http service to provide AJAX functionality. Also
     * injecting the constant defined above.
     *
     * See: https://docs.angularjs.org/api/ng/service/$http
     */
    app.controller("stocksController", function($scope, $http, stocksUri, $log) {
        /*
         * The $http service uses Promises underneath! Angular uses
         * a slightly different implementation than the native ones:
         *
         * https://docs.angularjs.org/api/ng/service/$q
         */
        $http.get(stocksUri, {
            responseType: "json"
        }).then(function(response) {
            $scope.stockData = response.data;
            /*
             * Loop through data and determine industry breakdown.
             */
            var labelToCount = {};
            $scope.data = [];
            $scope.labels = [];
            $scope.stockData.forEach(function(stock) {
                if(!labelToCount.hasOwnProperty(stock.industry)) {
                    $scope.labels.push(stock.industry);
                    labelToCount[stock.industry] = 0;
                }
                labelToCount[stock.industry]++;
            });
            $scope.labels.forEach(function(label) {
                $scope.data.push(labelToCount[label])
            });
        }, function(response) {
            $log.error(response.statusText);
        });
    });
})();
