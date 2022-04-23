using System.ComponentModel.DataAnnotations;

namespace webAPI.Dtos
{
    public record CreateItemDto
    {
    public int CategoryId { get; set;}
    [Required]
    public string Title {get; init;} = default!;
    [Required]
    public string Author {get; init;} =default!;
    [Required]
    public int Pages {get; init;}
    public int RunTimeMinutes {get; init;}
    public bool IsBorrowable {get; set;}
    public string Borrower {get; init;} =default!;
    [Required]
    public string Type {get; init;} = default!;
    }
}