using AutoMapper;
using Services.Model.Mappings.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Model.User
{
    public class UserSettings : ICustomMapping
    {
        public long Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }

        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //configuration.CreateMap<Core.Entities.User, UserSettings>()
            //    .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
            //    .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
            //    .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
            //    .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
            //    .ForMember(m => m.Birthday, opt => opt.MapFrom(x => x.Birthday))
            //    .ForMember(m => m.Age, opt => opt.MapFrom(x => x.Age))
            //    .ForMember(m => m.IsMale, opt => opt.MapFrom(x => x.IsMale))
            //    .ForMember(m => m.Email, opt => opt.MapFrom(x => x.Email))
            //    .ForMember(m => m.Country, opt => opt.MapFrom(x => x.Country))
            //    .ForMember(m => m.City, opt => opt.MapFrom(x => x.City))
            //    .ForMember(m => m.PassortCode, opt => opt.MapFrom(x => x.PassortCode))
            //    .ForMember(m => m.PassportVerified, opt => opt.MapFrom(x => x.PassportVerified))
            //    .ForMember(m => m.Telephone, opt => opt.MapFrom(x => x.Telephone))
            //    .ForMember(m => m.Account, opt => opt.MapFrom(x => x.Account))
            //    .ForMember(m => m.IsAdmin, opt => opt.MapFrom(x => x.IsAdmin));

            configuration.CreateMap<UserSettings, Core.Entities.User>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Password, opt => opt.MapFrom(x => x.NewPassword));

        }
    }
}
