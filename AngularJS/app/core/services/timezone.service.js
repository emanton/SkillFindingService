/**
 * Created by Bondarenko.D on 4/14/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.Core')
        .service('app.Core.TimezoneService', timezoneService);

    /**
     * Timezone service
     */
    function timezoneService($http) {
        this.getTimezones = getTimezones;

        /**
         * Get timezones list
         * @return {*}
         */
        function getTimezones() {
            return $http.get('static/timezones.json').then(function success(result) {
                return result.data;
            });
        }
    }

    /**
     * IoC container
     * @type {[*]}
     */
    timezoneService.$inject = ['$http'];

})();