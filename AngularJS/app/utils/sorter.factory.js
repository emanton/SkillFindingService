/**
 * Created by Em A. on 3/29/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Utils')
        .factory('app.Utils.Sorter', sortFactory);

    /**
     * Dashboard model factory
     * @return {ConcreteSorter}
     */
    function sortFactory() {
        

        return Sorter;

        /**
         * Sort model
         * @constructor
         */
        function Sorter() {
            var sortedColumn = 
            {
                columnName: '',
                isAscending: true
            };

            return {
                getSorter: function (propertyType, propertyName) {
                    if(propertyName == sortedColumn.columnName) {
                        sortedColumn.isAscending = !sortedColumn.isAscending;
                    }
                    else{
                        sortedColumn.isAscending = true;
                    }

                    sortedColumn.columnName = propertyName;

                    switch(propertyType) {
                        case 'string': {
                            if(sortedColumn.isAscending) return new StringSorterByAscending(propertyName);
                            else return new StringSorterByDescending(propertyName);
                        }
                        case 'number': {
                            if(sortedColumn.isAscending) return new NumberSorterByAscending(propertyName);
                            else return new NumberSorterByDescending(propertyName);
                        }
                        case 'level': {
                            if(sortedColumn.isAscending) return new LevelSorterByAscending(propertyName);
                            else return new LevelSorterByDescending(propertyName);
                        }
                    }
                }
            };

            /**
             * parent class for sorters
             */
            function BaseSorter() {
                this.sort = function (arr) {
                    arr = this.sortHelper(arr);
                    return {sortedColumn : sortedColumn, items : arr};
                }
            }

            /**
             * sorts by string asc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function StringSorterByAscending(propertyName) {
                BaseSorter.call(this);
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return item[propertyName].toLowerCase() });
                    return arr;
                }
            }

            /**
             * sorts by string desc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function StringSorterByDescending(propertyName) {
                BaseSorter.call(this);
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return item[propertyName].toLowerCase() });
                    arr.reverse();
                    return arr;
                }
            }

            /**
             * sorts by number asc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function NumberSorterByAscending(propertyName) {
                BaseSorter.call(this);
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return item[propertyName] });
                    return arr;
                }
            }

            /**
             * sorts by number desc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function NumberSorterByDescending(propertyName) {
                BaseSorter.call(this);
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return item[propertyName] });
                    arr.reverse();
                    return arr;
                }
            }

            /**
             * sorts by level asc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function LevelSorterByAscending(propertyName) {
                BaseSorter.call(this);
                var priority = {High: 2, Medium: 1, Low: 0};
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return priority[item[propertyName]]; });                    
                    return arr;
                }
            }

            /**
             * sorts by level desc
             * @param {string} propertyName
             * @returns {boolean}
             */
            function LevelSorterByDescending(propertyName) {
                BaseSorter.call(this);
                var priority = {High: 2, Medium: 1, Low: 0};
                this.sortHelper = function(arr) {
                    arr = _.sortBy(arr, function(item) { return priority[item[propertyName]]; });
                    arr.reverse();
                    return arr;
                }                
            }

        }

    }

})();