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

    app.run(function($route) {
        /*
         * Workaround so that routes load correctly when a page is loaded with
         * routes:
         *
         * https://github.com/angular/angular.js/issues/1213
         */
    });

    app.controller('stocksController', function($scope, $location, stocksService) {
        stocksService.getStocksList().then(function(data){
           $scope.stockData = data;
        });

        /*
         * Make note of the currently selected ticker on this controller's scope so we
         * can highlight the row in the table.
         */
        $scope.selectedCompany = {
            ticker: ""
        };

        /*
         * Create a behavior to handle showing comapny details.
         */
        $scope.showDetails = function(ticker) {
            $location.path('/Stock/' + ticker);
        };
    });

    /*
     * This controller will be associated with the routing view.
     */
    app.controller('stockDetailsController', function($scope, $routeParams, stocksService) {
        stocksService.getStockDetails($routeParams.ticker).then(function(stockDetails) {
            $scope.stockDetails = stockDetails;
            $scope.selectedCompany.ticker = stockDetails.ticker;
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
        /*
         * You can read about the location prvider here:
         *
         * https://docs.angularjs.org/guide/$location
         */
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
    });

})();