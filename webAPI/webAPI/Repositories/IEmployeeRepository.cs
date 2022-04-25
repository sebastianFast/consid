using webAPI.Entities;
using System;
using System.Collections.Generic;

namespace webAPI.Repositories
{
      public interface IEmployeeRepository
    {
        Task<Employee> GetEmployeeAsync(Guid id);
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<IEnumerable<Employee>> GetEmployeesSortedAsync();
        Task CreateEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(Guid id);
    }
}