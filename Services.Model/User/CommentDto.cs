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
    public class CommentDto : ICustomMapping
    {
        public long Id { get; set; }
        public int Rate { get; set; }
        public string Text { get; set; }
        public DateTime date { get; set; }
        public UserData UserFrom { get; set; }

        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Core.Entities.Comment, CommentDto>()
                .ForMember(m => m.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(m => m.Rate, opt => opt.MapFrom(x => x.Rate))
                .ForMember(m => m.Text, opt => opt.MapFrom(x => x.Text))
                .ForMember(m => m.date, opt => opt.MapFrom(x => x.date))
                .ForMember(m => m.UserFrom, opt => opt.MapFrom(x => x.UserFrom));
        }
    }
}
