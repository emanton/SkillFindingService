/**
 * Created by Bondarenko.D on 8/1/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.Core')
        .factory('app.Core.Utils.Observer', observerFactory);

    /**
     * Observer factory
     * @return {Observer}
     */
    function observerFactory() {

        /**
         * Observer
         * @constructor
         */
        function Observer() {

            var subscribers = [];

            /**
             * Notify all subscribers
             * @param eventType
             * @param field
             * @param value
             */
            this.notify = function (eventType, field, value) {
                _.forEach(subscribers, function (subscriber) {
                    subscriber.changeHandler(eventType, field, value);
                });
            };

            /**
             * Subscribe
             * @param subscriber
             */
            this.subscribe = function (subscriber) {
                subscribers.push(subscriber);
            };

            /**
             * Unsubscribe
             * @param subscriber
             */
            this.unsubscribe = function (subscriber) {
                subscribers = _.remove(subscribers, function (existedSubscriber) {
                    return subscriber === existedSubscriber;
                });
            };
        }

        return Observer;
    }
})();