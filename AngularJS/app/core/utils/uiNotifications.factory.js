(function () {
    
        "use strict";
    
        angular
            .module("app.Core")
            .service("app.Core.uiNotifications", uiNotifications);

        /**
         * Special anglar.js factory to manage modal notifications.
         * @param $rootScope
         */
        function uiNotifications($rootScope, $q) {
    
            var defaultMessages = {
                "CallbackIsNotFunction": "Specified parameter tried to implement the function behavior, however it doesn't have an appropriate functionality.",
                "ConnectionRefused": "Connection was refused due to following reasons: 1) Your connection responding slowly. 2) Maybe the server is not available.",
                "Conflict409": "Conflict [409]: This error seldom occurs in most Web traffic, particularly when the client system is a Web browser. The problem can only be resolved by examining what your client system is trying to do then discussing with your ISP why that behaviour is not allowed.",
                "DontHavePermission": "You don't have a permission to invoke that request. Please, authorize and try again. If problem exists, check a specified 'headers.Authorization' parameter.",
                "LoginFailed": "Authorization error: login or password is incorrect. Please, check it and try again.",
                "BadRequest": "Bad request [400]: The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
                "NotFound404": "Not found [404]: The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.",
                "ResponseNull": "The data in response is 'null'. Please, check you request settings and connection with API.",
                "ServerIsOffline": "Internal Server Error [500]: A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
                "ServerUnexpectedError": "Unexpected server error.",
                "VariableIsUndefined": "Attempt to get a non-existent variable. Make sure that the variable is declared.",
                "Unauthorized": "Unauthorized [401]: The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource."
            };
    
            return {
                msg: defaultMessages,
                popup: popup,
                confirm: confirm,
                inform: inform,
                customConfirm: customConfirm,
                customInform: customInform
            };
    
            /**
             * Generate callback-function with an appropriate actions method.
             * @param action {Function | null}
             * @param msg {String | null}
             * @param opts {Object | null}
             * @returns {*}
             */
            function confirm(action, msg, opts){
                if (action == null) throw new Error (defaultMessages.VariableIsUndefined);
                var lobibox = Lobibox.confirm({
                    baseClass: 'animated-super-fast hyphenate',
                    msg: msg || "Do you really want to do this?",
                    callback: function ($this, type, ev) {
                        if (type == "yes") {
                            try {
                                $rootScope.$apply(action);
                            }
                            catch (err) {
                                console.log(err);
                                throw new Error([err, ". ", defaultMessages.CallbackIsNotFunction].join(""));
                            }
                        }
                    },
                    title: opts ? opts.title : "Confirmation"
                });
                
                Hyphenator.hyphenate($(".hyphenate").get(0), 'en');
                return lobibox;
            }
    
            /**
             * Plain and simple window to describe a specific user action.
             * @param {String|null} msg
             * @param {String|null} type. Possible variants: "error", "info", "success", "warning"  
             * @param {Object|null} opts
             */
            function inform(msg, type, opts){
                var lobibox = Lobibox.notify(type || "success", {
                    showClass: 'animated-super-fast hyphenate',
                    msg: msg || "Description.",
                    sound: opts && opts.sound? opts.sound : false,
                    delay: opts && opts.delay? opts.delay : 5000,
                    title: opts && opts.title? opts.title : upperFirstLetter(type || "success"),
                    messageHeight: opts && opts.messageHeight? opts.messageHeight : 60,
                    width: opts && opts.width? opts.width : 400
                });
    
                Hyphenator.hyphenate($(".hyphenate").get(0), 'en');
                return lobibox;
            }
    
            /**
             * Validate data and if received type 'array' - concatenate all messages or just display itself.
             * @param {Array|String|Number} data
             * @param {String} msgType
             * @param {Function} callback
             */
            function popup(data, msgType, callback) {
                if (angular.isArray(data)) {
                    var errorList = data.join(' ');
                    return simplePopup(errorList, msgType, callback);
                } else if (angular.isString(data)) {
                    return simplePopup(data, msgType, callback);
                } else {
                    return simplePopup(data ? data.Exception : defaultMessages.ResponseNull, msgType, callback);
                }
            }
    
            /**
             * Default popup messenger.
             * @param {String|Number} msg
             * @param {String} type
             * @param {Function} callback
             */
            function simplePopup(msg, type, callback) {
                var defer = $q.defer();
                Lobibox.alert(type || 'error', {
                    baseClass: 'animated-super-fast hyphenate',
                    msg: msg,
                    closeButton: false,
                    draggable: true,
                    callback: function($this, type, ev){
                        if (type == 'ok' && callback) {
                            callback();
                        }
                        defer.resolve({});
                    }
                });
                $(".lobibox").css({
                    'z-index': '999999999'
                });
    
                Hyphenator.hyphenate($(".hyphenate").get(0), 'en');

                return defer.promise;
            }
    
            function customConfirm(buttons, msg, opts){
                if (buttons == null || buttons.length == 0) throw new Error (defaultMessages.VariableIsUndefined);
                var customBaseClass = opts && opts.baseClass ? opts.baseClass : "";
                var lobibox = Lobibox.confirm({
                    baseClass: 'animated-super-fast hyphenate ' + customBaseClass,
                    msg: msg || "Do you really want to do this?",
                    closeButton: false,
                    buttons: buttons,
                    callback: function ($this, type) {
                        try {
                            if(buttons[type].callback){
                                buttons[type].callback();
                            }
                        }
                        catch (err) {
                            console.log(err);
                            throw new Error([err, ". ", defaultMessages.CallbackIsNotFunction].join(""));
                        }
    
                    },
                    title: opts ? opts.title : "Confirmation",
                    iconClass: opts ? opts.iconClass : "glyphicon glyphicon-question-sign"
                });

                Hyphenator.hyphenate($(".hyphenate").get(0), 'en');
                return lobibox;
            }
    
            function customInform(msg, type, opts) {
                var lobibox = Lobibox.notify(type || "success", {
                    showClass: 'animated-super-fast hyphenate',
                    msg: msg || "Description.",
                    sound: opts && opts.sound ? opts.sound : false,
                    delay: opts && opts.delay ? opts.delay : 5000,
                    title: opts && opts.title ? opts.title : upperFirstLetter(type || "success"),
                    messageHeight: opts && opts.messageHeight ? opts.messageHeight : 60,
                    width: opts && opts.width ? opts.width : 400,
                    onClick: opts && opts.onclick ? function(){ opts.onclick(); this.remove(); } : null,
                    closeOnClick: opts && opts.closeOnClick ? opts.closeOnClick : null,
                    closable: opts && opts.closable ? opts.closable : null
                });
                var remove = lobibox.remove;
                lobibox.remove = function () {
                    opts.onclose();
                    remove();
                };

                Hyphenator.hyphenate($(".hyphenate").get(0), 'en');
                return lobibox;
            }
    
            function upperFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
    
        }
    
        uiNotifications.$inject = ['$rootScope', '$q'];
    })();
