namespace GoUpLadder.API.Models
{
    public class Measure
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public virtual MeasureType Type { get; set; }
        public int MeasureTypeId { get; set; }
        public int MeasureIndex { get; set; }


    }
}