using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
       public record UpdateEmployeeDto
    {
    public string FirstName { get; init;} = default!;

    public string LastName {get; init;} = default!;
    public decimal Salary {get; init;}
    public bool IsCEO {get; init;}
    public bool IsManager {get; init;}
    public int ManagerId {get; init;}
     
      public int Team {get; init;}
    }
}