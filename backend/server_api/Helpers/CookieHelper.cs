namespace server_api.Helpers
{
    public static class CookieHelper
    {
        private static bool IsProduction => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";

        public static void SetJwtCookie(IResponseCookies cookie, string jwtToken)
        {
            cookie.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = IsProduction,
                SameSite = SameSiteMode.Lax,
                MaxAge = TimeSpan.FromMinutes(5),
                Path = "/"
            });
        }

        public static void SetRefreshTokenCookie(IResponseCookies cookie, string refreshToken)
        {
            cookie.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = IsProduction,
                SameSite = SameSiteMode.Lax,
                MaxAge = TimeSpan.FromMinutes(7),
                Path = "/"
            });
        }

        public static void ClearAuthCookies(IResponseCookies cookie)
        {
            cookie.Delete("jwt");
            cookie.Delete("refreshToken");
        }
    }
}
