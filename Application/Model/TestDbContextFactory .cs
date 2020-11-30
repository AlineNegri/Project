using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Application.Model
{
    public class TestDbContextFactory : IDesignTimeDbContextFactory<TestDbContext>
    {
   
        public TestDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TestDbContext>();
            optionsBuilder.UseSqlServer("server =.; database = test; trusted_connection = true;");

            return new TestDbContext(optionsBuilder.Options);
        }
    }
}
