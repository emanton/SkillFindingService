/**
 * Created by Bondarenko.D on 2/8/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Core')
        .factory('app.Core.AuthorizationInterceptor', authInterceptor);

    /**
     * Authorization interceptor
     * @param {object} authConstants
     * @param {object} storageManager
     * @return {{request: request}}
     */
    function authInterceptor(authConstants, storageManager) {

        return {
            request: function(config){
                config.headers['withCredentials'] = true;
                config.headers['Authorization'] = storageManager.get(authConstants.TOKEN_KEY);

                return config;
            }
        };
    }

    /**
     * IoC container
     * @type {[*]}
     */
    authInterceptor.$inject = [
        "app.Core.AuthorizationConstants",
        "app.Core.StorageManager"
    ];

})();
