(function () {

    "use strict";

    angular
        .module("app.MyProfile")
        .factory("app.MyProfile.MyProfileService", homeService);

    function homeService(webApi, urlConstants) {

        return {
            getAllSkills: getAllSkills,
            addUserSkill: addUserSkill,
            deleteUserSkill: deleteUserSkill,
            getUserSkills: getUserSkills,
            updateUserData: updateUserData,
            updateUserSettings: updateUserSettings
        };

        /**
         * Get configuration
         * @returns {promise}
         */
        function getAllSkills() {
            return webApi.get(urlConstants.GET_ALL_SKILLS).then(function (data) {
                return data;
            });
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function getUserSkills(id) {
            var compile = _.template(urlConstants.GET_USER_SKILLS),
                url = compile({id: id});
                
            return webApi.get(url).then(function (data) {
                return data;
            });
        }

        /**
         * Update user skills
         * @returns {promise}
         */
        function updateUserData(userData) {           
            return webApi.put(urlConstants.UPDATE_USER_DATA, userData).then(function (data) {
                return data;
            });
        }

        /**
         * Update user skills
         * @returns {promise}
         */
        function updateUserSettings(userDataSettings) {           
            return webApi.put(urlConstants.UPDATE_USER_SETTINGS, userDataSettings).then(function (data) {
                return data;
            });
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function addUserSkill(userId, skillId) {
            return webApi.post(urlConstants.ADD_USER_SKILLS, {UserId: userId, SkillId: skillId}).then(function (data) {
                return data;
            });
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function deleteUserSkill(userId, skillId) {
            var compile = _.template(urlConstants.REMOVE_USER_SKILLS),
                url = compile({userId: userId, skillId: skillId});
            return webApi.delete(url).then(function (data) {
                return data;
            });
        }   
    }

    /**
     * IoC container
     * @type {[*]}
     */
    homeService.$inject = [
        'app.Core.WebApi',
        'app.MyProfile.MyProfileConstants'
    ];
})();