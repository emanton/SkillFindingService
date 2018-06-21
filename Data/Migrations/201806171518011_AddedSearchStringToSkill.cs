namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSearchStringToSkill : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Skills", "SearchString", c => c.String());
            AddColumn("dbo.Skills", "Accepted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Skills", "Accepted");
            DropColumn("dbo.Skills", "SearchString");
        }
    }
}
