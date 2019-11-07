(function () {
    'use strict';

    angular
        .module('app.Utils')
        .filter("percentConverter", percentConverterFilter);

    /**
     * Convert values to percentage 
     */
    function percentConverterFilter() {
        return _.memoize(function filter(data) {
            if (!data) return data;
            if (data.length === 0) return data;
            var count = _.sumBy(data, function(item){return item.value});

            var a = _.transform(data, function(result, n){
                if(!count){return result;}
                var percentage = Math.round(Number(n.value) * 100/count);
                if(percentage === 0){
                    var other = _.find(result,function(item){return item.name === 'Others'/*item.value === 0*/;});

                    if(other){
                        other.rawItems = _.union(other.rawItems, n.rawItems);
                    }else{
                        result.push({name: 'Others', value: 0, rawItems: n.rawItems});
                    }
                }else{
                    result.push({name: n.name, value: percentage, rawItems: n.rawItems})
                }

            }, []);

            var sum = 0;
            var largestItem = _.maxBy(a, function (item) { return item.value });
            _.forEach(a, function (item) {
                sum += item.value;
            });
            var residue = 100 - sum;

            if (residue < 0) {
                largestItem.value -= Math.abs(residue);
            } else {
                if (residue > 0) {
                    var other = _.find(a, function(item){return item.name === 'Others'/*item.value === 0*/;});
                    if(other){other.value = Math.abs(residue)}
                }else{
                    var other = _.find(a, function(item){return item.name === 'Others'/*item.value === 0*/;});
                    if(other){
                        largestItem.value -= 1;
                        other.value = 1
                    }
                }
            }


            return a;
        });

    }
})();