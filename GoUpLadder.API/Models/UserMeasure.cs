using System;

namespace GoUpLadder.API.Models
{
    public class UserMeasure
    {
        public int Id { get; set; }
        public virtual Measure Measure { get; set; }
        public int Weight { get; set; }
        public DateTime DateAdded { get; set; }
        public virtual User User { get; set; }
        
    }
}