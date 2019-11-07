(function () {

    "use strict";

    angular
        .module("app.Search")
        .service("app.Search.SearchService", searchService);

    function searchService(webApi, urlConstants) {

        return {
            searchByString: searchByString
        };

        /**
         * Start monitoring
         * @param {boolean} hasChanges
         * @param {object} configuration
         */
        function searchByString(searchString) {
            var compile = _.template(urlConstants.SEARCH_BY_STRING),
                url = compile({searchString: searchString});
            return webApi.get(url);
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    searchService.$inject = [
        'app.Core.WebApi',
        'app.Search.SearchConstants'
    ];
})();