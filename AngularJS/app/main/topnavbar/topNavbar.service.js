(function () {

    "use strict";

    angular
        .module("app.TopNavbar")
        .factory("app.TopNavbar.TopNavbarService", topNavbarService);

    function topNavbarService(webApi, urlConstants) {

        return {
            register: register,
            login: login
        };

        function register(userData) {
            return webApi.post(urlConstants.REGISTER, userData);
        }

        function login(loginData) {
            var authStr = ['grant_type=password', 'username=' + loginData.login, 'password=' + loginData.password].join('&');
            return webApi.post(urlConstants.LOGIN, authStr).then(function (response) {
                localStorage.setItem('token', JSON.stringify(_.capitalize(response.token_type) + ' ' + response.access_token));
                return webApi.get(urlConstants.GET_USER_DATA_URL).then(function (data) {
                    return {
                        token: _.capitalize(response.token_type) + ' ' + response.access_token,
                        user: data
                    }
                },function (response) {
                    var error = new ApiError(response.status, response.data.error_description); // TODO
                    localStorage.clear();
                    return $q.reject(error);
                }
            );
            }, function (response) {
                var error = new ApiError(response.status, response.data.error_description);
                return $q.reject(error);
            });;
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    topNavbarService.$inject = [
        'app.Core.WebApi',
        'app.TopNavbar.TopNavbarConstants'
    ];
})();