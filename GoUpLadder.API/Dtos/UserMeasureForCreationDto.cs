using System;
using GoUpLadder.API.Models;

namespace GoUpLadder.API.Dtos
{
    public class UserMeasureForCreationDto
    {
        public int MeasureTypeId { get; set; }
        public int Weight { get; set; }
        public DateTime DateAdded { get; set; }
        public UserMeasureForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}