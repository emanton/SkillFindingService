(function () {

    "use strict";

    angular
        .module("app.Admin")
        .factory("app.Admin.AdminService", adminService);

    function adminService(webApi, urlConstants) {

        return {
            getAllSearchRequests: getAllSearchRequests,
            getAllCategories: getAllCategories,
            addSkill: addSkill,
            getAllSkills: getAllSkills,
            addCategory: addCategory
        };

        /**
         * Get configuration
         * @returns {promise}
         */
        function getAllSearchRequests() {
            return webApi.get(urlConstants.GET_ALL_SEARCH_REQUESTS);
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function getAllCategories() {
            return webApi.get(urlConstants.GET_ALL_CATEGORIES);
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function getAllSkills() {
            return webApi.get(urlConstants.GET_ALL_SKILLS);
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function addSkill(skillData) {
            return webApi.post(urlConstants.CREATE_NEW_SKILL, skillData);
        }

        /**
         * Update user skills
         * @returns {promise}
         */
        function addCategory(categoryData) {           
            return webApi.post(urlConstants.CREATE_NEW_CATEGORY, categoryData);
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    adminService.$inject = [
        'app.Core.WebApi',
        'app.Admin.AdminConstants'
    ];
})();