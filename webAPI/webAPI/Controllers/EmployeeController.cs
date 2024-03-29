using Microsoft.AspNetCore.Mvc;
using webAPI.Repositories;
using webAPI.Entities;
using webAPI.Dtos;
using webAPI.Services;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;


namespace webAPI.Controllers
{
    // employees
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository repository;
        private readonly ITeamRepository teamRepository;

        public EmployeeController(IEmployeeRepository repository, ITeamRepository teamRepository){
            this.repository = repository;
            this.teamRepository = teamRepository;
        }

        // GET /employee/all
        [HttpGet("/all")]
        public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
        {
            try{  
            //Get all employees
           var employees = (await repository.GetEmployeesAsync()).Select( employee => employee.AsDto());
           return employees;

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
          return new List<EmployeeDto>();
        }

        //GET /Employee
        //Sorted Title
          [HttpGet]
           public async Task<IEnumerable<EmployeeDto>> GetEmployeesSortedAsync()
        {
            try{
                var items = (await repository.GetEmployeesSortedAsync()).Select( item => item.AsDto());
                return items;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return new List<EmployeeDto>();
        }

        // GET /employee/{id}
        [HttpGet("{id}")]
         public async Task<ActionResult<EmployeeDto>> GetEmployeeAsync(Guid id){
             try{
                var employee = await repository.GetEmployeeAsync(id);

                //Check if employee exists or return not found
                if(employee is null)
                {
                    return NotFound();
                }

            return employee.AsDto();
             }catch(Exception e){
                 Console.WriteLine(e.Message);
             }
           return NoContent();
        }


        [Authorize(Roles = "IsCEO, IsManager")]
        //POST /employee
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> CreateItemAsync(CreateEmployeeDto employeeDto){
            try{

                 //Check if CEO exists
                List<Employee> existingList = (List<Employee>) repository.GetEmployeesAsync().Result;
                 
                existingList.ForEach(employee => {
                if(employeeDto.IsCEO == true && employee.IsCEO == true){
                    throw new Exception("Can only have one CEO!");
                }
              
                });
                //Check if CEO && Manager 
                if(employeeDto.IsCEO == true && employeeDto.IsManager == true){
                    throw new Exception("You can't assign a user both CEO and Manager!");
                }

                //Calculate Coefficients
                decimal employeeCoe = 1.125m;
                decimal managerCoe = 1.725m;
                decimal ceoCoe = 2.725m; 
                var sal = new EmployeeDto{};
                
                if(employeeDto.IsCEO == false && employeeDto.IsManager == false){
                    sal = new EmployeeDto {Salary = (decimal)(employeeDto.Salary * employeeCoe)};
                }
                else if(employeeDto.IsCEO == false && employeeDto.IsManager == true){
                    sal = new EmployeeDto {Salary = (decimal)(employeeDto.Salary * managerCoe)};
                }
                 else if(employeeDto.IsCEO == true && employeeDto.IsManager == false){
                    sal = new EmployeeDto {Salary = (decimal)(employeeDto.Salary * ceoCoe)};
                }

                //Create new Employee
                Employee employee = new(){
                Id = Guid.NewGuid(),
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Salary = sal.Salary,
                IsCEO = employeeDto.IsCEO,
                IsManager = employeeDto.IsManager,
                TeamId = employeeDto.TeamId
            };


            await repository.CreateEmployeeAsync(employee);

            return CreatedAtAction(nameof(GetEmployeeAsync), new {id = employee.Id}, employee.AsDto());

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
           return NoContent();
        }

        //PUT /employee{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployeeAsync( Guid id, UpdateEmployeeDto employeeDto){
            try{
              
                List<Employee> existingList = (List<Employee>) repository.GetEmployeesAsync().Result;
                existingList.ForEach(employee => {
                    if(employeeDto.IsCEO == true && employee.IsCEO == true){
                        throw new Exception("Can only have one CEO!");
                    }
                });


                //Check if CEO && Manager 
                if(employeeDto.IsCEO == true && employeeDto.IsManager == true){
                    throw new Exception("You can't assign a user both CEO and Manager!");
                }

                

                var existingEmployee = await repository.GetEmployeeAsync(id);

              

                //If Employee doesnt exists return not found
                if(existingEmployee is null){
                    return NotFound();
                }

                //Check for manager and CEO
                //Both update and team creation
                if(employeeDto.IsCEO == true && existingEmployee.IsManager == false){
                    throw new Exception("CEO's cant update Employees");
                }
                  if(employeeDto.IsManager == true && existingEmployee.IsCEO == true){
                    throw new Exception("Managers's cant update CEO's");
                }
                 if(employeeDto.IsManager == false && existingEmployee.IsCEO == false){
                    throw new Exception("Employees cant update users");
                }

                if(employeeDto.TeamId != existingEmployee.TeamId){
                   var check = teamRepository.GetTeamAsync(employeeDto.TeamId);
                     if(check is null){
                        return NotFound();
                        }
                }
            // om uppdatering av teamId
            // fråga teamRepository; giltig?

            //Update Employee
            Employee updatedEmployee = existingEmployee with {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Salary = employeeDto.Salary,
                IsCEO = employeeDto.IsCEO,
                IsManager = employeeDto.IsManager,
                TeamId = employeeDto.TeamId
            };

            await repository.UpdateEmployeeAsync(updatedEmployee);

            return NoContent();
            }catch(Exception e){
                Console.WriteLine(e);
            }
            
            return NoContent();
        }


        //Delete /employee/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployeeAsync( Guid id){
            try{

            //If employee doesnt exist return not found
            var existingEmployee = await repository.GetEmployeeAsync(id);
            if(existingEmployee is null){
                return NotFound();
            }

            await repository.DeleteEmployeeAsync(id);

            return NoContent();

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
           return NoContent();
        }
    }
}