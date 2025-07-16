namespace Candy.DAL.Models;

[Flags]
public enum UserRole { Customer = 0x00, Admin = 0xFF, Invalid };
