(function () {

    'use strict';

    angular
        .module("app.Core")
        .constant('app.Core.WebApiSettings', {
            
            "DOMAIN": "http://localhost:62028/",
            // "DOMAIN": "/",
            "SESSION_EXPIRE": null
        });
})();