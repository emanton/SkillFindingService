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
    public class CategoryDto : ICustomMapping
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<CategoryDto, Category>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Name, opt => opt.MapFrom(x => x.Name))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description));

            configuration.CreateMap<Category, CategoryDto>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Name, opt => opt.MapFrom(x => x.Name))
                .ForMember(m => m.Description, opt => opt.MapFrom(x => x.Description));
        }
    }
}
