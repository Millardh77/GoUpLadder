using GoUpLadder.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace GoUpLadder.API.Controllers
{
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class UserMeasuresController : ControllerBase
    {
        private readonly DataContext _context;
        public UserMeasuresController(DataContext context)
        {
            _context = context;
        }
        
    }
}