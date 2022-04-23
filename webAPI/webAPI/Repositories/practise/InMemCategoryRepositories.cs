/*using System.Collections.Generic;
using System.Linq;
using System;
using webAPI.Entities;


namespace webAPI.Repositories
{
    public class InMemCategoryRepositories : ICategoryRepository
    {
        private readonly List<Category> categories = new()
        {
           
           new Category { Id = Guid.NewGuid(), CategoryName = "Biography" }
           
        };

        public IEnumerable<Category> GetCategoryAsync()
        {
            return categories;
        }

        public Category GetCategory(Guid id)
        {
            return categories.Where(category => category.Id == id).SingleOrDefault();
        }

        public void CreateCategoryAsync(Category category)
        {
            categories.Add(category);
        }

        public void UpdateCategoryAsync(Category category)
        {
           var index = categories.FindIndex(existingCategory => existingCategory.Id == category.Id);
           categories[index] = category;
        }

        public void DeleteCategoryAsync(Guid id)
        {
            var index = categories.FindIndex(existingCategory => existingCategory.Id == id);
            categories.RemoveAt(index);
        }
    }
}
*/