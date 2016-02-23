(function() {
    "use strict";

    angular.module('myDirectivesApp', ['files'])
        .controller('filesController', function($scope) {
            $scope.files = [];
        });
})();