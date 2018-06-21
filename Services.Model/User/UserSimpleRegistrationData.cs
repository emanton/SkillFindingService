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
    public class UserSimpleRegistrationData : ICustomMapping
    {
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        //public string Age { get; set; }
        //public string Country { get; set; }
        //public string City { get; set; }
        //public string Street { get; set; }
        //public string House { get; set; }
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //configuration.CreateMap<Core.Entities.User, UserSimpleRegistrationData>()
            //    .ForMember(m => m.Email, opt => opt.MapFrom(x => x.Email))
            //    .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
            //    .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
            //    .ForMember(m => m.Password, opt => opt.MapFrom(x => x.Password))
            //    .ForMember("", opt => opt.MapFrom(x => x.Account))
            //    .ForMember("", opt => opt.MapFrom(x => x.Age))
            //    .ForMember("", opt => opt.MapFrom(x => x.Birthday))
            //    .ForMember("", opt => opt.MapFrom(x => x.City))
            //    .ForMember("", opt => opt.MapFrom(x => x.Country))
            //    .ForMember("", opt => opt.MapFrom(x => x.House))
            //    .ForMember("", opt => opt.MapFrom(x => x.IsAdmin))
            //    .ForMember("", opt => opt.MapFrom(x => x.IsMale))
            //    .ForMember("", opt => opt.MapFrom(x => x.PassortCode))
            //    .ForMember("", opt => opt.MapFrom(x => x.Passport))
            //    .ForMember("", opt => opt.MapFrom(x => x.PassportVerified))
            //    .ForMember("", opt => opt.MapFrom(x => x.Street))
            //    .ForMember("", opt => opt.MapFrom(x => x.Telephone))
            //    .ForMember("", opt => opt.MapFrom(x => x.Skills))
            //    ;

            configuration.CreateMap<UserSimpleRegistrationData, Core.Entities.User>()
                .ForMember(m => m.Telephone, opt => opt.MapFrom(x => x.Telephone))
                .ForMember(m => m.Email, opt => opt.MapFrom(x => x.Email))
                .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
                .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
                .ForMember(m => m.Password, opt => opt.MapFrom(x => x.Password));
        }
    }
}
