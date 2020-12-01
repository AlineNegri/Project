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
    public class UserRepository : Repository<User, TestDbContext>
    {

        private TestDbContext _dbContext;
        public UserRepository(TestDbContext context) : base(context)
        {
            this._dbContext = context;
        }

        public virtual async Task<User> Login(string login, string password)
        {
            return await _dbContext.Set<User>().Where(x => x.Login == login && x.Password == password).FirstOrDefaultAsync();
        }


        public override bool Validation(User entity)
        {
            if (String.IsNullOrEmpty(entity.Name)) {
                throw new SystemException("Informe um Nome");
            }

            if (String.IsNullOrEmpty(entity.Login))
            {
                throw new SystemException("Informe um Login");
            }

            if (String.IsNullOrEmpty(entity.Password))
            {
                throw new SystemException("Informe uma Senha");
            }

            return true;
        }
    }    
}
