using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class UserAchievementsConfiguration : IEntityTypeConfiguration<UserAchievements>
    {
        public void Configure(EntityTypeBuilder<UserAchievements> builder)
        {
            builder.ToTable("user_achievements");
            builder.HasKey(x => x.Id);
        }
    }
}
