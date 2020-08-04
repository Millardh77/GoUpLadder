using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoUpLadder.API.Dtos;
using GoUpLadder.API.Helpers;
using GoUpLadder.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GoUpLadder.API.Data
{
    public class UpLadderRespository : IUpLadderRepository
    {
        private readonly DataContext _context;

        public UpLadderRespository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            // users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0;
        }
        public  async Task<IEnumerable<Measure>> GetMeasures(int id)
        {
            var measures =  await _context.Measure
                    .Where(m => m.Type.Id == id)
                    .ToListAsync();
                      
            //var measures = await _context.Measures.FirstOrDefaultAsync(m => m.Type.Id == id);

            return measures;
        }

         public  async Task<IEnumerable<UserMeasure>> GetUserMeasures(int id)
        {
            var usermeasures =  await _context.UserMeasure
                    .Where(m => m.User.Id == id)
                    .ToListAsync();
                      
            //var measures = await _context.Measures.FirstOrDefaultAsync(m => m.Type.Id == id);

            return usermeasures;
        }

        public async Task<UserMeasure> GetUserMeasure(int id)
        {
            return await _context.UserMeasure.FirstOrDefaultAsync(m => m.Id == id);
        }
 
    }
}