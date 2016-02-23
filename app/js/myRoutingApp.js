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
        stocksService.getData().then(function(data){
           $scope.stockData = data;
        });

    });

})();