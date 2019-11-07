/**
 * Created by Bondarenko.D on 2/7/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Core')
        .provider('app.Core.AuthGuard', authGuardProvider);

    /**
     * Authorization provider
     */
    function authGuardProvider(){

        this.$get = ['app.Core.AuthorizationService', 'app.Core.AuthorizationConstants', 'app.Core.StorageManager', function(authService, authConstants, storage){
            return new AuthGuard(authService, authConstants, storage);
        }];

        function AuthGuard(authService, authConstants, storage){
            // this.authService = authService;
            // this.authConstants = authConstants;
            this.storage = storage;
        }

        // /**
        //  * Authorize user
        //  * @param {string} login
        //  * @param {string} password
        //  * @returns {promise}
        //  */
        // AuthGuard.prototype.authorizeUser = function(login, password){
        //     var that = this;
        //     return this.authService.authorizeUser({grant_type: 'password', username: login, password: password}).then(function(ticket){
        //         that.storage.set(that.authConstants.TOKEN_KEY, ticket.token);
        //         that.storage.set(that.authConstants.USER_KEY, ticket.user);
        //     });
        // };

        // /**
        //  * Validate
        //  * @returns {promise}
        //  */
        // AuthGuard.prototype.validate = function(){
        //     var token = this.storage.get(this.authConstants.TOKEN_KEY);
        //     return this.authService.validate(token);
        // };

        // /**
        //  * Is authorized
        //  * @returns {boolean}
        //  */
        // AuthGuard.prototype.isAuthorized = function(){
        //     var token = this.storage.get(this.authConstants.TOKEN_KEY);
        //     return Boolean(token);
        // };

        /**
         * Deauthorize
         */
        AuthGuard.prototype.deAuthorize = function(){
            this.storage.deleteAll();
        };

        // /**
        //  * Get authorization token
        //  * @returns {string | null}
        //  */
        // AuthGuard.prototype.getToken = function(){
        //     return this.storage.get(this.authConstants.TOKEN_KEY);
        // }
    }

})();