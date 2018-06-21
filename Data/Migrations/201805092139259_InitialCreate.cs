namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SearchRequests",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        AuthorId = c.String(),
                        City = c.String(),
                        SearchString = c.String(),
                        AgeFrom = c.Int(nullable: false),
                        AgeTo = c.Int(nullable: false),
                        IsMale = c.Boolean(nullable: false),
                        ConsiderDestination = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Skills",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Category_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .Index(t => t.Category_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Firstname = c.String(),
                        Lastname = c.String(),
                        Password = c.String(),
                        Age = c.Int(nullable: false),
                        Birthday = c.DateTime(nullable: false),
                        IsMale = c.Boolean(nullable: false),
                        Email = c.String(),
                        Country = c.String(),
                        City = c.String(),
                        Street = c.String(),
                        House = c.String(),
                        PassortCode = c.String(),
                        Passport = c.String(),
                        PassportVerified = c.Boolean(nullable: false),
                        Telephone = c.String(),
                        Account = c.Double(nullable: false),
                        IsAdmin = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserSkills",
                c => new
                    {
                        User_Id = c.Long(nullable: false),
                        Skill_Id = c.Long(nullable: false),
                    })
                .PrimaryKey(t => new { t.User_Id, t.Skill_Id })
                .ForeignKey("dbo.Users", t => t.User_Id, cascadeDelete: true)
                .ForeignKey("dbo.Skills", t => t.Skill_Id, cascadeDelete: true)
                .Index(t => t.User_Id)
                .Index(t => t.Skill_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserSkills", "Skill_Id", "dbo.Skills");
            DropForeignKey("dbo.UserSkills", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Skills", "Category_Id", "dbo.Categories");
            DropIndex("dbo.UserSkills", new[] { "Skill_Id" });
            DropIndex("dbo.UserSkills", new[] { "User_Id" });
            DropIndex("dbo.Skills", new[] { "Category_Id" });
            DropTable("dbo.UserSkills");
            DropTable("dbo.Users");
            DropTable("dbo.Skills");
            DropTable("dbo.SearchRequests");
            DropTable("dbo.Comments");
            DropTable("dbo.Cities");
            DropTable("dbo.Categories");
        }
    }
}
