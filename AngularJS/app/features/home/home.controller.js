(function () {

    "use strict";

    angular
        .module("app.Home")
        .controller("app.Home.HomeController", homeCtrl);

    function homeCtrl($scope, $state) {
        var vm = this;
        vm.findBtnClick = findBtnClick;

        init();
        
        function init() {
        }

        function findBtnClick(searchText) {
            $state.go('app.main.search', {searchText: searchText});
        }
    }

    /**
     * IoC container
     */
    homeCtrl.$inject = [
        "$scope",
        "$state"
    ];
})();