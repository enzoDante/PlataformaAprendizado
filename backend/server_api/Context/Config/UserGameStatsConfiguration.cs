using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class UserGameStatsConfiguration : IEntityTypeConfiguration<UserGameStats>
    {
        public void Configure(EntityTypeBuilder<UserGameStats> builder) 
        { 
            builder.ToTable("user_game_stats");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.UserId);

        }

    }
}
