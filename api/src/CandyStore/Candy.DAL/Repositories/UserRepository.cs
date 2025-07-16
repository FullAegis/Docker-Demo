using Candy.DAL.Models;
using Candy.DAL.Interfaces;

namespace Candy.DAL.Repositories;
public class UserRepository(CandyDbContext context) : IUserRepository {
  private readonly CandyDbContext _context = context;
  
  public void Register(in User user) {
    _context.Users.Add(user);
    _context.SaveChanges();
  } 

  public User Get(string email) {
    var user = _context.Users.FirstOrDefault(u => u.Email == email);
    ArgumentNullException.ThrowIfNull(user);
    return user;
  }

  public User Get(int id) {
    var user = _context.Users.FirstOrDefault(u => u.Id == id);
    ArgumentNullException.ThrowIfNull(user);
    return user;
  }
  
  public void Update(int id, in User user) {
    var u = Get(id: id);
    
    u.FirstName = user.FirstName;
    u.LastName = user.LastName;
    u.Email = user.Email;
    u.Password = user.Password;
    
    _context.SaveChanges();
  }

  public void Delete(in User user) {
    _context.Users.Remove(user);
    _context.SaveChanges();
  }

  public void Delete(int id) => Delete(Get(id: id));

  public string GetPassword(string email) {
    var user =  _context.Users.FirstOrDefault(u => u.Email == email);
    ArgumentNullException.ThrowIfNull(user);
    return user.Password;
  }
};
