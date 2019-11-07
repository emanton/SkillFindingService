(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider', '$qProvider'];

    function configure($httpProvider, $urlRouterProvider, $stateProvider, $qProvider) {
        $httpProvider.defaults.withCredentials = true;
        
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('app.Core.AuthorizationInterceptor');
        
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('app.main.home');
            // var userService = $injector.get('app.Entities.UserService');
            // var user = userService.getCurrentUser();
            // if(user != null) {
            //     $state.go('app.internalMain.dashboard');
            // }
            // else{
            //     $state.go('app.externalMain.pageGenerator', {url: ''});
            // }
        });



        $stateProvider
            .state('app', {
                abstract: true,
                template: '<div id="wrapper" ui-view></div>'         
            });

        $stateProvider
            .state('app.main', {
                abstract: true,
                templateUrl: 'app/main/main.html'
            });

        $qProvider.errorOnUnhandledRejections(false);
    }
})();
