using Microsoft.EntityFrameworkCore.Migrations;

namespace GoUpLadder.API.Migrations
{
    public partial class AddUserMeasureDesc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserMeasure",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserMeasure");
        }
    }
}
