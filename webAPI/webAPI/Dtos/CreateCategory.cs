using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
    public record CreateCategoryDto
    {
        [Required]
       public string CategoryName { get; init;} = default!;
    }
}