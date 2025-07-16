using System.ComponentModel.DataAnnotations;
using Dal = Candy.DAL.Models;
 
namespace Candy.DAL.Interfaces {

public interface IUserRepository {
  void Register(in Dal::User user);
  Dal::User Get(int id);
  Dal::User Get([EmailAddress] string email);
  void Update(int id, in Dal::User user);
  void Delete(in Dal::User user);
  void Delete(int id);
  string GetPassword([EmailAddress] string email);
};
}

