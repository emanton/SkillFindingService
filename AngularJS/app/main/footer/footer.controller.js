(function () {
    'use strict';

    angular
        .module('app.Footer')
        .controller('app.Footer.FooterController', topNavbarController);

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
    function topNavbarController($state) {
        var vm = this;
    }

    /**
     * IoC container
     * @type {[*]}
     */
    topNavbarController.$inject = [
        "$state"
    ];

})();
