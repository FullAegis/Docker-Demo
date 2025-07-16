using Bll = Candy.BLL.Models;
using Dal = Candy.DAL.Models;

namespace Candy.BLL.Mappers {
public static class UserMapper {
  public static Bll::User ToBll(this Dal::User user) => new Bll::User
  { Id =  user.Id
  , FirstName = user.FirstName
  , LastName = user.LastName
  , Email = user.Email
  , Password = user.Password
  , Role = user.Role
  };
  
  public static Dal::User ToDal(this Bll::User user) => new Dal::User
  { Id =  user.Id
  , FirstName = user.FirstName
  , LastName = user.LastName
  , Email = user.Email
  , Password = user.Password
  , Role = user.Role
  };
};
}
