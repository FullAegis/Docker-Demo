using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Candy.Tools {
  public class TokenManager {
    private readonly IConfiguration _config;
    private readonly string _secret;
    private readonly string _issuer;
    private readonly string _audience;

    public TokenManager(IConfiguration config) {
      _config = config;
      _secret = _config["jwt:key"];
      _issuer = _config["jwt:issuer"];
      _audience = _config["jwt:audience"];
    }
    
    public string GenerateJwt(dynamic user, ulong expirationDate = 1ul) {
      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

      
      var expTime = DateTime.Now.AddHours(expirationDate);
      var myclaims = new Claim[]
      { new(ClaimTypes.Sid, user.Id.ToString())
      , new(ClaimTypes.Email, user.Email as string ?? "INVALID_EMAIL")
      , new(ClaimTypes.Expiration, expTime.ToString(), ClaimValueTypes.DateTime)
      , new(ClaimTypes.Role, user.Role.ToString() ?? "Customer")
      };

      var token = new JwtSecurityToken( claims:             myclaims
                                      , expires:            expTime
                                      , signingCredentials: credentials
                                      , audience:           _audience
                                      , issuer:             _issuer
                                      );
      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  };
}
