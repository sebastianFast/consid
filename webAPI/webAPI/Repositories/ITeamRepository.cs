using webAPI.Entities;
using webAPI.Dtos;
using System;
using System.Collections.Generic;

namespace webAPI.Repositories
{
      public interface ITeamRepository
    {
        Task<Team> GetTeamAsync(Guid id);
        Task<IEnumerable<Team>> GetTeamsAsync();
        Task CreateTeamAsync(Team team);
        Task DeleteTeamAsync(Guid id);
    }
}