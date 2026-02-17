using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class SectionsConfiguration : IEntityTypeConfiguration<Sections>
    {
        public void Configure(EntityTypeBuilder<Sections> builder)
        {
            builder.ToTable("sections");
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.SectionTittle);

            builder.HasMany(x => x.ClassLevels)
                .WithOne(x => x.Sections)
                .HasForeignKey(x => x.SectionId);
        }
    }
}
