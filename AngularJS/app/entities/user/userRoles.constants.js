/**
 * Created by Bondarenko.D on 3/2/2017.
 */
(function(){
    'use strict';

    angular
        .module('app.Entities')
        .constant('app.Entities.UserRoles', {
            ADMIN: 'Admin',
            USER: 'User',
            ANONYMOUS: 'anonymous',
            PARTICIPANT: 'Participant',
            PARTICIPANT_WITH_DATA: 'ParticipantWithData',
            PARTICIPANT_WITH_POWERBI: 'ParticipantWithPowerBI'
        });
})();