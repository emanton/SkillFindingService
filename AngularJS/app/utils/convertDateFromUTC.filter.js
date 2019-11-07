(function () {
    'use strict';

    angular
        .module('app.Utils')
        .filter("convertDateFromUTC", dateFilter);
    
    /**
     * Convert date time to suitable format
     */
    function dateFilter() {
        function decorateFilter(receivedDate) {
            moment.locale('en');
            var utcDate = moment.utc(receivedDate);
            var localDate = moment(utcDate).local();        
            return localDate.format('L LT ');
        }

        return decorateFilter;
    }
    })();
