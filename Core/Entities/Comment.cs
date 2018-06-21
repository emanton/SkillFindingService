using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Comment : BaseEntity
    {
        public int Rate { get; set; }
        public string Text { get; set; }
        public DateTime date { get; set; }
        public virtual User UserFrom { get; set; }
        public virtual User UserTo { get; set; }
    }
}
