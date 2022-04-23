using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
       public record UpdateEmployeeDto
    {
    [Required]
    public string FirstName { get; init;} = default!;
    [Required]
    public string LastName {get; init;} = default!;
    [Required]
    public decimal Salary {get; init;}
    public bool IsCEO {get; init;}
    public bool IsManager {get; init;}
    public int ManagerId {get; init;}
     
    public string Email {get; init;} = default!;
    
    public string Password {get; init;} = default!;
    }
}