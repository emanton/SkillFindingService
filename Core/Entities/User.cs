using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class User : BaseEntity
    {
        public string Description { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public double Salary { get; set; } = 1;
        public int Age { get; set; }
        public DateTime Birthday { get; set; } = DateTime.Now;
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        public bool IsMale { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public string PassortCode { get; set; }
        public string Passport { get; set; }
        public bool PassportVerified { get; set; }
        public string Telephone { get; set; }
        public double Account { get; set; }
        public bool IsAdmin { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
