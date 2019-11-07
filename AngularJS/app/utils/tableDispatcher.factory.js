(function(){

    "use strict";

    angular
        .module("app.Utils")
        .factory("app.Utils.tableDispatcher", tableDispatcher);

    function tableDispatcher(CONST){

        var data, initData, isFirst;

        return {
            CONST: CONST,
            highLightEffect: highLightEffect,
            registerTable: function(){

                data = [];
                initData = [];
                isFirst = true;

                return {
                    define: define,
                    getData: getData,
                    keypress: keypress,
                    searchByQuery: searchByQuery,
                    setPaging: setPaging,
                    sortBy: sortBy
                };

            }
        };

        // Register new data collection.
        function define(collection){
            if (isFirst) {
                data = initData = collection;
                isFirst = !isFirst;
            } else {
                data = collection;
            }
        }

        function getData(){
            return data;
        }

        // Try to use suitable callback function when was pressed "Enter" button inside search field.
        function keypress($event, callback){
            $event.keyCode === 13 && callback();
            return false;
        }

        // Internal search implementation without server requests.
        function searchByQuery(query){
            data = initData;
            if (query != null) {
                return data.filter(function(el){
                    var keys = Object.keys(el),
                        isExist;
                    isExist = keys.some(function(k){
                        if(!el[k]) return false;
                        
                        var temp = el[k].toString();
                        return temp.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                    return isExist;
                });
            } else {
                return data;
            }
        }

        // Send a new data collection when was clicked pagination buttons.
        function setPaging($scope, currentPage){
            var cp = currentPage || $scope.bigCurrentPage;
            var begin = ((cp - 1) * $scope.itemsPerPage)
                , end = begin + $scope.itemsPerPage;
            return data ? getData().slice(begin, end) : [];
        }

        // Sort icon behaviour on ui-side, data sorting procedure performs on server-side.
        function sortBy(orderBy, vm){
            vm.orderBy = orderBy;
            vm.orderDirection = vm.orderDirection == "asc" ? "desc" : "asc" ;
            vm.search(vm.searchValue);

            // Icon behaviour near the table headers when user clicked there.
            var icon = $(CONST.TABLE_SORT_OPTIONS.ICON);
            icon.show();
            vm.sorterIcon = vm.orderDirection == "desc" ? CONST.TABLE_SORT_OPTIONS.DESC_ICON : CONST.TABLE_SORT_OPTIONS.ASC_ICON;
            $(CONST.TABLE_SORT_OPTIONS.HEADER_ID_PREFIX + orderBy).append(icon);
        }

        // Highlight selected rows inside all existing tables on the page.
        // All tables have to have css-class "highlighted" to use that property.
        function highLightEffect(){
            $('table').on('click', 'tbody tr', function () {
                $(this).addClass('highlight').siblings().removeClass('highlight');
            });
        }

    }

    // IoC container.
    tableDispatcher.$inject = [
        "appConstant.main"
    ];

})();