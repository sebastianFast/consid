using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
   public record CreateTeamDto
   {

    [Required]
    public Guid Id { get; init;}
    [Required]
    public Guid ManagerId {get; init;}

}
}