using System;

namespace GoUpLadder.API.Dtos
{
    public class UserMeasureToReturnDto
    {
        public int Id { get; set; }
        public int MeasureTypeId { get; set; }
        public int Weight { get; set; }
        public int MeasureIndex { get; set; }
        public DateTime DateAdded { get; set; }
        public string Description { get; set; }
    }
}