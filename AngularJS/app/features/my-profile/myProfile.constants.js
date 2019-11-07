(function(){

    'use strict';

    angular
        .module('app.MyProfile')
        .constant('app.MyProfile.MyProfileConstants', {
            GET_ALL_SKILLS: 'Skill/GetSkills',
            GET_USER_SKILLS: 'UserSkill/GetUserSkills?id=${id}',
            ADD_USER_SKILLS: 'UserSkill/AddUserSkill',
            REMOVE_USER_SKILLS: 'UserSkill/RemoveUserSkill/${userId}/${skillId}',
            UPDATE_USER_DATA: 'User/UpdateUserData',
            UPDATE_USER_SETTINGS: 'User/UpdateUserSettings',
        });
})();
