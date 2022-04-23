namespace webAPI.Entities
{
   public record Employee{

    public Guid Id { get; init;}
    public string FirstName { get; init;} = default!;
    public string LastName {get; init;} = default!;
    public decimal Salary {get; init;}
    public bool IsCEO {get; init;}
    public bool IsManager {get; init;}
    public int ManagerId {get; init;}
    
    public string Email {get; init;} = default!;
   
    public string Password {get; init;} = default!;
}
}