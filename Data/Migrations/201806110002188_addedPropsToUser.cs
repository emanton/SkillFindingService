namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedPropsToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Salary", c => c.Double(nullable: false));
            AddColumn("dbo.Users", "RegistrationDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "RegistrationDate");
            DropColumn("dbo.Users", "Salary");
        }
    }
}
