using Application;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class Repository<TEntity, TContext> : IRepository<TEntity>
        where TEntity : class, IEntity
        where TContext : TestDbContext
    {
        private readonly TContext context;
        public Repository(TContext context)
        {
            this.context = context;
        }

        public abstract bool Validation(TEntity entity); 
        
        public async Task<TEntity> Add(TEntity entity)
        {
            try
            {
                if (Validation(entity))
                {
                    // context.Entry<TEntity>(entity).State = EntityState.Added;
                    context.Set<TEntity>().Add(entity);
                    await context.SaveChangesAsync();
                    return entity;
                }
                else
                {
                    throw new System.Exception("Registro inválido");
                }
            }
            catch (System.Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
                throw;
            }
            
        }

        public async Task<TEntity> Delete(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);
            await context.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Get(int id)
        {
            return await context.Set<TEntity>().FindAsync(id);
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await this.includes(context.Set<TEntity>()).ToListAsync();
        }

        protected virtual IQueryable<TEntity> includes(IQueryable<TEntity> query)
        {
            return query;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return entity;
        }

    }
}

