using AutoMapper;
using AutoMapper.Configuration;
using Core.Entities;
using Services.Model.Mappings.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Model.User
{
    public class SkillDto : ICustomMapping
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SearchString { get; set; }
        public bool Accepted { get; set; }
        public Category Category { get; set; }
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<SkillDto, Skill>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Name, opt => opt.MapFrom(x => x.Name))
                .ForMember(m => m.SearchString, opt => opt.MapFrom(x => x.SearchString))
                .ForMember(m => m.Accepted, opt => opt.MapFrom(x => x.Accepted))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
                .ForMember(m => m.Category, opt => opt.MapFrom(x => x.Category));

            configuration.CreateMap<Skill, SkillDto>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Name, opt => opt.MapFrom(x => x.Name))
                .ForMember(m => m.SearchString, opt => opt.MapFrom(x => x.SearchString))
                .ForMember(m => m.Accepted, opt => opt.MapFrom(x => x.Accepted))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description))
                .ForMember(m => m.Category, opt => opt.MapFrom(x => x.Category));
        }
    }
}
