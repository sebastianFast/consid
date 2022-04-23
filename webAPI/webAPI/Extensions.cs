using webAPI.Dtos;
using webAPI.Entities;

namespace webAPI
{
    public static class Extensions{
        public static ItemDto AsDto(this Item item){
            return new ItemDto{
               Id = item.Id,
               CategoryId = item.CategoryId,
               Title = item.Title,
               Author = item.Author,
               Pages = item.Pages,
               RunTimeMinutes = item.RunTimeMinutes,
               IsBorrowable = item.IsBorrowable,
               Borrower = item.Borrower,
               BorrowDate = item.BorrowDate,
               Type = item.Type
           };
        }
        public static EmployeeDto AsDto(this Employee employee){
        return new EmployeeDto{
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Salary = employee.Salary,
            IsCEO = employee.IsCEO,
            IsManager = employee.IsManager,
            ManagerId = employee.ManagerId
        };
    }

        public static CategoryDto AsDto(this Category category){
        return new CategoryDto{
            CategoryName = category.CategoryName,
            Id = category.Id
        };
    }
    }
}