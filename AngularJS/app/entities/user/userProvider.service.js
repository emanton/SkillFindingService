/**
 * Created by Bondarenko.D on 2/8/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Entities')
        .service('app.Entities.UserService', userService);

    /**
     * User service
     * @param {object} storageManager
     * @param {object} authConstants
     * @param {function} UserModel
     */
    function userService(storageManager, authConstants, UserModel){

        /**
         * Get current user
         * @returns {UserModel | null}
         */
        this.getCurrentUser = function(){
            var userData = storageManager.get(authConstants.USER_KEY);
            return userData ? new UserModel(userData) : null;
        };

        /**
         * Set current user
         * @param {UserModel} user
         */
        this.setCurrentUser = function(user){
            storageManager.set(authConstants.USER_KEY, user);
        };
    }

    /**
     * IoC container
     * @type {[*]}
     */
    userService.$inject = ['app.Core.StorageManager', 'app.Core.AuthorizationConstants', 'app.Entities.UserModel'];
})();