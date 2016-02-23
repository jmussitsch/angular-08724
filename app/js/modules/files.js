(function() {
    "use strict";

    /*
     * What happens when we need to implement lower level functionality that
     * is not provided by the framework? We should extend HTML and create a
     * custom directive.
     *
     * https://docs.angularjs.org/guide/directive
     *
     */
    angular.module('files', [])
        .directive('cswFileInput', function() {
            return {
                /*
                 * Restricts this directive to being an attribute
                 */
                restrict: 'A',
                /*
                 * The following creates something called isolate scope. This
                 * means that this directive will create its own scope
                 * that does NOT prototypically inherit from its parent scope. This
                 * is ideal when creating reusable components.
                 *
                 * The scope option is an object that contains a property for each isolate scope binding.
                 * In this case it has just one property:

                 * Its name (data) corresponds to the directive's isolate scope property data.
                 * Its value (=fileData) tells $compile to bind to the file-data attribute.
                 */
                scope: {
                    data: '=fileData'
                },
                /*
                 * The link function is used to work with the DOM. The scope parameter is
                 * an Angular scope object, element is the jqLite-wrapped element that
                 * this directive matches. There are others but we won't be using them.
                 */
                link: function(scope, element) {
                    /*
                     * Set up an onchange event handler on the element using jqLite.
                     */
                    element.on('change', function(domEvent) {
                        /*
                         * Create a new file reader to read the file contents.
                         */
                        var reader = new FileReader();
                        /*
                         * Event handler on the reader to handle completing
                         * of the file read.
                         */
                        reader.onload = function (fileReaderEvent) {
                            /*
                             * In order for AngularJS to know about this event that has happened
                             * and update things that are watching this scope (e.g. our repeater),
                             * we need to call into the "AngularJS world". To do this
                             * we use the apply method on the scope object.
                             *
                             * https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply
                             */
                            scope.$apply(function(scope) {
                                scope.data.push({
                                    fileData : fileReaderEvent.target.result,
                                    fileName : domEvent.target.files[0].name,
                                    fileType : domEvent.target.files[0].type
                                });
                            });
                            /*
                             * Once the file has been read clear out input.
                             */
                            angular.element(domEvent.target).val('');
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    });
                }
            };
        });
})();

