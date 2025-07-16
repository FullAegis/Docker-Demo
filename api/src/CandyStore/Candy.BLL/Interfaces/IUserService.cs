using System.ComponentModel.DataAnnotations;

namespace Candy.BLL.Interfaces {
using Bll = Candy.BLL.Models;

public interface IUserService {
  Bll::User Login([EmailAddress] in string email, in string password);
  void Register(in Bll::User user);
  IEnumerable<Bll::Orders.Order> Orders(int userId);
  void Update(int id, in Bll::User user);
  void Delete(int id);
  void Delete(in Bll::User user);
};
}
