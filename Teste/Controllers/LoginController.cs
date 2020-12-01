using Application.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Test.Auth;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserRepository _repository;
        public LoginController(UserRepository repository) : base()
        {
            _repository = repository;
        }

        [HttpPost("login")]
        public async Task<ActionResult<dynamic>>Login([FromBody] Login model)
        {

            var user = await this._repository.Login(model.NameLogin, model.Password);

            if (user != null)
            {

                var tokenString = TokenService.GenerateToken(user);
                return Ok(new { token = tokenString });
            }
            else
            {
                return null;
            }

        }
    }
}
