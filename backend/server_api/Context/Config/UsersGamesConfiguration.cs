using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class UsersGamesConfiguration : IEntityTypeConfiguration<UsersGames>
    {
        public void Configure(EntityTypeBuilder<UsersGames> builder)
        {
            builder.ToTable("users_games");
            builder.HasKey(x => x.Id);
            
        }
    }
}
