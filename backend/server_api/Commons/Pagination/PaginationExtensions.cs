using Microsoft.EntityFrameworkCore;

namespace server_api.Commons.Pagination
{
    public static class PaginationExtensions
    {
        public static async Task<PageResponse<T>> ToPagedListAsync<T>(this IQueryable<T> source, PageRequest request)
        {
            if(request.PageNumber < 1) request.PageNumber = 1;
            if(request.PageSize < 10) request.PageSize = 10;
            var count = await source.CountAsync();

            int lastPage = request.PageNumber - 1;
            int initialSize = request.InitialSize.GetValueOrDefault();
            if (initialSize == 0) initialSize = request.PageSize;

            var items = await source
                .Skip(lastPage == 0 ? 0 : ((lastPage - 1) * request.PageSize + initialSize))
                .Take(request.PageSize)
                .ToListAsync();
            var totalPages = (int)Math.Ceiling((count - (initialSize == request.PageSize ? 0 : initialSize)) / (double)request.PageSize);
            var metadata = new PageMetadata(request.PageNumber, request.PageSize, totalPages, count);
            return new PageResponse<T>(items, metadata);
        }
    }
}
