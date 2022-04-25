using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
    public record CreateEmployeeDto
    {
   [Required]
    public string FirstName { get; init;} = default!;
    [Required]
    public string LastName {get; init;} = default!;
    [Required]
    public decimal Salary {get; init;}
    public bool IsCEO {get; init;}
    public bool IsManager {get; init;}
    public int ManagerId {get; set;}
    
    public int Team {get; set;}
    }
}