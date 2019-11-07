(function(){

    'use strict';

    angular
        .module('app.UserProfile')
        .constant('app.UserProfile.UserProfileConstants', {
            GET_USER_DATA: 'User/GetUserData/${userId}',
            GET_COMMENTS_BY_USER_ID: 'User/GetCommentsByUserId/${userId}',
            SEND_COMMENT: 'User/SendComment',
            DELETE_COMMENT_BY_ID: 'User/DeleteCommentById/${commentId}'
        });
})();
