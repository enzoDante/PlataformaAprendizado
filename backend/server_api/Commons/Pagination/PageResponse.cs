namespace server_api.Commons.Pagination
{
    public class PageResponse<T>
    {
        public IEnumerable<T> Items { get; set; }
        public PageMetadata Metadata { get; set; }
        public PageResponse(IEnumerable<T> items, PageMetadata metadata)
        {
            Items = items;
            Metadata = metadata;
        }
    }
    public class PageMetadata
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
        public PageMetadata(int currentPage, int pageSize, int totalPages, int totalCount)
        {
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
            TotalCount = totalCount;
        }
    }
}
