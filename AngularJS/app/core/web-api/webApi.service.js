(function () {
    'use strict';

    angular
        .module('app.Core')
        .service('app.Core.WebApi', webApiService);

    /**
     * Web api service
     */
    function webApiService($http, webApiConstants, errorHandler, $q) {
        var baseUrl = webApiConstants.DOMAIN;
        // var baseUrl = webApiConstants.DOMAIN + 'api/';

        this.get = get;
        this.delete = remove;
        this.post = post;
        this.put = put;

        /**
         * Method get
         * @param {string} url
         * @param {Object=} params
         * @returns {promise}
         */
        function get(url, params) {
            return $http.get(baseUrl + url, params).then(function success(response) {
                return response.data;
            }, function fail(response) {
                return $q.reject(response);
            });
        }

        /**
         * Method delete
         * @param {String} url
         * @param {Object=} config
         * @returns {promise}
         */
        function remove(url) {
            var headers = {'Content-Type': 'application/json'};
            var params = {headers: headers};

            return $http.delete(baseUrl + url, headers).then(
                function success(response) {
                    return response.data;
                },
                function fail(response) {
                    return $q.reject(response);
                });
                
        }

        /**
         * Method post
         * @param {String} url
         * @param {*} data
         * @param {Object=} config
         * @returns {promise}
         */
        function post(url, data, config) {
            return $http.post(baseUrl + url, data, config)
                .then(
                    function success(response) {
                        return response.data;
                    },
                    function fail(response) {
                        return $q.reject(response);
                    }
                );
        }

        /**
         * Method put
         * @param {String} url
         * @param {*} data
         * @param {Object=} config
         * @returns {promise}
         */
        function put(url, data, config) {
            return $http.put(baseUrl + url, data, config).then(
                function success(response) {
                    return response.data;
                },
                function fail(response) {
                    return errorHandler.handleError(response).then(function(){
                        return $q.reject(response);
                    })
                }
            );
        }
    }


    /**
     * IoC Container
     */
    webApiService.$inject = ['$http', 'app.Core.WebApiSettings', 'app.Core.ErrorHandler', '$q'];
})();