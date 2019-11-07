(function () {

    "use strict";

    angular
        .module("app.UserProfile")
        .factory("app.UserProfile.UserProfileService", homeService);

    function homeService(webApi, urlConstants) {

        return {
            getUserData: getUserData,
            sendComment: sendComment,
            getCommentsByUserId: getCommentsByUserId,
            deleteComment: deleteComment
        };
        
        /**
         * Get configuration
         * @returns {promise}
         */
        function getUserData(id) {
            var compile = _.template(urlConstants.GET_USER_DATA),
                url = compile({userId: id});
                
            return webApi.get(url);
        }

        function getCommentsByUserId(id) {
            var compile = _.template(urlConstants.GET_COMMENTS_BY_USER_ID),
                url = compile({userId: id});
                
            return webApi.get(url);
        }

        /**
         * Get configuration
         * @returns {promise}
         */
        function sendComment(commentData) {
            return webApi.post(urlConstants.SEND_COMMENT, commentData);
        }

        function deleteComment(id) {
            var compile = _.template(urlConstants.DELETE_COMMENT_BY_ID),
                url = compile({commentId: id});
                
            return webApi.get(url);
        }
    }
//
    /**
     * IoC container
     * @type {[*]}
     */
    homeService.$inject = [
        'app.Core.WebApi',
        'app.UserProfile.UserProfileConstants'
    ];
})();