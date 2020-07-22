using System;

namespace GoUpLadder.API.Models
{
    public class UserMeasure
    {
        public int Id { get; set; }
        public string MeasureId { get; set; }
        public int Weight { get; set; }
        public DateTime DateAdded { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
    }
}