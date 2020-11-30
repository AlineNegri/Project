using Application;
using Application.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class UserGameRepository : Repository<UserGame, TestDbContext>
    {

        private TestDbContext _dbContext;
        public UserGameRepository(TestDbContext context) : base(context)
        {
            this._dbContext = context;
        }


        public override bool Validation(UserGame entity)
        {
            if (entity.IdGame <= 0)
            {
                throw new SystemException("Informe um Jogo");
            }

            if (entity.IdUser <= 0)
            {
                throw new SystemException("Informe um Amigo");
            }

            return true;
        }

        protected override IQueryable<UserGame> includes(IQueryable<UserGame> query)
        {
            return base.includes(query).Include(x => x.Game).Include(x => x.User);
        }
    }
}
