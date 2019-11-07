(function(){

    'use strict';

    angular
        .module('app.TopNavbar')
        .constant('app.TopNavbar.TopNavbarConstants', {
            REGISTER: 'User/Registration',
            LOGIN: 'api/authentication/token',
            GET_USER_DATA_URL: 'User/GetUserData'
        });

})();