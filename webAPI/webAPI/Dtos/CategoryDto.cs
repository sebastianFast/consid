namespace webAPI.Dtos
{
   public record CategoryDto{

    public Guid Id { get; init;}
    
    public string CategoryName { get; init;} = default!;

}
}