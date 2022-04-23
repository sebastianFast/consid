/*using System.Collections.Generic;
using System.Linq;
using System;
using webAPI.Entities;


namespace webAPI.Repositories
{
    public class InMemItemRepositories : IItemsRepository
    {
        private readonly List<Item> items = new()
        {
            new Item { Id = Guid.NewGuid(), CategoryId = 1, Title = "I am Zlatan", Author = "Sebastian Fast", Pages = 255, RunTimeMinutes = 0, IsBorrowable = true, Borrower = "", BorrowDate =  DateTimeOffset.UtcNow, Type = "Book"
        }
        };

        public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            return await Task.FromResult(items);
        }

        public async Task<Item> GetItemAsync(Guid id)
        {
            var item = items.Where(item => item.Id == id).SingleOrDefault();
            return await Task.FromResult(item);
        }

        public async Task CreateItemAsync(Item item)
        {
            items.Add(item);
            await Task.CompletedTask;
        }

        public async Task UpdateItemAsync(Item item)
        {
           var index = items.FindIndex(existingItem => existingItem.Id == item.Id);
           items[index] = item;
           await Task.CompletedTask;
        }

        public async Task DeleteItemAsync(Guid id)
        {
            var index = items.FindIndex(existingItem => existingItem.Id == id);
            items.RemoveAt(index);
            await Task.CompletedTask;
        }
    }
}
*/