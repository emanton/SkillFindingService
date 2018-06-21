using Core.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappings
{
    public class SearchRequestMapping : EntityTypeConfiguration<SearchRequest>
    {
        public SearchRequestMapping()
        {
            ToTable("SearchRequests");
            Property(x => x.Id).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            HasKey(x => x.Id);
        }
        
    }
}
