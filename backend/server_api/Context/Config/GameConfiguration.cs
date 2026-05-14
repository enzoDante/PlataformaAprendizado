using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.ToTable("game");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Tittle);

            builder.HasMany(x => x.UsersGames)
                .WithOne(x => x.Game)
                .HasForeignKey(x => x.GameId);

            builder.HasMany(x => x.Sections)
                .WithOne(x => x.Game)
                .HasForeignKey(x => x.GameId);
        }
    }
}
