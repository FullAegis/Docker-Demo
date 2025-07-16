using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using Candy.Tools;
using Candy.BLL.Interfaces;
using Candy.BLL.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;

#region Dal Imports
using Candy.DAL;
using Candy.DAL.Interfaces;
using Candy.DAL.Interfaces.Orders;
using Candy.DAL.Repositories;
using Candy.DAL.Repositories.Orders;
using Candy.DAL.Repositories.Products;
#endregion

using Oapi = Microsoft.OpenApi.Models;
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add services to the container.
services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(static c => {
  // General Information for Swagger API
  c.SwaggerDoc("v1", new Oapi::OpenApiInfo { Title = "Candy Shop", Version = "v1.2.0" });

  var securitySchemeName = "BearerSecDef";
  // Security Scheme of type bearer for Swagger API
  c.AddSecurityDefinition(securitySchemeName, new Oapi::OpenApiSecurityScheme
  { Description = "Token bearer uses scheme (Bearer {token})"
  , In = Oapi::ParameterLocation.Header    // Bearer is stored in the HTTP Header
  , Name = "Authorization"                 // Name of HTTP Header
  , Type = Oapi::SecuritySchemeType.ApiKey // API Key Type (Bearer)
  , Scheme = "Bearer"                      // Scheme Name
  });

  // Security Requirements for Routes marked with [Authorize]
  c.AddSecurityRequirement(new Oapi::OpenApiSecurityRequirement {
    { new Oapi::OpenApiSecurityScheme
      { Reference = new Oapi::OpenApiReference 
        { Type = Oapi::ReferenceType.SecurityScheme
        , Id = securitySchemeName // References the OpenApiSecurityScheme we defined above
        }
      , Scheme = "oauth2" // Nécéssaire pour swagger (interface)
      , In = Oapi::ParameterLocation.Header
      , Name = "Bearer"
      }
    ,  new List<string>() // IList<string> 
    }
  });
});

#region BLL.Services
services.AddScoped<IUserService, UserService>();
#endregion
#region DAL.Repositories.Users
services.AddScoped<IUserRepository, UserRepository>();
#endregion
#region DAL.Repositories.Products
services.AddScoped<ICategoryRepository, CategoryRepository>();
services.AddScoped<IBrandRepository, BrandRepository>();
services.AddScoped<ICandyRepository, CandyRepository>();
#endregion
#region DAL.Repositories.Orders
services.AddScoped<IOrderRepository, OrderRepository>();
services.AddScoped<IOrderItemRepository, OrderItemRepository>();
#endregion

var config = builder.Configuration;
services.AddDbContext<CandyDbContext>(options =>
  options.UseSqlServer(config.GetConnectionString("default"))
);

services.AddSingleton<TokenManager>();
// Configuration for JWT Auth
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options => {
    var keyRaw = config["jwt:key"];
    ArgumentNullException.ThrowIfNull(keyRaw);
    
    var key = Encoding.UTF8.GetBytes(keyRaw);
    var issuer = config["jwt:issuer"];
    var audience = config["jwt:audience"];
    
    options.TokenValidationParameters = new TokenValidationParameters
    { ValidateIssuer = true 
    , ValidateAudience = true
    , ValidateLifetime = true
    , ValidIssuer = issuer
    , ValidAudience = audience
    , IssuerSigningKey = new SymmetricSecurityKey(key)
    };
  });

services.AddCors(options
  => options.AddPolicy("AllowSpecificOrigin", builder
    => builder.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
  )
);

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
