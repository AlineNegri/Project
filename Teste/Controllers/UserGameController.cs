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
    public class UserGameController : Controller<UserGame, UserGameRepository>
    {
        private readonly UserGameRepository _repository;
        private readonly UserRepository _userRepository;
        private readonly GameRepository _gameRepository;
        public UserGameController(UserGameRepository repository, UserRepository userRepository, GameRepository gameRepository) : base(repository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _gameRepository = gameRepository;
        }


        [HttpGet("GetAllUser")]
        [Authorize]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            return Ok(await _userRepository.GetAll());
        }


        [HttpGet("GetAllGame")]
        [Authorize]
        public async Task<ActionResult<List<Game>>> GetAllGame()
        {
            return Ok(await _gameRepository.GetAll());
        }

        [HttpGet("GetAllUserGame")]
        [Authorize]
        public async Task<ActionResult<List<UserGame>>> GetAllUserGame()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("GetByIdUserGame")]
        [Authorize]
        public async Task<ActionResult<UserGame>> GetByIdUserGame(int id)
        {
            return Ok(await _repository.Get(id));
        }

        [HttpPost("CreateUserGame")]
        [Authorize]
        public async Task<ActionResult<UserGame>> CreateUserGame(UserGame userGame)
        {
            return Ok(await _repository.Add(userGame));
        }

        [HttpDelete("DeleteUserGame")]
        [Authorize]
        public async Task<ActionResult<Game>> DeleteUserGame(int id)
        {
            return Ok(await _repository.Delete(id));
        }

        [HttpPut("UpdateUserGame")]
        [Authorize]
        public async Task<ActionResult<Game>> UpdateUserGame(UserGame userGame)
        {
            return Ok(await _repository.Update(userGame));
        }
    }
}
