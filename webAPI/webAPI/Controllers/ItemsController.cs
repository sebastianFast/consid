using Microsoft.AspNetCore.Mvc;
using webAPI.Repositories;
using webAPI.Entities;
using webAPI.Dtos;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace webAPI.Controllers
{
    // GET /item
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository repository;

        public ItemsController(IItemsRepository repository){
            this.repository = repository;
        }

        // GET /items/all
        //Unsorted
        [HttpGet("/items/all")]
        public async Task<IEnumerable<ItemDto>> GetItemsAsync()
        {
            try{
                var items = (await repository.GetItemsAsync()).Select( item => item.AsDto());
                return items;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return new List<ItemDto>();
        }

        // GET /items
        //Sorted Category
        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetItemsSortedAsync()
        {
            try{
                var items = (await repository.GetItemsSortedAsync()).Select( item => item.AsDto());
                return items;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return new List<ItemDto>();
        }

        //GET /items
        //Sorted Title
        [HttpGet("/title")]
           public async Task<IEnumerable<ItemDto>> GetTitleSortedAsync()
        {
            try{
                var items = (await repository.GetTitleSortedAsync()).Select( item => item.AsDto());
                return items;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return new List<ItemDto>();
        }

        // GET /items/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItemAsync(Guid id){
            try{
            var item = await repository.GetItemAsync(id);

            if(item is null)
            {
                return NotFound();
            }

            return item.AsDto();
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return NoContent();
        }

        

        [HttpGet("/search/{field}/{input}")]
        public async Task<ActionResult<List<ItemDto>>> SearchItemAsync(string field,string input){

            try{
            List<ItemDto> items = (List<ItemDto>) await repository.SearchItemAsync(field, input);
            if(items.Count < 1)
            {
                return NotFound();
            }

            return items;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
         return NoContent();
           
        }

        //POST /items
        [HttpPost]
        public async Task<ActionResult<ItemDto>> CreateItemAsync(CreateItemDto itemDto){

            // uniquekollfunction (med relevanta argument)
            try{

           
                //Check if item is borrowable
                if(itemDto.Borrower == "" || itemDto.Type == "Ref. Book"){
                    itemDto.IsBorrowable = true;
                }

                //Assign CategoryId
                if(itemDto.Type == "Book"){
                    itemDto.CategoryId = 1;
                }
                 if(itemDto.Type == "Audio"){
                    itemDto.CategoryId = 2;
                }
                 if(itemDto.Type == "DVD"){
                    itemDto.CategoryId = 3;
                }
                 if(itemDto.Type == "Ref. Book"){
                    itemDto.CategoryId = 4;
                }

            
               
                //Check if Item has a category
                 if(itemDto.CategoryId != 1 && itemDto.CategoryId != 2 && itemDto.CategoryId != 3 && itemDto.CategoryId != 4){
                throw new Exception("Item must be assigned a category!");
            }

            
                
                   //check if item is trying to be borrowed as a ref book
                if(itemDto.Type == "Ref. Book" && itemDto.IsBorrowable == true){
                throw new Exception("Ref books cant be borrowed");
            }

                //Check if Item exists
                List<Item> existingList = (List<Item>) repository.GetItemsAsync().Result;
                 
                existingList.ForEach(item => {
                if(item.Title.Equals(itemDto.Title + "(TT)")){
                    throw new Exception("Item already exists");
                }
            });


            //Create Item
            Item item = new(){
                Id = Guid.NewGuid(),
                CategoryId = itemDto.CategoryId,
                Title = itemDto.Title + "(TT)",
                Author = itemDto.Author,
                Pages = itemDto.Pages,
                RunTimeMinutes = itemDto.RunTimeMinutes,
                IsBorrowable = itemDto.IsBorrowable,
                Borrower = itemDto.Borrower,
                BorrowDate = DateTimeOffset.UtcNow,
                Type = itemDto.Type
            };

           

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new {id = item.Id}, item.AsDto());

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return NoContent();
        }

        //PUT /items{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(Guid id, UpdateItemDto itemDto, bool borrow){
            try{
            var existingItem = await repository.GetItemAsync(id);

            //null check
            if(existingItem is null){
                return NotFound();
            }

            //check if item is trying to be borrowed as a ref book
            if(itemDto.Type == "Ref. Book" && itemDto.IsBorrowable == true){
                throw new Exception("Ref books cant be borrowed");
            }

             //Check if Item exists
                List<Item> existingList = (List<Item>) repository.GetItemsAsync().Result;
                 
                existingList.ForEach(item => {
                if(item.Title.Equals(itemDto.Title + "(TT)") && borrow == false){
                    throw new Exception("Item already exists");
                }
            });

            string title = itemDto.Title;
            if(!title.Contains("(TT)")){
            string newTitle = String.Concat(title, "(TT)");
                Item updatedItem = existingItem with {
                CategoryId = itemDto.CategoryId,
                Title =  newTitle,
                Author = itemDto.Author,
                Pages = itemDto.Pages,
                RunTimeMinutes = itemDto.RunTimeMinutes,
                IsBorrowable = itemDto.IsBorrowable,
                Borrower = itemDto.Borrower,
                Type = itemDto.Type
            };
            await repository.UpdateItemAsync(updatedItem);
            return NoContent();
            } 
            else 
            {
                Item updatedItem = existingItem with {
                CategoryId = itemDto.CategoryId,
                Title =  title,
                Author = itemDto.Author,
                Pages = itemDto.Pages,
                RunTimeMinutes = itemDto.RunTimeMinutes,
                IsBorrowable = itemDto.IsBorrowable,
                Borrower = itemDto.Borrower,
                Type = itemDto.Type
                 };
            await repository.UpdateItemAsync(updatedItem);
            return NoContent();
            }

            }
            catch(Exception e){
                Console.WriteLine(e.Message);
            }
             return NoContent();
        }


        //Delete /items/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemAsync(Guid id){
            try{
                var existingItem = await repository.GetItemAsync(id);

                if(existingItem.IsBorrowable == false && existingItem.Type != "Ref. Book"){
                throw new Exception("Item is being borrowed.");
                }
                
                if(existingItem is null){
                    return NotFound();
                }
                await repository.DeleteItemAsync(id);
                return NoContent();
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
            }
             return NoContent();
        }
    }
}