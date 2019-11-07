/**
 * Created by Anton Em 4.11.2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.register', register);

    /**
     * register
     */
    function register($scope, modalInstance, topNavbarService, userService, uiNotifications) {
        $scope.userData = {};
        $scope.cancel = cancel;
        $scope.register = register;

        function register() {
            topNavbarService.register($scope.userData).then(
                function success(loginData) {
                    uiNotifications.inform('Регистрация выполнена успешно !');
                    var loginData = {
                        login: $scope.userData.Email,
                        password: $scope.userData.Password
                    };

                    topNavbarService.login(loginData).then(
                        function success(data) {
                            userService.setCurrentUser(data.user);
                            modalInstance.close();
                        },
                        function error(data) {
                            uiNotifications.popup('Возникли проблемы во время авторизации');
                        }
                    );
                },
                function error(data) {
                    uiNotifications.popup('Возникли проблемы во время регистрации');
                }
            );;
        }

        function cancel() {
            modalInstance.close();
        }
    }

    /**
     * IoC container
     */
    register.$inject = [
        '$scope',
        '$uibModalInstance',
        'app.TopNavbar.TopNavbarService',
        'app.Entities.UserService',
        'app.Core.uiNotifications'
    ];
})();