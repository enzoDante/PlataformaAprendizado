using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class UserConfiguration : IEntityTypeConfiguration<Users>
    {
        public void Configure(EntityTypeBuilder<Users> builder)
        {
            builder.ToTable("users");
            builder.HasKey(u => u.Id);

            builder.HasIndex(x => x.PublicId);

            builder.Property(u => u.PublicId).HasDefaultValueSql("gen_random_uuid()").ValueGeneratedOnAdd();

            builder.HasMany(x => x.RefreshTokens)
                .WithOne(x => x.Users)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.UserGameStats)
                .WithOne(x => x.Users)
                .HasForeignKey<UserGameStats>(x => x.UserId);
            
            builder.HasMany(x => x.UserAchievements)
                .WithOne(x => x.Users)
                .HasForeignKey(x => x.UserId);

            builder.HasMany(x => x.UsersGames)
                .WithOne(x => x.Users)
                .HasForeignKey(x => x.UserId);

            builder.HasMany(x => x.UsersLessons)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);
        }
    }
}
