/**
 * Created by Anton Em 4.11.2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.login', login);

    /**
     * login
     */
    function login($scope, modalInstance, topNavbarService, userService, uiNotifications) {
        $scope.loginData = {
            grant_type: 'password'
        };
        $scope.cancel = cancel;
        $scope.login = login;
        
        function login() {
            topNavbarService.login($scope.loginData).then(
                function success(data) {
                    userService.setCurrentUser(data.user);
                    modalInstance.close();
                },
                function error(data) {
                    uiNotifications.popup('Возникли проблемы во время авторизации');
                }
            );
        }

        /**
         * Cancel and close modal window
         */
        function cancel() {
            modalInstance.close();
        }
    }

    /**
     * IoC container
     */
    login.$inject = [
        '$scope',
        '$uibModalInstance',
        'app.TopNavbar.TopNavbarService',
        'app.Entities.UserService',
        'app.Core.uiNotifications'
    ];
})();