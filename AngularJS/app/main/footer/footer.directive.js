/**
 * Created by Bondarenko.D on 3/3/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Footer')
        .directive('antonFooter', footerDirective);

    /**
     * Topnavbar directive
     * @return {{replace: boolean, restrict: string, templateUrl: string, controller: string, controllerAs: string}}
     */
    function footerDirective(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/main/footer/footer.html',
            controller: "app.Footer.FooterController",
            controllerAs: 'footerCtrl'
        }
    }
})();