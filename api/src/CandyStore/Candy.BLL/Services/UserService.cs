using System.ComponentModel.DataAnnotations;
using System.Runtime;
using BCrypt.Net;

using Candy.BLL.Mappers;    // Bll::User::ToDal()
using Candy.BLL.Interfaces; // IUserService
using Candy.DAL.Interfaces; // IUserRepository
using Bll = Candy.BLL.Models;

namespace Candy.BLL.Services;
using BCrypt = BCrypt.Net.BCrypt;

public class UserService(IUserRepository users) : IUserService {
  private readonly IUserRepository _users = users;
  
  public Bll::User Login([EmailAddress] in string email, in string password) {
    try {
      var hash = _users.GetPassword(email);
      
      if (BCrypt.Verify(password, hash) is false) {
        throw new ArgumentException("Invalid password for this user.");
      }
      
      return _users.Get(email).ToBll();
    } catch (ArgumentNullException e) {
      throw new ArgumentException("Email address is incorrect.", nameof(email), e);
    }
  }

  public IEnumerable<Bll::Orders.Order> Orders(int userId) {
    var user = _users.Get(userId);
    ArgumentNullException.ThrowIfNull(user);
    return user.Orders.ToBll();
  }

  public Bll::User Get(int id) => _users.Get(id).ToBll();
  public void Register(in Bll::User user) {
    var dalUser = user.ToDal();
    dalUser.Password = BCrypt.HashPassword(user.Password);
    _users.Register(dalUser);
  }
  public void Update(int id, in Bll::User user) => _users.Update(id, user.ToDal());
  public void Delete(int userId) => _users.Delete(userId);
  public void Delete(in Bll::User user) => _users.Delete(user.Id);
};
