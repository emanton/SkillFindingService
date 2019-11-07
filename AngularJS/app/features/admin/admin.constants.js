(function(){

    'use strict';

    angular
        .module('app.Admin')
        .constant('app.Admin.AdminConstants', {
            GET_ALL_SEARCH_REQUESTS: 'User/GetAllSearchRequests',
            GET_ALL_CATEGORIES: 'Skill/GetCategories',
            GET_ALL_SKILLS: 'Skill/GetSkills',
            CREATE_NEW_SKILL: 'Skill/AddSkill',
            CREATE_NEW_CATEGORY: 'Skill/AddCategory',
        });
})();
