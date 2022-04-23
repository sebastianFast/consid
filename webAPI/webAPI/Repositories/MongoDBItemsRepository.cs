
using webAPI.Dtos;
using webAPI.Entities;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;

namespace webAPI.Repositories
{
    public class MongoDBItemsRepository : IItemsRepository
    {
        private const string databaseName = "webAPI";
        private const string collectionName = "libraryItems";
        private readonly IMongoCollection<Item> itemsCollection;
        private readonly FilterDefinitionBuilder<Item> filterBuilder = Builders<Item>.Filter;

        public MongoDBItemsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<Item>(collectionName);
            var indexKeysDefinition = Builders<Item>.IndexKeys.Ascending(tome => tome.Title).Ascending(tome => tome.Author);
            itemsCollection.Indexes.CreateOneAsync(new CreateIndexModel<Item>(indexKeysDefinition));
        }

        //Call for creating an item
        public async Task CreateItemAsync(Item item)
        {
               
           await itemsCollection.InsertOneAsync(item);
        }

        //Delete an item and find it with the ID
        public async Task DeleteItemAsync(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await itemsCollection.DeleteOneAsync(filter);
        }


        //Get an item based on its ID
        public async Task<Item> GetItemAsync(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await itemsCollection.Find(filter).SingleOrDefaultAsync();
        }


        //Get all the items unsorted
        public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            return await itemsCollection.Find(new BsonDocument()).ToListAsync();
        }


        //get all the items sorted
        //category
         public async Task<IEnumerable<Item>> GetItemsSortedAsync()
        {
            var items = await itemsCollection.Find(new BsonDocument()).ToListAsync();
            var sortedItems = items.OrderBy(x => x.CategoryId.ToString());
            return sortedItems;
        }

         //get all the items sorted
        //title
        public async Task<IEnumerable<Item>> GetTitleSortedAsync()
        {
            var items = await itemsCollection.Find(new BsonDocument()).ToListAsync();
            var sortedItems = items.OrderBy(x => x.Title);
            return sortedItems;
        }


        //update items
        public async Task UpdateItemAsync(Item item)
        {
           var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
           await itemsCollection.ReplaceOneAsync(filter, item);
        }


        //search for specific items
        public async Task<IEnumerable<ItemDto>> SearchItemAsync(string field, string input)
        {
            IAsyncCursor<Item> cursor;
            
            switch (field.ToLower())
            {
                case "title":
                {
                    cursor = await itemsCollection.FindAsync(tome => tome.Title.StartsWith(input));
                    break;
                }
                case "author":
                {
                    cursor = await itemsCollection.FindAsync(tome => tome.Author.StartsWith(input));
                    break;
                }
                case "all":
                {
                    cursor = await itemsCollection.FindAsync(tome => tome.Title.Contains(input));
                    break;
                }
                default:
                return new List<ItemDto>();
            }

            List<ItemDto> result = new List<ItemDto>();
            cursor.ToList<Item>().ForEach(item => result.Add(item.AsDto()));
            return result;
        }

       
    }
}