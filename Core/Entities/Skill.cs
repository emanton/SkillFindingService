using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Skill : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string SearchString { get; set; }
        public bool Accepted { get; set; }
        public virtual Category Category { get; set; }
        public List<User> Users { get; set; }
    }
}
