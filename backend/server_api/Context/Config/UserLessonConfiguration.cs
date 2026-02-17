using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server_api.Models;

namespace server_api.Context.Config
{
    public class UserLessonConfiguration : IEntityTypeConfiguration<UserLesson>
    {
        public void Configure(EntityTypeBuilder<UserLesson> builder)
        {
            builder.ToTable("user_lesson");
            builder.HasKey(t => t.Id);
        }
    }
}
