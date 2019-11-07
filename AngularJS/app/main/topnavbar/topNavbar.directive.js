/**
 * Created by Bondarenko.D on 3/3/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.TopNavbar')
        .directive('antonTopnavbar', topnavbarDirective);

    /**
     * Topnavbar directive
     * @return {{replace: boolean, restrict: string, templateUrl: string, controller: string, controllerAs: string}}
     */
    function topnavbarDirective(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/main/topnavbar/topNavbar.html',
            controller: "app.TopNavbar.TopNavbarController",
            controllerAs: 'topnavbarCtrl'
        }
    }
})();