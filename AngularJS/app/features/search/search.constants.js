(function(){

    'use strict';

    angular
        .module('app.Search')
        .constant('app.Search.SearchConstants', {
            SEARCH_BY_STRING: 'User/Search/${searchString}'
        });

})();

