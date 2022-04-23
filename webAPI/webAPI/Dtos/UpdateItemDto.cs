using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
       public record UpdateItemDto
    {
    public int CategoryId { get; init;}
    [Required]
    public string Title {get; init;} = default!;
    [Required]
    public string Author {get; init;} =default!;
    [Required]
    public int Pages {get; init;}
    public int RunTimeMinutes {get; init;}
    public bool IsBorrowable {get; init;}
    public string Borrower {get; init;} =default!;
    [Required]
    public string Type {get; init;} = default!;
    }
}