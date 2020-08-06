using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GoUpLadder.API.Data;
using GoUpLadder.API.Dtos;
using GoUpLadder.API.Helpers;
using GoUpLadder.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace GoUpLadder.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class UserMeasuresController : ControllerBase
    {
        private readonly IUpLadderRepository _repo;
        private readonly IMapper _mapper;

        public UserMeasuresController(IUpLadderRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetUserMeasures(int userId)
        {
            var userMeasuresFromRepo = await _repo.GetUserMeasures(userId);

            var userMeasures = _mapper.Map<IEnumerable<UserMeasuresForDetailedDto>>(userMeasuresFromRepo);

            return Ok(userMeasures);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateUserMeasure(int userId, 
            UserMeasureForCreationDto userMeasureForCreationDto)
        {
             var sender = await _repo.GetUser(userId);

             if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var message = _mapper.Map<UserMeasure>(userMeasureForCreationDto);

            _repo.Add(message);

            await _repo.SaveAll();

            return Ok();

            throw new Exception("Creating the userMeasure failed on save");
           


        }
        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteUserMeasure(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userMeasureFromRepo = await _repo.GetUserMeasure(id);

            _repo.Delete(userMeasureFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
           
            throw new Exception("Error deleting the user Measure");   
        }

    }
}