(function () {

    "use strict";

    angular
        .module("app.UserProfile")
        .controller("app.UserProfile.UserProfileController", userProfileCtrl);

    function userProfileCtrl($scope, $state, $stateParams, userProfileService, myProfileService, userService) {
        var vm = this;
        
        vm.sendComment = sendComment;
        vm.deleteComment = deleteComment;
        
        init();
        
        function init() {
            vm.profileUserId = $stateParams.userId;
            vm.currentUser = userService.getCurrentUser();
            getUserData();
            getUserComments();
            getUserSkills();
        }

        function getUserData() {
            userProfileService.getUserData(vm.profileUserId).then(
                function(data) {
                    vm.userData = data;
                }
            );
        }

        function getUserSkills() {
            myProfileService.getUserSkills(vm.profileUserId).then(
                function(data) {
                    vm.userSkills = data;
                }
            );
        }

        function getUserComments() {
            userProfileService.getCommentsByUserId(vm.profileUserId).then(
                function(data) {
                    vm.comments = data;
                    vm.commentsCount = data.length;
                    vm.averageRate = data.length > 0 ? _.mean(_.map(data, function(o) { return o.Rate } )).toFixed(2) : 0;
                }
            );
        }

        function sendComment(rate) {
            userProfileService.sendComment({UserToId: vm.profileUserId, UserFromId:vm.currentUser.Id, Text:vm.newCommentText, Rate:rate}).then(
                function(data) {
                    getUserComments();
                }
            );
        }

        function deleteComment(id) {
            userProfileService.deleteComment(id).then(
                function(data) {
                    getUserComments();
                }
            );
        }
    }

    /**
     * IoC container
     */
    userProfileCtrl.$inject = [
        "$scope",
        "$state",
        "$stateParams",
        "app.UserProfile.UserProfileService",
        "app.MyProfile.MyProfileService",
        "app.Entities.UserService"
    ];
})();