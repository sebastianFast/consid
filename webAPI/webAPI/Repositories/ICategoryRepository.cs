using webAPI.Entities;
using System;
using System.Collections.Generic;

namespace webAPI.Repositories
{
      public interface ICategoryRepository
    {
        Task<Category> GetCategoryAsync(Guid id);
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task CreateCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(Guid id);
        Task<IEnumerable<Item>> GetItemsAsync();
    }
}