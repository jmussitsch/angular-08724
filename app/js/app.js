(function() {
    "use strict";

    /*
     * An array of US state abbreviations -> names. This should ideally
     * be data in an external resource like a DB or something, but for simplicity
     * hard coding here.
     */
    const usStates = {
        AL: "ALABAMA",AK: "ALASKA",AS: "AMERICAN SAMOA",AZ: "ARIZONA",AR: "ARKANSAS",CA: "CALIFORNIA",CO: "COLORADO",
        CT: "CONNECTICUT",DE: "DELAWARE",DC: "DISTRICT OF COLUMBIA",FM: "FEDERATED STATES OF MICRONESIA",FL: "FLORIDA",
        GA: "GEORGIA",GU: "GUAM",HI: "HAWAII",ID: "IDAHO",IL: "ILLINOIS",IN: "INDIANA",IA: "IOWA",KS: "KANSAS",KY: "KENTUCKY",
        LA: "LOUISIANA",ME: "MAINE",MH: "MARSHALL ISLANDS",MD: "MARYLAND",MA: "MASSACHUSETTS",MI: "MICHIGAN",MN: "MINNESOTA",
        MS: "MISSISSIPPI",MO: "MISSOURI",MT: "MONTANA",NE: "NEBRASKA",NV: "NEVADA",NH: "NEW HAMPSHIRE",NJ: "NEW JERSEY",
        NM: "NEW MEXICO",NY: "NEW YORK",NC: "NORTH CAROLINA",ND: "NORTH DAKOTA",MP: "NORTHERN MARIANA ISLANDS",OH: "OHIO",
        OK: "OKLAHOMA",OR: "OREGON",PW: "PALAU",PA: "PENNSYLVANIA",PR: "PUERTO RICO",RI: "RHODE ISLAND",SC: "SOUTH CAROLINA",
        SD: "SOUTH DAKOTA",TN: "TENNESSEE",TX: "TEXAS",UT: "UTAH",VT: "VERMONT",VI: "VIRGIN ISLANDS",VA: "VIRGINIA",
        WA: "WASHINGTON",WV: "WEST VIRGINIA",WI: "WISCONSIN",WY: "WYOMING"};

    /*
     * Here we create the module that is referenced by the ng-app directive.
     *
     * See https://docs.angularjs.org/api/ng/function/angular.module
     */
    let app = angular.module('myApp', []);

    /*
     * Create the controller for the form referenced by the ng-controller directive.
     * Dependency injection is used to inject the scope dependency into the controller.
     * Controllers implicitly create new scope and the $scope is a special object referring to it.
     * I am also injecting $rootScope to demonstrate how scopes inherit. Also injecting the $log service.
     *
     * See: https://docs.angularjs.org/guide/controller
     * See: https://docs.angularjs.org/guide/scope
     */
    app.controller("userController", ["$scope", "$rootScope", "$log", function($scope, $rootScope, $log) {
        /*
         * Scopes in Angular prototypically inherit from their
         * parent scope. Every application has a single root scope, $rootScope.
         */
        $log.log("Object.getPrototypeOf($scope) === $rootScope? " + ( Object.getPrototypeOf($scope) === $rootScope ));

        $scope.stateOptions = usStates; //Available via closure
        $scope.submittedAddresses = [];
        $scope.address = {};

        /*
         * Add a behavior to handle when Add is clicked.
         */
        $scope.submit = function() {
            /*
             * Copy the current address model from scope and add to the array of "submitted" addresses.
             * Angular provides a copy method to clone objects.
             *
             * See: https://docs.angularjs.org/api/ng/function/angular.copy
             */
            $scope.submittedAddresses.push(angular.copy($scope.address));
            /*
             * Reset values on the model. Notice how the UI updates!
             */
            $scope.address = {};
        };

        /*
         * Add a behavior to handle when the remove X is clicked
         */
        $scope.removeAddress = function(index) {
            $scope.submittedAddresses.splice(index, 1);
        };

    }]);
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
        }, function(response) {
            $log.error(response.statusText);
        });
    });
})();
