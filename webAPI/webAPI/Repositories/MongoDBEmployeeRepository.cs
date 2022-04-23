using webAPI.Entities;
using MongoDB.Driver;
using MongoDB.Bson;

namespace webAPI.Repositories
{
    public class MongoDBEmployeeRepository : IEmployeeRepository
    {
        private const string databaseName = "webAPI";
        private const string collectionName = "Employees";
        private readonly IMongoCollection<Employee> itemsCollection;
        private readonly FilterDefinitionBuilder<Employee> filterBuilder = Builders<Employee>.Filter;

        public MongoDBEmployeeRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<Employee>(collectionName);
        }

        //create employee and insert it into itemscollection(DB)
        public async Task CreateEmployeeAsync(Employee employee)
        {
            await itemsCollection.InsertOneAsync(employee);
        }

        //delete a specific employee by id
        public async Task DeleteEmployeeAsync(Guid id)
        {
            var filter = filterBuilder.Eq(employee => employee.Id, id);
            await itemsCollection.DeleteOneAsync(filter);
        }

        //return a specific employee by id
        public async Task<Employee> GetEmployeeAsync(Guid id)
        {
            var filter = filterBuilder.Eq(employee => employee.Id, id);
            return await itemsCollection.Find(filter).SingleOrDefaultAsync();
        }

           //return a specific employee by email
        public async Task<Employee> GetEmployeeAsync(string email)
        {
            var filter = filterBuilder.Eq(employee => employee.Email, email);
            return await itemsCollection.Find(filter).SingleOrDefaultAsync();
        }

        //return all employees unsorted
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await itemsCollection.Find(new BsonDocument()).ToListAsync();
        }

        //get all the employees sorted by manager and ceo
        public async Task<IEnumerable<Employee>> GetEmployeesSortedAsync()
        {
            var employees = await itemsCollection.Find(new BsonDocument()).ToListAsync();
            var sortedEmployees = employees.OrderByDescending(x => (x.IsCEO, x.IsManager));
            return sortedEmployees;
        }

        //Update employee
        //Replace the existing employee with the updated one
        public async Task UpdateEmployeeAsync(Employee employee)
        {
           var filter = filterBuilder.Eq(existingEmployee => existingEmployee.Id, employee.Id);
           await itemsCollection.ReplaceOneAsync(filter, employee);
        }

        //Login employee
        
    }
}