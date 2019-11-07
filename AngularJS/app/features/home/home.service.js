(function () {

    "use strict";

    angular
        .module("app.Home")
        .factory("app.Home.HomeService", homeService);

    function homeService(webApi, urlConstants) {

        return {
            getConfiguration: getConfiguration
        };

        /**
         * Get configuration
         * @returns {promise}
         */
        function getConfiguration() {
            return webApi.get(urlConstants.GET_CONFIGURATION_URL).then(function (data) {
                return data.Result;
            });
        }   
    }

    /**
     * IoC container
     * @type {[*]}
     */
    homeService.$inject = [
        'app.WebApi',
        'app.Home.HomeConstants'
    ];
})();