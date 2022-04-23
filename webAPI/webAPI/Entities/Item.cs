using webAPI.Dtos;

namespace webAPI.Entities
{


public record Item
{

    public Guid Id { get; init;}
    public int CategoryId { get; set;}
    public string Title {get; init;} = default!;
    public string Author {get; init;} =default!;
    public int Pages {get; init;}
    public int RunTimeMinutes {get; init;}
    public bool IsBorrowable {get; set;}
    public string Borrower {get; init;} =default!;
    public DateTimeOffset BorrowDate {get; init;}
    public string Type {get; init;} = default!;

}
}