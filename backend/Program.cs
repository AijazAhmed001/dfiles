using System.Net;
using System.Net.Sockets;
using System.Text;
using EFU.Inventory.Authorization;
using EFU.Inventory.Data;
using EFU.Inventory.Features.Notifications;
using EFU.Inventory.Middleware;
using EFU.Inventory.Models;
using EFU.Inventory.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// SERVER / PORT CONFIGURATION
// ============================================================

var port = Environment.GetEnvironmentVariable("PORT");

if (!string.IsNullOrWhiteSpace(port))
{
    if (!int.TryParse(port, out var renderPort) ||
        renderPort is < 1 or > 65535)
    {
        throw new InvalidOperationException(
            "PORT must be a valid TCP port number.");
    }

    builder.WebHost.UseUrls($"http://0.0.0.0:{renderPort}");
}

// ============================================================
// ORACLE DATABASE
// ============================================================

var connectionString =
    builder.Configuration.GetConnectionString("OracleConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "OracleConnection is missing from configuration.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseOracle(
        connectionString,
        oracleOptions =>
        {
            oracleOptions.CommandTimeout(60);
        });

    // Helpful during development.
    if (builder.Environment.IsDevelopment())
    {
        options.EnableDetailedErrors();
        options.EnableSensitiveDataLogging(false);
    }
});

// ============================================================
// APPLICATION SERVICES
// ============================================================

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<AssetService>();
builder.Services.AddScoped<AuditService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<BusinessRuleService>();

builder.Services.AddScoped<
    EFU.Inventory.Features.PurchaseOrders.PurchaseOrderService>();

// Oracle Purchase Order Gateway
builder.Services.AddSingleton<
    IOraclePurchaseOrderGateway,
    DisabledOraclePurchaseOrderGateway>();

// Email
builder.Services.AddScoped<IEmailService, SmtpEmailService>();

// Asset expiry reminders
builder.Services.Configure<AssetExpiryReminderOptions>(
    builder.Configuration.GetSection("AssetExpiryReminders"));

builder.Services.AddScoped<AssetExpiryReminderSettingsStore>();

builder.Services.AddScoped<
    IAssetExpiryReminderService,
    AssetExpiryReminderService>();

builder.Services.AddHostedService<AssetExpiryReminderJob>();

// ============================================================
// HTTP CONTEXT
// ============================================================

builder.Services.AddHttpContextAccessor();

// ============================================================
// CONTROLLERS
// ============================================================

builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(entry => entry.Value?.Errors.Count > 0)
                .ToDictionary(
                    entry => entry.Key,
                    entry => entry.Value!
                        .Errors
                        .Select(error =>
                            string.IsNullOrWhiteSpace(error.ErrorMessage)
                                ? "The supplied value is invalid."
                                : error.ErrorMessage)
                        .ToArray());

            return new BadRequestObjectResult(new
            {
                success = false,
                message = "Validation failed.",
                errors
            });
        };
    });

builder.Services.AddEndpointsApiExplorer();

// ============================================================
// SWAGGER
// ============================================================

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "EFU IT Hardware Inventory API",
        Version = "v1",
        Description = "EFU IT Hardware Inventory Management API"
    });

    options.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description =
                "Enter your JWT access token. Example: Bearer {token}"
        });

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [
                new OpenApiSecuritySchemeReference(
                    "Bearer",
                    document)
            ] = []
        });
});

// ============================================================
// JWT CONFIGURATION
// ============================================================

var jwtSecret = builder.Configuration["Jwt:Secret"];

if (string.IsNullOrWhiteSpace(jwtSecret) ||
    Encoding.UTF8.GetByteCount(jwtSecret) < 32)
{
    throw new InvalidOperationException(
        "Jwt:Secret must be configured with at least 32 bytes.");
}

var jwtIssuer = builder.Configuration["Jwt:Issuer"];

if (string.IsNullOrWhiteSpace(jwtIssuer))
{
    throw new InvalidOperationException(
        "Jwt:Issuer must be configured.");
}

var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException(
        "Jwt:Audience must be configured.");
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtSecret)),

                ClockSkew = TimeSpan.FromSeconds(30)
            };
    });

// ============================================================
// AUTHORIZATION
// ============================================================

builder.Services.AddAuthorization();

builder.Services.AddScoped<
    IAuthorizationHandler,
    PermissionAuthorizationHandler>();

builder.Services.AddSingleton<
    IAuthorizationPolicyProvider,
    PermissionPolicyProvider>();

// ============================================================
// FORWARDED HEADERS
// ============================================================

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto;

    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

// ============================================================
// CORS
// ============================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        var allowedOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Development may use the local Vite dev server. Production origins
        // must be explicitly supplied through configuration/deployment secrets.
        if (builder.Environment.IsDevelopment())
        {
            allowedOrigins.UnionWith([
                "http://localhost:5173",
                "http://localhost:5175"
            ]);
        }

        var configuredOrigins =
            builder.Configuration
                .GetSection("AllowedOrigins")
                .Get<string[]>();

        if (configuredOrigins is not null)
        {
            foreach (var configuredOrigin in configuredOrigins)
            {
                if (Uri.TryCreate(
                        configuredOrigin,
                        UriKind.Absolute,
                        out var originUri) &&
                    (originUri.Scheme == Uri.UriSchemeHttp ||
                     originUri.Scheme == Uri.UriSchemeHttps))
                {
                    allowedOrigins.Add(
                        configuredOrigin.TrimEnd('/'));
                }
            }
        }

        var frontendUrl =
            builder.Configuration["FrontendUrl"];

        if (Uri.TryCreate(
                frontendUrl,
                UriKind.Absolute,
                out var frontendUri) &&
            (frontendUri.Scheme == Uri.UriSchemeHttp ||
             frontendUri.Scheme == Uri.UriSchemeHttps))
        {
            allowedOrigins.Add(
                frontendUrl!.TrimEnd('/'));
        }

        policy
            .WithOrigins([.. allowedOrigins])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// ============================================================
// RATE LIMITING
// ============================================================

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode =
        StatusCodes.Status429TooManyRequests;

    // General API
    options.AddFixedWindowLimiter(
        "api",
        limiter =>
        {
            limiter.PermitLimit = 200;
            limiter.Window = TimeSpan.FromMinutes(1);
            limiter.QueueLimit = 0;
            limiter.AutoReplenishment = true;
        });

    // Login
    options.AddFixedWindowLimiter(
        "auth-login",
        limiter =>
        {
            limiter.PermitLimit = 5;
            limiter.Window = TimeSpan.FromMinutes(1);
            limiter.QueueLimit = 0;
            limiter.AutoReplenishment = true;
        });

    // Refresh token
    options.AddFixedWindowLimiter(
        "auth-refresh",
        limiter =>
        {
            limiter.PermitLimit = 15;
            limiter.Window = TimeSpan.FromMinutes(1);
            limiter.QueueLimit = 0;
            limiter.AutoReplenishment = true;
        });

    // Account recovery
    options.AddFixedWindowLimiter(
        "auth-recovery",
        limiter =>
        {
            limiter.PermitLimit = 3;
            limiter.Window = TimeSpan.FromMinutes(15);
            limiter.QueueLimit = 0;
            limiter.AutoReplenishment = true;
        });

    // Email actions
    options.AddFixedWindowLimiter(
        "email-actions",
        limiter =>
        {
            limiter.PermitLimit = 5;
            limiter.Window = TimeSpan.FromMinutes(5);
            limiter.QueueLimit = 0;
            limiter.AutoReplenishment = true;
        });
});

// ============================================================
// BUILD APPLICATION
// ============================================================

var app = builder.Build();

// ============================================================
// FORWARDED HEADERS
// ============================================================

app.UseForwardedHeaders();

// ============================================================
// GLOBAL EXCEPTION HANDLING
// ============================================================

app.UseMiddleware<ExceptionMiddleware>();

// ============================================================
// SWAGGER / HTTPS
// ============================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Render terminates TLS at the proxy.
    if (string.IsNullOrWhiteSpace(port))
    {
        app.UseHttpsRedirection();
    }

    app.UseHsts();
}

// ============================================================
// SECURITY HEADERS
// ============================================================

app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] =
        "nosniff";

    context.Response.Headers["Referrer-Policy"] =
        "no-referrer";

    context.Response.Headers["X-Frame-Options"] =
        "DENY";

    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'none'; " +
        "frame-ancestors 'none'; " +
        "base-uri 'none'";

    context.Response.Headers["X-Correlation-ID"] =
        context.TraceIdentifier;

    await next();
});

// ============================================================
// MIDDLEWARE PIPELINE
// ============================================================

app.UseCors("Frontend");

app.UseRateLimiter();

app.UseAuthentication();

app.UseAuthorization();

// ============================================================
// HEALTH CHECK - API
// ============================================================

app.MapGet(
        "/api/health",
        () => Results.Ok(new
        {
            success = true,
            data = new
            {
                status = "online",
                timestamp = DateTimeOffset.UtcNow
            }
        }))
    .AllowAnonymous()
    .RequireRateLimiting("api");

// ============================================================
// HEALTH CHECK - SERVER
// ============================================================

app.MapGet(
        "/health",
        () => Results.Ok(new
        {
            status = "healthy",
            timestamp = DateTimeOffset.UtcNow
        }))
    .AllowAnonymous()
    .RequireRateLimiting("api");

// ============================================================
// DATABASE HEALTH CHECK
// ============================================================

app.MapGet(
        "/api/health/database",
        async (AppDbContext db) =>
        {
            try
            {
                var connected =
                    await db.Database.CanConnectAsync();

                return Results.Ok(new
                {
                    success = connected,
                    database = "Oracle",
                    status = connected
                        ? "connected"
                        : "disconnected",
                    timestamp = DateTimeOffset.UtcNow
                });
            }
            catch (Exception)
            {
                return Results.Json(
                    new
                    {
                        success = false,
                        database = "Oracle",
                        status = "error",
                        message = "Database connection failed.",
                        timestamp = DateTimeOffset.UtcNow
                    },
                    statusCode:
                        StatusCodes.Status503ServiceUnavailable);
            }
        })
    .AllowAnonymous()
    .RequireRateLimiting("api");

// ============================================================
// CONTROLLERS
// ============================================================

app.MapControllers()
    .RequireRateLimiting("api");

// ============================================================
// DEVELOPMENT TEST: WARRANTY
// ============================================================

if (app.Environment.IsDevelopment() &&
    args.Contains(
        "--bootstrap-admin",
        StringComparer.OrdinalIgnoreCase))
{
    await using var scope = app.Services.CreateAsyncScope();

    await DbInitializer.InitializeAsync(scope.ServiceProvider);

    Console.WriteLine(
        "Bootstrap administrator and required application records are ready.");

    return;
}

if (app.Environment.IsDevelopment() &&
    args.Contains(
        "--seed-warranty-test",
        StringComparer.OrdinalIgnoreCase))
{
    await using var scope =
        app.Services.CreateAsyncScope();

    var db =
        scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

    var asset =
        await db.Assets
            .Where(item =>
                item.Status != AssetStatuses.Retired &&
                item.AssetType != null &&
                item.AssetType.Status ==
                    RecordStatuses.Active)
            .OrderByDescending(item =>
                item.CreatedAt)
            .FirstOrDefaultAsync();

    if (asset is null)
    {
        throw new InvalidOperationException(
            "No active asset is available for the warranty chart test.");
    }

    asset.WarrantyExpiryDate =
        DateTime.UtcNow.Date.AddDays(35);

    asset.UpdatedAt =
        DateTime.UtcNow;

    await db.SaveChangesAsync();

    Console.WriteLine(
        "Warranty chart test asset: {0} | {1} | expires {2:yyyy-MM-dd}",
        asset.AssetCode,
        asset.Model,
        asset.WarrantyExpiryDate);

    return;
}

// ============================================================
// DEVELOPMENT TEST: VOLUME
// ============================================================

if (app.Environment.IsDevelopment() &&
    args.Contains(
        "--seed-volume-test",
        StringComparer.OrdinalIgnoreCase))
{
    await using var scope =
        app.Services.CreateAsyncScope();

    var db =
        scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

    await VolumeTestSeeder.SeedAsync(db);

    Console.WriteLine(
        "Development volume dataset is ready.");

    return;
}

// ============================================================
// DEVELOPMENT SERVER INFORMATION
// ============================================================

if (app.Environment.IsDevelopment())
{
    Console.WriteLine();
    Console.WriteLine("==============================================");
    Console.WriteLine(" EFU IT HARDWARE INVENTORY API");
    Console.WriteLine("==============================================");
    Console.WriteLine(" Database: Oracle");
    Console.WriteLine(" Local:    http://localhost:5002");

    try
    {
        foreach (var address in
                 Dns.GetHostEntry(
                         Dns.GetHostName())
                    .AddressList
                    .Where(address =>
                        address.AddressFamily ==
                        AddressFamily.InterNetwork &&
                        !IPAddress.IsLoopback(address))
                    .Distinct())
        {
            Console.WriteLine(
                " Network:  http://{0}:5002",
                address);
        }
    }
    catch (SocketException)
    {
        Console.WriteLine(
            " Network:  http://<this-PC-IP>:5002");
    }

    Console.WriteLine(
        " Oracle:   struzzo.efuinsurance.com:1521");

    Console.WriteLine(
        " Service:  apx_dev.efuinsurance.com");

    Console.WriteLine(
        "==============================================");
}

// ============================================================
// START APPLICATION
// ============================================================

app.Run();
