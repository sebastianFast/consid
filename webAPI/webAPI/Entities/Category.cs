namespace webAPI.Entities
{
   public record Category{

    public Guid Id { get; init;}
    
    public string CategoryName { get; init;} = default!;

}
}