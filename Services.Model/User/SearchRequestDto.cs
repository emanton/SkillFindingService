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
    public class SearchRequestDto : SearchRequest, ICustomMapping
    {
        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Core.Entities.SearchRequest, SearchRequestDto>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.AuthorId, opt => opt.MapFrom(x => x.AuthorId))
                .ForMember(m => m.City, opt => opt.MapFrom(x => x.City))
                .ForMember(m => m.SearchString, opt => opt.MapFrom(x => x.SearchString))
                .ForMember(m => m.AgeFrom, opt => opt.MapFrom(x => x.AgeFrom))
                .ForMember(m => m.AgeTo, opt => opt.MapFrom(x => x.AgeTo))
                .ForMember(m => m.IsMale, opt => opt.MapFrom(x => x.IsMale))
                .ForMember(m => m.ConsiderDestination, opt => opt.MapFrom(x => x.ConsiderDestination));
        }
    }
}
