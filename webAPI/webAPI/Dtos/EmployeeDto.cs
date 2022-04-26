namespace webAPI.Dtos
{
   public record EmployeeDto{

    public Guid Id { get; init;}
    public string FirstName { get; init;} = default!;
    public string LastName {get; init;} = default!;
    public decimal Salary {get; init;}
    public bool IsCEO {get; init;}
    public bool IsManager {get; init;}
    public Guid TeamId {get; init;}
   
}

}