using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Candy.DAL.Models;

namespace Candy.API.Models.DTO;
public class User {
  public int Id { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Email { get; set; }
  public UserRole Role { get; set; }
};