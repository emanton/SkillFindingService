(function () {
    'use strict';

    angular
        .module('app.Utils')
        .filter("manipulatingDateFilter", dateFilter);
    
    /**
     * Convert date time to suitable format
     */
    function dateFilter() {
        function decorateFilter(receivedDate) {
            moment.locale('en');
            var resultString = "";
            // var utcDate = moment.utc(receivedDate);
            // var localDate = moment(utcDate).local();
            var localDate = moment(receivedDate).local();
            var now = moment();

            var hoursDifference = now.diff(localDate, "hours");

            if(hoursDifference < 12) {
                resultString += localDate.fromNow();
            }
            else {
                resultString += localDate.format('L LT ');
            }

            return resultString;
        }

        return decorateFilter;

    }
    })();
