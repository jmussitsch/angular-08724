(function() {
    "use strict";

    /*
     * Factories, Services, Values, Constants, and Providers are all related.
     *
     * From docs: The most verbose, but also the most comprehensive one is Provider.
     * The remaining four — Value, Factory, Service and Constant — are just syntactic
     * sugar on top of provider.
     *
     * Read about these here to fully understand:
     *
     * https://docs.angularjs.org/guide/providers
     *
     */
    angular.module('stocks', [])
        .constant('stocksUri', '//csw08724.appspot.com/example.ajax')
        .service('stocksService', function StocksService($http, $window, stocksUri) {
            this.getData = function() {
                return $http.get(stocksUri, {
                    responseType: "json",
                    cache: true
                }).then(function(response) {
                    return response.data;
                }, function(response) {
                    $window.alert(response.statusText);
                });
            };
        });

})();