using System;

namespace GoUpLadder.API.Models
{
    public class UserMeasure
    {
        public int Id { get; set; }
        public virtual MeasureType Type { get; set; }
        public int MeasureTypeId { get; set; }
        public int Weight { get; set; }
        public DateTime DateAdded { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public int MeasureIndex { get; set; }
        public string Description { get; set; }
        
    }
}