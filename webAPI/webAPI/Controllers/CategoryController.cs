using Microsoft.AspNetCore.Mvc;
using webAPI.Repositories;
using webAPI.Entities;
using webAPI.Dtos;

namespace webAPI.Controllers
{
    // GET /category
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository repository;

        public CategoryController(ICategoryRepository repository){
            this.repository = repository;
        }

        // GET /category
        [HttpGet]
       public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
            try{
            var category = (await repository.GetCategoriesAsync()).Select( category => category.AsDto());
            return category;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
           return new List<CategoryDto>();
        }

        // GET /category/{id}
        [HttpGet("{id}")]
          public async Task<ActionResult<CategoryDto>> GetCategoryAsync(Guid id){
              try{
                var category = await repository.GetCategoryAsync(id);
                if(category is null)
                {
                    return NotFound();
                }

                return category.AsDto();

              }catch(Exception e){
                  Console.WriteLine(e.Message);
              }
            return NoContent();
        }

         //POST /category
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategoryAsync(CreateCategoryDto categoryDto){

            try{
                Category category = new(){
                    Id = Guid.NewGuid(),
                    CategoryName = categoryDto.CategoryName
                };

            await repository.CreateCategoryAsync(category);

            return CreatedAtAction(nameof(GetCategoryAsync), new {id = category.Id}, category.AsDto());

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }

            return NoContent();
        }

        //PUT /category{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategoryAsync(Guid id, UpdateCategoryDto categoryDto){
            
            try{
             var existingCategory = await repository.GetCategoryAsync(id);
            
                if(existingCategory is null){
                    return NotFound();
                }

                  //Check if Item exists
                    List<Item> existingList = (List<Item>) repository.GetItemsAsync().Result;
                       
                    existingList.ForEach(item => {
                    if(item.Type.Equals(existingCategory.CategoryName)){
                        throw new Exception("Category has references in the library!");
                    }
                    });

                Category updatedCategory = existingCategory with {
                    CategoryName = categoryDto.CategoryName
                };

                await repository.UpdateCategoryAsync(updatedCategory);

            return NoContent();
            }catch(Exception e){
                Console.WriteLine(e);
            }
          return NoContent();

        }


        //Delete /category/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategoryAsync(Guid id){
            
            try{
             var existingCategory = await repository.GetCategoryAsync(id);
                   

                    //Check if Item exists
                    List<Item> existingList = (List<Item>) repository.GetItemsAsync().Result;
                       
                    existingList.ForEach(item => {
                    if(item.Type.Equals(existingCategory.CategoryName)){
                        throw new Exception("Category has references in the library!");
                    }
                    });
                    
                    if(existingCategory is null){
                        return NotFound();
                    }

                await repository.DeleteCategoryAsync(id);

            return NoContent();

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
          return NoContent();
        }
    }
}