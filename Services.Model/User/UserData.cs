using AutoMapper;
using AutoMapper.Configuration;
using Services.Model.Mappings.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Model.User
{
    public class UserData : ICustomMapping
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public double Salary { get; set; }
        public DateTime Birthday { get; set; } = DateTime.Now;
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        public bool IsMale { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        //public string Street { get; set; }
        //public string House { get; set; }
        public string PassortCode { get; set; }
        //public string Passport { get; set; }
        public bool PassportVerified { get; set; }
        public string Telephone { get; set; }
        public double Account { get; set; }
        public bool IsAdmin { get; set; }
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Core.Entities.User, UserData>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
                .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
                .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
                .ForMember(m => m.Birthday, opt => opt.MapFrom(x => x.Birthday))
                .ForMember(m => m.RegistrationDate, opt => opt.MapFrom(x => x.RegistrationDate))
                .ForMember(m => m.Age, opt => opt.MapFrom(x => x.Age))
                .ForMember(m => m.Salary, opt => opt.MapFrom(x => x.Salary))
                .ForMember(m => m.IsMale, opt => opt.MapFrom(x => x.IsMale))
                .ForMember(m => m.Email, opt => opt.MapFrom(x => x.Email))
                .ForMember(m => m.Country, opt => opt.MapFrom(x => x.Country))
                .ForMember(m => m.City, opt => opt.MapFrom(x => x.City))
                .ForMember(m => m.PassortCode, opt => opt.MapFrom(x => x.PassortCode))
                .ForMember(m => m.PassportVerified, opt => opt.MapFrom(x => x.PassportVerified))
                .ForMember(m => m.Telephone, opt => opt.MapFrom(x => x.Telephone))
                .ForMember(m => m.Account, opt => opt.MapFrom(x => x.Account))
                .ForMember(m => m.IsAdmin, opt => opt.MapFrom(x => x.IsAdmin));

            configuration.CreateMap<UserData, Core.Entities.User>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
                .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
                .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
                .ForMember(m => m.Birthday, opt => opt.MapFrom(x => x.Birthday))
                .ForMember(m => m.RegistrationDate, opt => opt.MapFrom(x => x.RegistrationDate))
                .ForMember(m => m.Age, opt => opt.MapFrom(x => x.Age))
                .ForMember(m => m.IsMale, opt => opt.MapFrom(x => x.IsMale))
                .ForMember(m => m.Email, opt => opt.MapFrom(x => x.Email))
                .ForMember(m => m.Country, opt => opt.MapFrom(x => x.Country))
                .ForMember(m => m.City, opt => opt.MapFrom(x => x.City))
                .ForMember(m => m.PassortCode, opt => opt.MapFrom(x => x.PassortCode))
                .ForMember(m => m.PassportVerified, opt => opt.MapFrom(x => x.PassportVerified))
                .ForMember(m => m.Telephone, opt => opt.MapFrom(x => x.Telephone))
                .ForMember(m => m.Account, opt => opt.MapFrom(x => x.Account))
                .ForMember(m => m.IsAdmin, opt => opt.MapFrom(x => x.IsAdmin));
        }
    }
}
