(function () {

    "use strict";

    angular
        .module("app.Search")
        .controller("app.Search.SearchController", searchCtrl);

    function searchCtrl($scope, $stateParams, searchService, uiNotifications) {
        var vm = this;
        vm.getAverageRateFromComments = getAverageRateFromComments;
        init();
        
        function init() {
            searchService.searchByString($stateParams.searchText).then(
                function success(data) {
                    vm.results = data;
                },
                function error(data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function getAverageRateFromComments(comments) {
            return comments.length > 0 ? _.mean(_.map(comments, function(o) { return o.Rate } )).toFixed(2) : 0;
        }
    }

    /**
     * IoC container
     */
    searchCtrl.$inject = [
        "$scope",
        '$stateParams',
        'app.Search.SearchService',
        'app.Core.uiNotifications'
    ];
})();