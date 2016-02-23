(function() {
    "use strict";

    /*
     * Here we create the module that is referenced by the ng-app directive.
     * I have added a dependency to a module that I have created called stocks.
     * We also are declaring that the ngRoute module is a dependency of our
     * app module.
     *
     * See https://docs.angularjs.org/api/ng/function/angular.module
     */
    var app = angular.module('myRoutingApp', ['stocks', 'ngRoute']);

    app.controller('stocksController', function($scope, stocksService) {
        stocksService.getStocksList().then(function(data){
           $scope.stockData = data;
        });
    });

    /*
     * This controller will be associated with the routing view.
     */
    app.controller('stockDetailsController', function($scope, $routeParams, stocksService) {
        stocksService.getStockDetails($routeParams.ticker).then(function(stockDetails) {
            $scope.stockDetails = stockDetails;
        });
    });

    /*
     * Configure routing. See:
     *
     * https://docs.angularjs.org/api/ngRoute
     * https://docs.angularjs.org/api/ngRoute/service/$route#example
     */
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/Stock/:ticker', {
            templateUrl: 'templates/stockDetailsTemplate.html',
            controller: 'stockDetailsController'
        });
        $locationProvider.html5Mode(true);
    });

})();