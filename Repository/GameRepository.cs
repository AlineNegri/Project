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
    public class GameRepository : Repository<Game, TestDbContext>
    {

        private TestDbContext _dbContext;
        public GameRepository(TestDbContext context) : base(context)
        {
            this._dbContext = context;
        }

        public override bool Validation(Game entity)
        {
            if (String.IsNullOrEmpty(entity.Name))
            {
                throw new SystemException("Informe um Nome do Jogo");
            }
            
            return true;
        }
    }
}
