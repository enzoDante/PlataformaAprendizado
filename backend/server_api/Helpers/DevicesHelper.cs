namespace server_api.Helpers
{
    public static class DevicesHelper
    {
        private static readonly string[] MobileKeyWords =
        {
            "Mobile", "Android", "iPhone", "iPad", "Windows Phone", "BlackBerry"
        };
        public static string UserDevice(HttpRequest request)
        {
            var userAgent = request.Headers["User-Agent"].ToString();
            if (string.IsNullOrEmpty(userAgent)) return "Desconhecido";
            return MobileKeyWords.Any(k => userAgent.Contains(k, StringComparison.OrdinalIgnoreCase))
                ? "Mobile" : "Desktop";
        }
    }
}
