using Microsoft.EntityFrameworkCore;
using server_api.Models;
using System.Text.RegularExpressions;

namespace server_api.Context
{
    public class ContextDB : DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<UserGameStats> UserGameStats { get; set; }
        public DbSet<Achievements> Achievements { get; set; }
        public DbSet<UserAchievements> UserAchievements { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<UsersGames> UsersGames { get; set; }
        public DbSet<Sections> Sections { get; set; }
        public DbSet<ClassLevel> ClassLevels { get; set; }
        public DbSet<UserLesson> UsersLessons { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ContextDB).Assembly);
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                //entity.SetTableName(entity.GetTableName()?.ToLower());
                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(ToSnakeCase(property.GetColumnName()));
                }
            }
        }
        private static string ToSnakeCase(string name)
        {
            return Regex.Replace(name, "([a-z])([A-Z])", "$1_$2").ToLower();
        }
    }
}
