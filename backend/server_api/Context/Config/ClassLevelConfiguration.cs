using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class ClassLevelConfiguration : IEntityTypeConfiguration<ClassLevel>
    {
        public void Configure(EntityTypeBuilder<ClassLevel> builder)
        {
            builder.ToTable("class_level");
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.UserLessons)
                .WithOne(x => x.ClassLevel)
                .HasForeignKey(x => x.ClassId);
        }
    }
}
