(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

        config.$inject = ['$stateProvider'];
        // config.$inject = ['$stateProvider', 'app.Entities.UserConstants'];

        function config($stateProvider) {
            // function config($stateProvider, userConstants) {
            // var data = {
            //     permissions: {
            //         except: userConstants.USER_ROLES.ANONYMOUS,
            //         redirectTo: "app.externalMain.pageGenerator"
            //     }
            // }

            $stateProvider.state('app.main.home', {
                url: '/home',
                templateUrl: 'app/features/home/home.template.html',
                controller: 'app.Home.HomeController',
                controllerAs: 'homeController',
                // data: data,
            });

            $stateProvider.state('app.main.search', {
                url: '/search/:searchText',
                templateUrl: 'app/features/search/search.template.html',
                controller: 'app.Search.SearchController',
                controllerAs: 'searchController',
                params: {searchText: {value: ''}}
                // data: data,
            });

            $stateProvider.state('app.main.userProfile', {
                url: '/user-profile/:userId',
                templateUrl: 'app/features/user-profile/userProfile.template.html',
                controller: 'app.UserProfile.UserProfileController',
                controllerAs: 'userProfileController'
                // data: data,
            });

            $stateProvider.state('app.main.myProfile', {
                url: '/my-profile',
                templateUrl: 'app/features/my-profile/myProfile.template.html',
                controller: 'app.MyProfile.MyProfileController',
                controllerAs: 'myProfileController'
                // data: data,
            });
        }
})();
