using System;
using GoUpLadder.API.Models;

namespace GoUpLadder.API.Dtos
{
    public class UserMeasuresForDetailedDto
    {
        public int Id { get; set; }
        public virtual Measure Measure { get; set; }
        public int Weight { get; set; }
        public DateTime DateAdded { get; set; }
   }
}