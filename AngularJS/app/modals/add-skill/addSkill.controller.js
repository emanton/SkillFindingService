/**
 * Created by Anton Em 4.11.2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.addSkill', login);

    /**
     * login
     */
    function login($scope, modalInstance, myProfileService, userService, selectedSkills, uiNotifications, modalDispatcher) {
        $scope.cancel = cancel;
        $scope.addUserSkills = addUserSkills;
        $scope.deleteUserSkills = deleteUserSkills;
        $scope.suggestNewSkill = suggestNewSkill;
        
        init();
        
        function init() {
            $scope.currentUserId = userService.getCurrentUser().Id;

            myProfileService.getAllSkills().then(
                function success(data) {
                    $scope.skills = data;
                    console.log(selectedSkills);
                    for(var i = 0; i < $scope.skills.length; i++) {
                        if (_.some(selectedSkills, {"Id": $scope.skills[i].Id})) {
                            $scope.skills[i].active = true;
                        }
                        else {
                            $scope.skills[i].active = false;
                        }
                    }
                },
                function error(data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function addUserSkills(skillId) {
            myProfileService.addUserSkill($scope.currentUserId, skillId).then(
                function success(data) {
                    var addedSkill = _.find($scope.skills, function(skill) {
                        return skill.Id == data;
                    });

                    addedSkill.active = true;
                },
                function error(data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function deleteUserSkills(skillId) {
            myProfileService.deleteUserSkill($scope.currentUserId, skillId).then(
                function success(data) {
                    var deletedSkill = _.find($scope.skills, function(skill) {
                        return skill.Id == data;
                    });

                    deletedSkill.active = false;
                },
                function error(data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function suggestNewSkill() {
            modalDispatcher.createNewSkill().then(function() {

            });
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
        'app.MyProfile.MyProfileService',
        'app.Entities.UserService',
        'selectedSkills',
        'app.Core.uiNotifications',
        'modals.dispatcher'
    ];
})();