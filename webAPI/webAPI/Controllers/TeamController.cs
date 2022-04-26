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
    // GET /Team
    [ApiController]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository repository;

        public TeamController(ITeamRepository repository){
            this.repository = repository;
        }

        // GET /Team/all
        //Unsorted
        [HttpGet("/team")]
        public async Task<IEnumerable<TeamDto>> GetTeamsAsync()
        {
            try{
                var teams = (await repository.GetTeamsAsync()).Select( team => team.AsDto());
                return teams;
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return new List<TeamDto>();
        }


        // GET /team/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamDto>> GetTeamAsync(Guid id){
            try{
            var team = await repository.GetTeamAsync(id);

            if(team is null)
            {
                return NotFound();
            }

            return team.AsDto();
            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
            return NoContent();
        }

    //POST /teams
        [HttpPost]
        public async Task<ActionResult<TeamDto>> CreateTeamAsync(CreateTeamDto teamDto){
            try{

            //If team exist exist return ?
            var existingTeam = await repository.GetTeamAsync(teamDto.ManagerId);
            if(existingTeam is not null){
                return NotFound("This manager is occupied!");
            }
            
            //Create team
            Team team = new(){
                Id = Guid.NewGuid(),
                ManagerId = teamDto.ManagerId
            };

           
            await repository.CreateTeamAsync(team);

            return CreatedAtAction(nameof(GetTeamAsync), new {id = team.Id}, team.AsDto());

            }catch(Exception e){
                Console.WriteLine(e.Message);
                Console.Write(e.StackTrace);
            }
            return NoContent();
        }

        
        //Delete /team/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeamAsync( Guid id){
            try{

            //If team doesnt exist return not found
            var existingTeam = await repository.GetTeamAsync(id);
            if(existingTeam is null){
                return NotFound();
            }

            await repository.DeleteTeamAsync(id);

            return NoContent();

            }catch(Exception e){
                Console.WriteLine(e.Message);
            }
           return NoContent();
        }

    }
}