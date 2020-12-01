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
    public class UserController : Controller<User, UserRepository>
    {
        private readonly UserRepository _repository;
        public UserController(UserRepository repository) : base(repository)
        {
            _repository = repository;
        }

        [HttpGet("GetAllUser")]
        //[Authorize]
        public async Task<ActionResult<List<User>>> GetAllUser() {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("GetByIdUser")]
        [Authorize]
        public async Task<ActionResult<User>> GetByIdUser(int id)
        {
            return Ok(await _repository.Get(id));
        }

        [HttpPost("Create")]
        //[Authorize]
        public async Task<ActionResult<User>> Create(User use)
        {
            var retorno = await _repository.Add(use);
            return Ok(retorno);
        }

        [HttpDelete("DeleteUser")]
        [Authorize]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            return Ok(await _repository.Delete(id));
        }

        [HttpPut("UpdateUser")]
        [Authorize]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            return Ok(await _repository.Update(user));
        }
    }
}
