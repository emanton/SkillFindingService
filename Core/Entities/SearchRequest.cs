using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class SearchRequest : BaseEntity
    {
        public string AuthorId { get; set; }
        public string City { get; set; }
        public string SearchString { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public bool IsMale { get; set; }
        public bool ConsiderDestination { get; set; }

    }
}
