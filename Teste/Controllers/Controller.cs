using Application;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class Controller<TEntity, TRepository> : ControllerBase
       where TEntity : class, IEntity
       where TRepository : IRepository<TEntity>
    {
        private readonly TRepository repository;

        public Controller(TRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            return await repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var user = await repository.Get(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TEntity user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await repository.Update(user);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity user)
        {
            await repository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var user = await repository.Delete(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

    }
}

