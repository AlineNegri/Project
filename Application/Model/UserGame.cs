
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Application.Model
{
    public class UserGame : IEntity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Game")]
        public int IdGame { get; set; }
        public Game Game { get; set; }

        [Required]
        [ForeignKey("User")]
        public int IdUser { get; set; }
        public User User { get; set; }

    }
}