/**
 * Created by Anton Em 4.11.2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.createNewSkill', createNewSkill);

    /**
     * login
     */
    function createNewSkill($scope, modalInstance, adminService, myProfileService, uiNotifications) {
        $scope.cancel = cancel;
        $scope.createCategory = createCategory;
        $scope.createSkill = createSkill;
        $scope.categoryData = {};
        $scope.skillData = {};

        init();
        
        function init() {
            adminService.getAllCategories().then(
                function success(data) {
                    $scope.categories = data;
                },
                function error(data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function createCategory(skillId) {
            adminService.addCategory($scope.categoryData).then(
                function success() {
                    uiNotifications.inform("Добавлено успешно");
                },
                function error() {
                    uiNotifications.popup("Ошибка");
                }
            );
        }

        function createSkill(skillId) {
            adminService.addSkill($scope.skillData).then(
                function success() {
                    uiNotifications.inform("Добавлено успешно");
                },
                function error() {
                    uiNotifications.popup("Ошибка");
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
    createNewSkill.$inject = [
        '$scope',
        '$uibModalInstance',
        'app.Admin.AdminService',
        'app.MyProfile.MyProfileService',
        'app.Core.uiNotifications'
    ];
})();