using Application.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Auth;
using Test.Controllers;

namespace Teste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : Controller<Game, GameRepository>
    {
        private readonly GameRepository _repository;
        public GameController(GameRepository repository) : base(repository)
        {
            _repository = repository;
        }

        [HttpGet("GetAllGame")]
        [Authorize]
        public async Task<ActionResult<List<Game>>> GetAllGame()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("GetByIdGame")]
        [Authorize]
        public async Task<ActionResult<Game>> GetByIdGame (int id)
        {
            return Ok(await _repository.Get(id));
        }

        [HttpPost("CreateGame")]
        [Authorize]
        public async Task<ActionResult<Game>> CreateGame(Game game)
        {
            return Ok(await _repository.Add(game));
        }

        [HttpDelete("DeleteGame")]
        [Authorize]
        public async Task<ActionResult<Game>> DeleteGame(int id)
        {
            return Ok(await _repository.Delete(id));
        }

        [HttpPut("UpdateGame")]
        [Authorize]
        public async Task<ActionResult<Game>> UpdateGame(Game game)
        {
            return Ok(await _repository.Update(game));
        }
    }
}
