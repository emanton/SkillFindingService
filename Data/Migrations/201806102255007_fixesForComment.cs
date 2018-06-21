namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixesForComment : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "UserFrom_Id", c => c.Long());
            AddColumn("dbo.Comments", "UserTo_Id", c => c.Long());
            AlterColumn("dbo.Comments", "Rate", c => c.Int(nullable: false));
            CreateIndex("dbo.Comments", "UserFrom_Id");
            CreateIndex("dbo.Comments", "UserTo_Id");
            AddForeignKey("dbo.Comments", "UserFrom_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Comments", "UserTo_Id", "dbo.Users", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "UserTo_Id", "dbo.Users");
            DropForeignKey("dbo.Comments", "UserFrom_Id", "dbo.Users");
            DropIndex("dbo.Comments", new[] { "UserTo_Id" });
            DropIndex("dbo.Comments", new[] { "UserFrom_Id" });
            AlterColumn("dbo.Comments", "Rate", c => c.String());
            DropColumn("dbo.Comments", "UserTo_Id");
            DropColumn("dbo.Comments", "UserFrom_Id");
        }
    }
}
