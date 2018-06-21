using Core.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappings
{
    public class SkillMapping : EntityTypeConfiguration<Skill>
    {
        public SkillMapping()
        {
            ToTable("Skills");

            HasKey(x => x.Id);
            Property(x => x.Id).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.Name).IsRequired().HasMaxLength(256);
        }
        
    }
}
