(function () {

    "use strict";

    angular
        .module("app.modals")
        .factory("modals.dispatcher", modalDispatcher);

    /**
     * Modal windows dispatcher
     * @param {object} $modal
     */
    function modalDispatcher($modal) {
        return {
            login: login,
            register: register,
            addSkill: addSkill,
            createNewSkill: createNewSkill
        };

        /**
         * show message
         * @param {string} size
         * @param message
         */
        function login(size) {
            var modalWindow = $modal.open({
                templateUrl: 'app/modals/login/login.html',
                windowClass: '',
                controller: 'app.login',
                size: size,
            });

            return modalWindow.result;
        }

        /**
         * show message
         * @param {string} size
         * @param message
         */
        function register(size) {
            var modalWindow = $modal.open({
                templateUrl: 'app/modals/register/register.html',
                windowClass: '',
                controller: 'app.register',
                size: size,
            });

            return modalWindow.result;
        }

        function addSkill(userSkills) {
            var modalWindow = $modal.open({
                templateUrl: 'app/modals/add-skill/addSkill.html',
                windowClass: '',
                backdrop : false,
                controller: 'app.addSkill',
                size: 'lg',
                resolve: {
                    selectedSkills: function () {
                        return userSkills;
                    }
                }
            });

            return modalWindow.result;
        }

        function createNewSkill() {
            var modalWindow = $modal.open({
                templateUrl: 'app/modals/create-new-skill/createNewSkill.html',
                windowClass: '',
                backdrop : false,
                controller: 'app.createNewSkill',
                size: 'lg'
            });

            return modalWindow.result;
        }
    }
    
    /**
     * IoC container
     */
    modalDispatcher.$inject = [
        "$uibModal"
    ]

})();