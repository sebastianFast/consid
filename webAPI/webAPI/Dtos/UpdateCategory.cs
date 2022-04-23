using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
       public record UpdateCategoryDto
    {
      [Required]
      public string CategoryName { get; init;} = default!;
    }
}