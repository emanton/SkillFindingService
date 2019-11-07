/**
 * Created by Bondarenko.D on 2/13/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.Entities')
        .factory('app.Entities.UserModel', userModelFactory);

    function userModelFactory() {
        function UserModel(options) {
            this.Id = options.Id;
            this.Age = options.Age;
            this.Birthday = options.Birthday;
            this.RegistrationDate = options.RegistrationDate;
            this.Salary = options.Salary;
            this.City = options.City;
            this.Country = options.Country;
            this.Email = options.Email;
            this.IsAdmin = options.IsAdmin;
            this.Firstname = options.Firstname;
            this.IsMale = options.IsMale;
            this.Lastname = options.Lastname;
            this.PassortCode = options.PassortCode;
            this.PassportVerified = options.PassportVerified;
            this.Telephone = options.Telephone;
            this.Account = options.Account;
        }

        return UserModel;
    }

})();