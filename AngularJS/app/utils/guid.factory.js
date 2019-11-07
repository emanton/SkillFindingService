/**
 * Created by Bondarenko.D on 4/6/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Utils')
        .factory('app.Utils.GuidGenerator', guidGenerator);

    /**
     * Guid generator
     * @return {{generate: generate}}
     */
    function guidGenerator(){

        var regexp = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

        function generate(){
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }

        function validate(value) {
            return regexp.test(value);
        }

        function getGuidRegExp(){
            return regexp;
        }

        return {
            generate: generate,
            validate: validate,
            getGuidRegExp: getGuidRegExp
        };
    }
})();