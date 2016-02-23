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
        .service('stocksService', function StocksService($http, $window, $q, stocksUri) {
            var stocks = null;
            /*
             * Create an object to use as a map data structure for fast look ups by ticker.
             */
            var stocksMap = null;
            function getData() {
                /*
                 * If data is already retrieved then no need to make AJAX call.
                 * Just create a new promise and return it since that is what caller expects.
                 */
                if(stocks !== null) {
                    var deferred = $q.defer();
                    deferred.resolve(stocks);
                    return deferred.promise;
                }

                /*
                 * This method returns a promise that the caller can use.
                 */
                return $http.get(stocksUri, {
                    responseType: "json"
                }).then(function(response) {
                    stocks = response.data;
                    stocksMap = {};
                    stocks.forEach(function(item) {
                        stocksMap[item.ticker] = item;
                    });
                    return stocks;
                }, function(response) {
                    $window.alert(response.statusText);
                });
            }

            this.getStocksList = function() {
                return getData();
            };

            this.getStockDetails = function(ticker) {
                return getData().then(function() {
                   return stocksMap[ticker];
                });
            };
        })
        .filter('stockTicker', function() {
           /*
            * Creating custom filters is really easy.
            *
            * https://docs.angularjs.org/guide/filter
            */
            return function(input) {
                return "[" + input + "]";
            };
        });

})();