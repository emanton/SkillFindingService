(function () {
    'use strict';

    angular
        .module('app.Core')
        .service('app.Core.ErrorHandler', errorHandler);

    /**
     * Alert Service
     */
    function errorHandler(uiNotification, storageManager, $state, modalService, $q) {
        /**
         * Error handler
         * @param {any} handler
         */
        function ErrorHandler(handler) {
            this.parent = handler;
        }

        /**
         * Handle Error
         * @param {*} err
         */
        ErrorHandler.prototype.handleError = function (err) {
            if (this.parent) {
                return this.parent.handleError(err);
            } else {
                return $q.resolve(err);
            }

        };

        /**
         * Default error handler
         */
        function DefaultErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        DefaultErrorHandler.prototype = new ErrorHandler();

        DefaultErrorHandler.prototype.handleError = function (err) {
            return ErrorHandler.prototype.handleError.call(this, err);
        };

        /**
         * Unauthorized error handler
         */
        function UnauthorizedErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        UnauthorizedErrorHandler.prototype = new ErrorHandler();

        UnauthorizedErrorHandler.prototype.handleError = function (err) {
            if (err.status == 401) {
                storageManager.deleteAll();
                $state.go('app.login');
                modalService.removelAllModals();
            }

            return ErrorHandler.prototype.handleError.call(this, err);
        };

        /**
         * Timeout error handler
         */
        function TimeoutErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        TimeoutErrorHandler.prototype = new ErrorHandler();

        TimeoutErrorHandler.prototype.handleError = function (err) {
            var self = this;
            if (err.status == 408) {
                return uiNotification.popup('Server is busy, please try again later').then(function () {
                    return ErrorHandler.prototype.handleError.call(self, err);
                });
            } else {
                return ErrorHandler.prototype.handleError.call(this, err);
            }
        };

        /**
         * Server error handler
         */
        function ServerErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        ServerErrorHandler.prototype = new ErrorHandler();

        ServerErrorHandler.prototype.handleError = function (err) {
            var self = this;
            if (err.status == 500) {
                return uiNotification.popup(err.data.Exception).then(function () {
                    return ErrorHandler.prototype.handleError.call(self, err);
                });
            } else {
                return ErrorHandler.prototype.handleError.call(self, err);
            }
        };

        /**
         * Bad request error handler
         */
        function BadRequestErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        BadRequestErrorHandler.prototype = new ErrorHandler();

        BadRequestErrorHandler.prototype.handleError = function (err) {
            var self = this;
            var message = err.data.Exception ? err.data.Exception : err.Exception;
            if (err.status == 400 && message) {
                return uiNotification.popup(message).then(function () {
                    return ErrorHandler.prototype.handleError.call(self, err);
                });
            } else {
                return ErrorHandler.prototype.handleError.call(self, err);
            }
        };

        /**
         * Bad request error handler
         */
        function NotFoundErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        NotFoundErrorHandler.prototype = new ErrorHandler();

        NotFoundErrorHandler.prototype.handleError = function (err) {
            var self = this;
            var message = err.data.Exception ? err.data.Exception : err.Exception;
            if (err.status == 404 || err.status == 409 && message) {
                return uiNotification.popup(message).then(function () {
                    return ErrorHandler.prototype.handleError.call(self, err);
                });
            } else {
                return ErrorHandler.prototype.handleError.call(self, err);
            }
        };

        /**
         * Expectation failed error handler
         */
        function ExpectationFailedErrorHandler(handler) {
            ErrorHandler.call(this, handler);
        }

        ExpectationFailedErrorHandler.prototype = new ErrorHandler();

        ExpectationFailedErrorHandler.prototype.handleError = function (err) {
            var self = this;
            var message = err.data.Exception ? err.data.Exception : err.Exception ? err.Exception : err.statusText;

            if (err.status == 417 && message) {
                return uiNotification.popup(message).then(function () {
                    return ErrorHandler.prototype.handleError.call(self, err);
                });
            } else {
                return ErrorHandler.prototype.handleError.call(self, err);
            }
        };


        var defaultHandler = new DefaultErrorHandler(),
            timeoutHandler = new TimeoutErrorHandler(defaultHandler),
            unauthorizedErrorHandler = new UnauthorizedErrorHandler(timeoutHandler),
            serverErrorHandler = new ServerErrorHandler(unauthorizedErrorHandler),
            badRequestErrorHandler = new BadRequestErrorHandler(serverErrorHandler),
            notFoundErrorHandler = new NotFoundErrorHandler(badRequestErrorHandler),
            expectationFailedErrorHandler = new ExpectationFailedErrorHandler(notFoundErrorHandler);

        /**
         * Handle error by chain
         */
        this.handleError = function (err) {
            return expectationFailedErrorHandler.handleError(err);
        }
    }

    /**
     * IoC container
     */
    errorHandler.$inject = ['app.Core.uiNotifications', 'app.Core.StorageManager', '$state', 'app.ModalService', '$q'];
})();