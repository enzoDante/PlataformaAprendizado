namespace server_api.Commons.Pagination
{
    public class PageRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int? InitialSize { get; set; }
    }
}
