using System;

namespace GoUpLadder.API.Dtos
{
    public class UserMeasuresForDetailedDto
    {
        public int Id { get; set; }
        public string Measure { get; set; }
        public DateTime DateAdded { get; set; }
        public string Weight { get; set; }
   }
}