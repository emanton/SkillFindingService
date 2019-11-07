/**
 * Created by Bondarenko.D on 2/17/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.Core')
        .factory('app.Core.ApiError', apiError);

    /**
     * Api error model factory
     */
    function apiError() {
        return ApiError;

        /**
         * Api error model
         * @param {number} statusCode
         * @param {string} message
         */
        function ApiError(statusCode, message) {
            Object.defineProperty(this, 'StatusCode', {
                value: statusCode,
                enumerable: true,
                writable: false,
                configurable: false
            });
            Object.defineProperty(this, 'Message', {
                value: message,
                configurable: false,
                enumerable: true,
                writable: false
            });
        }
    }
})();