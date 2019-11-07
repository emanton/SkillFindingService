/**
 * Created by Bondarenko.D on 2/8/2017.
 */
(function () {

    "use strict";

    angular
        .module("app.Core")
        .service("app.Core.StorageManager", localStorageService);

    /**
     * Local storage
     */
    function localStorageService() {

        this.delete = remove;
        this.deleteAll = removeAll;
        this.get = get;
        this.set = set;

        /**
         * Return value from locale storage
         * @param {string} key
         * @returns {*}
         */
        function get(key){
            var result;
            try{
                result = angular.fromJson(localStorage.getItem(key));
            } catch(ex){
                result = localStorage.getItem(key);
            }
            return result;
        }

        /**
         * Delete specified value from localStorage.
         * @param {string} key
         */
        function remove(key){
            localStorage.removeItem(key);
        }

        /**
         * Clear localStorage.
         */
        function removeAll(){
            localStorage.clear();
        }

        /**
         * Set a new value into local storage
         * @param {string} key
         * @param {*} value
         */
        function set(key, value){
            localStorage.setItem(key, angular.toJson(value));
        }

    }
})();