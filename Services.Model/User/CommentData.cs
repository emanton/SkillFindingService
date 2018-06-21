using AutoMapper;
using Services.Model.Mappings.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Model.User
{
    public class CommentData
    {
        public long UserToId { get; set; }
        public long UserFromId { get; set; }
        public string Text { get; set; }
        public int Rate { get; set; }
    }
}
