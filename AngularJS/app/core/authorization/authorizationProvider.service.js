/**
 * Created by Bondarenko.D on 2/7/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.Core')
        .service('app.Core.AuthorizationService', authorizationService);

    /**
     * Authorization service
     * @param {object} webApi
     * @param {object} authorizationConstants
     * @param {object} $q
     * @param {function} ApiError
     */
    function authorizationService(webApi, authorizationConstants, $q, ApiError) {

        /**
         * Authorize user
         * @param {{username: string, password: string, grant_type: string}} params
         * @returns {promise}
         */
        this.authorizeUser = function (params) {
            var authStr = ['grant_type=' + params.grant_type, 'username=' + params.username, 'password=' + params.password].join('&');
            return webApi.post(authorizationConstants.AUTHORIZE_URL, authStr).then(function (response) {
                //todo: Have to update API to combine this 2 requests
                localStorage.setItem('token', JSON.stringify(_.capitalize(response.token_type) + ' ' + response.access_token));
                return webApi.get(authorizationConstants.GET_USER_DATA_URL).then(function (data) {
                    return {
                        token: _.capitalize(response.token_type) + ' ' + response.access_token,
                        user: data.Result
                    }
                },function (response) {
                    var error = new ApiError(response.status, response.data.error_description);
                    localStorage.clear();
                    return $q.reject(error);
                }
            );
            }, function (response) {
                var error = new ApiError(response.status, response.data.error_description);
                return $q.reject(error);
            });
        };

        /**
         * Validate token
         * @param {string} token
         */
        this.validateToken = function (token) {
            return webApi.get(authorizationConstants.GET_USER_DATA_URL);
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    authorizationService.$inject = ['app.Core.WebApi', 'app.Core.AuthorizationConstants', '$q', 'app.Core.ApiError'];
})();