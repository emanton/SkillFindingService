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
    public class UserSearchResult : ICustomMapping
    {
        public long Id { get; set; }
        public double Salary { get; set; }
        public string Description { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Age { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Core.Entities.User, UserSearchResult>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Firstname, opt => opt.MapFrom(x => x.Firstname))
                .ForMember(m => m.Lastname, opt => opt.MapFrom(x => x.Lastname))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
                .ForMember(m => m.Salary, opt => opt.MapFrom(x => x.Salary))
                .ForMember(m => m.Age, opt => opt.MapFrom(x => x.Age))
                .ForMember(m => m.Country, opt => opt.MapFrom(x => x.Country))
                .ForMember(m => m.City, opt => opt.MapFrom(x => x.City))
                .ForMember(m => m.Comments, opt => opt.MapFrom(x => x.Comments));
        }
    }
}
