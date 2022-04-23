/*using System.Collections.Generic;
using System.Linq;
using System;
using webAPI.Entities;


namespace webAPI.Repositories
{
    public class InMemEmployeeRepositories : IEmployeeRepository
    {
        private readonly List<Employee> employees = new()
        {
            new Employee { Id = Guid.NewGuid(), FirstName = "Sebastian", LastName = "Fast", Salary = 17500.32m , IsCEO = true, IsManager = false, ManagerId = 0 }
           
        };

        public IEnumerable<Employee> GetEmployeesAsync()
        {
            return employees;
        }

        public Employee GetEmployee(Guid id)
        {
            return employees.Where(employee => employee.Id == id).SingleOrDefault();
        }

        public void CreateEmployeeAsync(Employee employee)
        {
            employees.Add(employee);
        }

        public void UpdateEmployeeAsync(Employee employee)
        {
           var index = employees.FindIndex(existingEmployee => existingEmployee.Id == employee.Id);
           employees[index] = employee;
        }

        public void DeleteEmployeeAsync(Guid id)
        {
            var index = employees.FindIndex(existingEmployee => existingEmployee.Id == id);
            employees.RemoveAt(index);
        }

    }
}
*/