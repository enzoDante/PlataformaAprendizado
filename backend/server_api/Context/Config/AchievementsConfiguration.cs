using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class AchievementsConfiguration : IEntityTypeConfiguration<Achievements>
    {
        public void Configure(EntityTypeBuilder<Achievements> builder)
        {
            builder.ToTable("achievements");
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.UserAchievements)
                .WithOne(x => x.Achievements)
                .HasForeignKey(x => x.AchievementId);
        }
    }
}
