using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server_api.Commons;
using server_api.Context;
using server_api.Mappings;
using server_api.Services.Authentication;
using server_api.Services.GameService;
using server_api.Services.UserService;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuration POSTGRES
builder.Services.AddDbContext<ContextDB>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add services to the container.
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserJWTGet>();
builder.Services.AddScoped<ProfileService>();
builder.Services.AddScoped<GameAdminService>();
builder.Services.AddScoped<GameUserService>();

// Add mappers to container
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(cfg =>
{
    //cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
    cfg.AddProfile<UserProfile>();
});

// CONFIGURAÇÃO DO JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new ArgumentNullException("SecretKey não configurado");
var issuer = jwtSettings["Issuer"] ?? throw new ArgumentNullException("Issuer não configurado");
var audience = jwtSettings["Audience"] ?? throw new ArgumentNullException("Audience não configurado");
// Converte a chave secreta para bytes
var key = Encoding.UTF8.GetBytes(secretKey);
// Configura a autenticação JWT
builder.Services.AddAuthentication(options =>
{
    //Define JWT Bearer como esquema padrão de autenticação
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        //Configurações do JWT Bearer
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true, // valida chave de assinatura
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true, // valida o emissor (quem criou o token)
            ValidIssuer = issuer,
            ValidateAudience = true, //valida a audiência (para quem o token é destinado)
            ValidAudience = audience,
            ValidateLifetime = true, //valida o tempo de vida do token
            ClockSkew = TimeSpan.Zero, // remove a tolerância de tempo padrão (5 minutos)
            RequireExpirationTime = true //Define onde buscar o token no header da requisição
        };

        //Configurações para desenvolvimento/debug
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context => // isso aqui era para o [Authorize] ler o jwt do cookie
            {
                if (context.Request.Cookies.TryGetValue("jwt", out string? jwtToken))
                {
                    context.Token = jwtToken;
                }
                return Task.CompletedTask;
            },
            OnAuthenticationFailed = context =>
            {
                //Log de falha na autenticação (útil para debug)
                Console.WriteLine($"Falha na autenticação: {context.Exception.Message}");
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                //Log de token validado com sucesso (útil para debug)
                Console.WriteLine("Token validado com sucesso");
                return Task.CompletedTask;
            }
        };
    });
// CONFIGURAÇÃO DA AUTORIZAÇÃO
// Adiciona políticas de autorização
builder.Services.AddAuthorization(options =>
{
    // política para admin
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));

    // política para usuários autenticados
    options.AddPolicy("AuthenticatedUser", policy => policy.RequireAuthenticatedUser());
});

builder.Services.AddControllers();
// get user ip
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Plataforma de Aprendizado",
            Version = "v1",
            Description = "Api para uso interno do projeto de aprendizado"
        });
        // Authorize Button (validate and user Controller with JWT token)
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Insert your JWT token"
        });
        // global security requeriments
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    }
);
// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials(); // cookies
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// se usar proxy reverso
//app.UseForwardedHeaders();
//builder.Services.Configure<ForwardedHeadersOptions>(option =>
//{
//    option.ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor | Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto;
//});

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
