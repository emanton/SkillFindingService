namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedComent : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.UserSkills", newName: "SkillUsers");
            DropPrimaryKey("dbo.SkillUsers");
            AddColumn("dbo.Comments", "Rate", c => c.String());
            AddColumn("dbo.Comments", "Text", c => c.String());
            AddColumn("dbo.Comments", "date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Comments", "User_Id", c => c.Long());
            AddPrimaryKey("dbo.SkillUsers", new[] { "Skill_Id", "User_Id" });
            CreateIndex("dbo.Comments", "User_Id");
            AddForeignKey("dbo.Comments", "User_Id", "dbo.Users", "Id");
            DropColumn("dbo.Comments", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Comments", "Name", c => c.String());
            DropForeignKey("dbo.Comments", "User_Id", "dbo.Users");
            DropIndex("dbo.Comments", new[] { "User_Id" });
            DropPrimaryKey("dbo.SkillUsers");
            DropColumn("dbo.Comments", "User_Id");
            DropColumn("dbo.Comments", "date");
            DropColumn("dbo.Comments", "Text");
            DropColumn("dbo.Comments", "Rate");
            AddPrimaryKey("dbo.SkillUsers", new[] { "User_Id", "Skill_Id" });
            RenameTable(name: "dbo.SkillUsers", newName: "UserSkills");
        }
    }
}
