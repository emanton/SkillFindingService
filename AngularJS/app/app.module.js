(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ui.router',
        'ui.bootstrap',
        'ngMessages',
        'ncy-angular-breadcrumb',
        'ngSanitize',

        // 3rd Party Modules
        'ngTable',
        'oitozero.ngSweetAlert',
        'ui.bootstrap.showErrors',
        'permission',
        'permission.ui',

        // Custom modules
        'app.TemplateCache',
        'app.modals',
        'app.Home',
        'app.Search',
        'app.MyProfile',
        'app.UserProfile',
        'app.Admin',
        'app.Core',
        
        'app.TopNavbar',
        'app.Footer',
        'app.Entities',
        'app.Components',
        'app.Utils'
    ]);
})();