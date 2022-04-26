namespace webAPI.Entities
{
   public record Team{

    public Guid Id { get; init;}
    public Guid ManagerId {get; init;}
}
}