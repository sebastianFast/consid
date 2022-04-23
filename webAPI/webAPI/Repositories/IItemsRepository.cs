using webAPI.Entities;
using webAPI.Dtos;
using System;
using System.Collections.Generic;

namespace webAPI.Repositories
{
      public interface IItemsRepository
    {
        Task<Item> GetItemAsync(Guid id);
        Task<IEnumerable<Item>> GetItemsAsync();
       Task<IEnumerable<Item>> GetItemsSortedAsync();
       Task<IEnumerable<Item>> GetTitleSortedAsync();
        Task CreateItemAsync(Item item);
        Task UpdateItemAsync(Item item);
        Task DeleteItemAsync(Guid id);
        Task<IEnumerable<ItemDto>> SearchItemAsync(string field, string title);
    }
}