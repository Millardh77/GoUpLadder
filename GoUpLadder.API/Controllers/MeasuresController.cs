
using System.Threading.Tasks;
using GoUpLadder.API.Data;
using GoUpLadder.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoUpLadder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class MeasuresController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUpLadderRepository _repo;

        public MeasuresController(DataContext context, IUpLadderRepository repo)
        {
            _repo = repo;
            _context = context;
        }

        // GET api/measures
        [HttpGet]
        public async Task<IActionResult> GetAllMeasures()
        {
            var measures = await _context.Measure.ToListAsync();

            return Ok(measures);
        }

        // GET api/measures
        [HttpGet("{id}", Name = "GetMeasures")]
        public async Task<IActionResult> GetMeasures(int id)
        {
            var measures = await _repo.GetMeasures(id);

            return Ok(measures);
        }
    }
}