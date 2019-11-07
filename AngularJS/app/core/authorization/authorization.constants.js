/**
 * Created by Bondarenko.D on 2/7/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Core')
        .constant('app.Core.AuthorizationConstants', {
            TOKEN_KEY: 'token',
            USER_KEY: 'user',
            VALIDATE_TOKEN_URL: 'authentication/GetUserData',
            AUTHORIZE_URL: 'authentication/token',
            GET_USER_DATA_URL: 'authentication/GetUserData'
        });
})();