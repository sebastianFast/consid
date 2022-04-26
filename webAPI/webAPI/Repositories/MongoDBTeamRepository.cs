
using webAPI.Dtos;
using webAPI.Entities;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;

namespace webAPI.Repositories
{
    public class MongoDBTeamRepository : ITeamRepository
    {
        private const string databaseName = "webAPI";
        private const string collectionName = "teams";
        private readonly IMongoCollection<Team> itemsCollection;
        private readonly FilterDefinitionBuilder<Team> filterBuilder = Builders<Team>.Filter;

        public MongoDBTeamRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<Team>(collectionName);
            var indexKeysDefinition = Builders<Team>.IndexKeys.Ascending(tome => tome.Id).Ascending(tome => tome.Id);
            itemsCollection.Indexes.CreateOneAsync(new CreateIndexModel<Team>(indexKeysDefinition));
        }

        //Call for creating a team
        public async Task CreateTeamAsync(Team team)
        {
           await itemsCollection.InsertOneAsync(team);
        }

        //Delete team and find it with the ID
        public async Task DeleteTeamAsync(Guid id)
        {
            var filter = filterBuilder.Eq(team => team.Id, id);
            await itemsCollection.DeleteOneAsync(filter);
        }


        //Get team based on its ID
        public async Task<Team> GetTeamAsync(Guid id)
        {
            var filter = filterBuilder.Eq(team => team.Id, id);
            return await itemsCollection.Find(filter).SingleOrDefaultAsync();
        }


        //Get all the teams unsorted
        public async Task<IEnumerable<Team>> GetTeamsAsync()
        {
            return await itemsCollection.Find(new BsonDocument()).ToListAsync();
        }

       
    }
}