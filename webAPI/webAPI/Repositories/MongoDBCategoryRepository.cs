using webAPI.Entities;
using MongoDB.Driver;
using MongoDB.Bson;

namespace webAPI.Repositories
{
    public class MongoDBCategoryRepository : ICategoryRepository
    {
        private const string databaseName = "webAPI";
        private const string collectionName = "Categories";
        private const string sharedCollectionName = "libraryItems";
        private readonly IMongoCollection<Category> itemsCollection;
        private readonly IMongoCollection<Item> sharedCollection;
        private readonly FilterDefinitionBuilder<Category> filterBuilder = Builders<Category>.Filter;

        public MongoDBCategoryRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<Category>(collectionName);
            sharedCollection =  database.GetCollection<Item>(sharedCollectionName);
        }

        public async Task CreateCategoryAsync(Category category)
        {
            await itemsCollection.InsertOneAsync(category);
        }

        public async Task DeleteCategoryAsync(Guid id)
        {

            var filter = filterBuilder.Eq(category => category.Id, id);
            await itemsCollection.DeleteOneAsync(filter);
        }

        public async Task<Category> GetCategoryAsync(Guid id)
        {
            var filter = filterBuilder.Eq(category => category.Id, id);
            return await itemsCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await itemsCollection.Find(new BsonDocument()).ToListAsync();
        }

         public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            return await sharedCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateCategoryAsync(Category category)
        {
           var filter = filterBuilder.Eq(existingCategory => existingCategory.Id, category.Id);
           await itemsCollection.ReplaceOneAsync(filter, category);
        }
    }
}