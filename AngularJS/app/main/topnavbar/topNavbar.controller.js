(function () {
    'use strict';

    angular
        .module('app.TopNavbar')
        .controller('app.TopNavbar.TopNavbarController', topNavbarController);

    /**
     * Top navigation bar controller
     * @param $state
     * @param userProvider
     * @param unitService
     * @param appSettings
     * @param authGuard
     * @param mainMenuHelper
     * @param settingsService
     */
    function topNavbarController($state, modalDispatcher, topNavbarService, userService, authGuard) {
        var vm = this;
        vm.findBtnClick = findBtnClick;
        vm.loginBtnClick = loginBtnClick;
        vm.registerBtnClick = registerBtnClick;
        vm.logout = logout;
        vm.currentUser = userService.getCurrentUser();
        function loginBtnClick() {
            modalDispatcher.login('md').then(function() {
                vm.currentUser = userService.getCurrentUser();
            });
        }

        /**
         * Logout
         */
        function logout() {
            authGuard.deAuthorize();
            vm.currentUser = userService.getCurrentUser();
        }

        function registerBtnClick() {
            modalDispatcher.register('md').then(function() {
                vm.currentUser = userService.getCurrentUser();
            });
        }

        function findBtnClick(searchText) {
            $state.go('app.main.search', {searchText: searchText});
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    topNavbarController.$inject = [
        "$state",
        "modals.dispatcher",
        "app.TopNavbar.TopNavbarService",
        "app.Entities.UserService",
        "app.Core.AuthGuard"
    ];

})();
