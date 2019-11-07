(function () {

    "use strict";

    angular
        .module("app.MyProfile")
        .controller("app.MyProfile.MyProfileController", homeCtrl);

    function homeCtrl($scope, $state, userService, modalDispatcher, myProfileService, userProfileService, uiNotifications) {
        var vm = this;
        
        vm.addSkill = addSkill;
        vm.deleteUserSkill = deleteUserSkill;
        vm.updateUserData = updateUserData;
        vm.updateUserSettings = updateUserSettings;
        vm.editDescription = editDescription;
        vm.saveDescription = saveDescription;
        
        vm.userSettings = {};
        init();
        
        function init() {
            vm.currentUserId = userService.getCurrentUser().Id;
            getUserData();
            getUserSkills();
            getUserComments();
        }

        vm.descriptionMode = 'read';

        function editDescription() {
            vm.descriptionMode = 'edit';
        }

        function saveDescription() {
            myProfileService.updateUserData(vm.userData).then(
                function(data) {
                    getUserData()
                    vm.descriptionMode = 'read';
                },
                function error() {
                    uiNotifications.popup("Error");
                    getUserData()        
                    vm.descriptionMode = 'read';
                });
        }

        function addSkill() {
            modalDispatcher.addSkill(vm.userSkills).then(function() {
                getUserSkills();
            });
        }

        function deleteUserSkill(skillId) {
            myProfileService.deleteUserSkill(vm.userData.Id, skillId).then(
                function(data) {
                    getUserSkills();
                    uiNotifications.inform("Deleted");
                }, function (data) {
                    uiNotifications.popup("Error");
                }
            );
        }

        function getUserData() {
            userProfileService.getUserData(vm.currentUserId).then(
                function(data) {
                    vm.userData = data;
                }
            );
        }

        function getUserSkills() {
            myProfileService.getUserSkills(vm.currentUserId).then(
                function(data) {
                    vm.userSkills = data;
            });
        }

        function getUserComments() {
            userProfileService.getCommentsByUserId(vm.currentUserId).then(
                function(data) {
                    vm.comments = data;
                    vm.commentsCount = data.length;
                    vm.averageRate = data.length > 0 ? _.mean(_.map(data, function(o) { return o.Rate } )).toFixed(2) : 0;
                }
            );
        }

        function updateUserData() {
            myProfileService.updateUserData(vm.userData).then(
                function(data) {
                    userService.setCurrentUser(data);
                    vm.userData = data;
                    uiNotifications.inform("Updated");
            });
        }

        function updateUserSettings() {
            vm.userSettings.Id = vm.currentUserId;
            myProfileService.updateUserSettings(vm.userSettings).then(
                function(data) {
                    if (data) {
                        uiNotifications.inform("Updated");
                    } else {
                        uiNotifications.popup("Wrong password or imposible operation");
                    }
            });
        }
    }

    /**
     * IoC container
     */
    homeCtrl.$inject = [
        "$scope",
        "$state",
        "app.Entities.UserService",
        "modals.dispatcher",
        "app.MyProfile.MyProfileService",
        "app.UserProfile.UserProfileService",
        "app.Core.uiNotifications"
    ];
})();