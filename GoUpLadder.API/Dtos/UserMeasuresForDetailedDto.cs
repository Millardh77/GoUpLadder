using System;
using GoUpLadder.API.Models;

namespace GoUpLadder.API.Dtos
{
    public class UserMeasuresForDetailedDto
    {
        public int Id { get; set; }
        public int MeasureTypeId { get; set; }
        public int Weight { get; set; }
        public int MeasureIndex { get; set; }
        public string Description { get; set; }
    }
}