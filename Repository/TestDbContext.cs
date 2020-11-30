using Application.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Repository
{
    public class TestDbContext : DbContext
    {

        public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }

        public DbSet<UserGame> UserGames { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascades = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var item in cascades)
            {
                item.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<User>()
            //    .HasKey(c => new { c.Id });

            //modelBuilder.Entity<RecordOfSale>()
            //    .HasOne(s => s.Car)
            //    .WithMany(c => c.SaleHistory)
            //    .HasForeignKey(s => s.CarLicensePlate)
            //    .HasPrincipalKey(c => c.LicensePlate);
        }

    }
}