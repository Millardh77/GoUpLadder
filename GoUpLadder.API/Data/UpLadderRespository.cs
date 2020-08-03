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
    public async Task<string> SeedMeasures()
        {
            // create some measures
            var measuretypes = new List<MeasureType>
                {
                    new MeasureType{Description = "Age Range", Id = 1},
                    new MeasureType{Description = "Income Range", Id = 2},
                    new MeasureType{Description = "Education Level", Id = 3},
                    new MeasureType{Description = "General Health", Id = 4},
                    new MeasureType{Description = "Race/Ethnicity", Id = 5},
                    new MeasureType{Description = "State", Id = 6},
                    new MeasureType{Description = "Investments", Id = 7},
                    new MeasureType{Description = "Family Size", Id = 8},
                    new MeasureType{Description = "Gender", Id = 9}
                };

            var measuretypesforcreation = new List<MeasureTypeForCreationDto>
                {
                    new MeasureTypeForCreationDto{Description = "Age Range"},
                    new MeasureTypeForCreationDto{Description = "Income Range"},
                    new MeasureTypeForCreationDto{Description = "Education Level"},
                    new MeasureTypeForCreationDto{Description = "General Health"},
                    new MeasureTypeForCreationDto{Description = "Race/Ethnicity"},
                    new MeasureTypeForCreationDto{Description = "State"},
                    new MeasureTypeForCreationDto{Description = "Investments"},
                    new MeasureTypeForCreationDto{Description = "Family Size"},
                    new MeasureTypeForCreationDto{Description = "Gender"}
                };

            foreach (var item in measuretypes)
            {
                //MeasureType measuretype = new MeasureType();
                 //var measuretype = _mapper.Map<MeasureType>(item);
                Add(measuretypes);
            }

            
           
            //var message = _mapper.Map<Message>(messageForCreationDto);
           //string strResponse = await m_Singleton.CallMeasureTypes(measuretypesforcreation);

            var measures = new List<MeasureForCreationDto>
                {
                    new MeasureForCreationDto{Description = "Under 21", Weight = 6, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "21 - 30", Weight = 9, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "31 - 40", Weight = 10, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "41 - 50", Weight = 7, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "51 - 60", Weight = 6, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "61 - 70", Weight = 5, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "71 - 80", Weight = 4, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "81 - 90", Weight = 3, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "90 - 100", Weight = 2, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "Over 100", Weight = 1, MeasureTypeId = measuretypes[0].Id},
                    new MeasureForCreationDto{Description = "High School Diploma", Weight = 2, MeasureTypeId = measuretypes[1].Id},
                    new MeasureForCreationDto{Description = "Some College", Weight = 4, MeasureTypeId = measuretypes[1].Id},
                    new MeasureForCreationDto{Description = "Bachelors Degree", Weight = 6, MeasureTypeId = measuretypes[1].Id},
                    new MeasureForCreationDto{Description = "Masters Degree", Weight = 8, MeasureTypeId = measuretypes[1].Id},
                    new MeasureForCreationDto{Description = "Doctorate Degree", Weight = 10, MeasureTypeId = measuretypes[1].Id},
                    new MeasureForCreationDto{Description = "Under 20,000", Weight = 2, MeasureTypeId = measuretypes[2].Id},
                    new MeasureForCreationDto{Description = "20,000 - 49,999", Weight = 4, MeasureTypeId = measuretypes[2].Id},
                    new MeasureForCreationDto{Description = "50,000 - 99,999", Weight = 6, MeasureTypeId = measuretypes[2].Id},
                    new MeasureForCreationDto{Description = "100,000 - 499,999", Weight = 8, MeasureTypeId = measuretypes[2].Id},
                    new MeasureForCreationDto{Description = "500,000+", Weight = 10, MeasureTypeId = measuretypes[2].Id},
                    new MeasureForCreationDto{Description = "Poor Health", Weight = 1, MeasureTypeId = measuretypes[3].Id},
                    new MeasureForCreationDto{Description = "Ok Health", Weight = 5, MeasureTypeId = measuretypes[3].Id},
                    new MeasureForCreationDto{Description = "Great Health", Weight = 10, MeasureTypeId = measuretypes[3].Id},
                    new MeasureForCreationDto{Description = "Black", Weight = 1, MeasureTypeId = measuretypes[4].Id},
                    new MeasureForCreationDto{Description = "White", Weight = 10, MeasureTypeId = measuretypes[4].Id},
                    new MeasureForCreationDto{Description = "Alabama", Weight = 1, MeasureTypeId = measuretypes[5].Id},
                    new MeasureForCreationDto{Description = "New York", Weight = 10, MeasureTypeId = measuretypes[5].Id},
                    new MeasureForCreationDto{Description = "Poor Investments", Weight = 1, MeasureTypeId = measuretypes[6].Id},
                    new MeasureForCreationDto{Description = "Great Investments", Weight = 10, MeasureTypeId = measuretypes[6].Id},
                    new MeasureForCreationDto{Description = "Small Family", Weight = 2, MeasureTypeId = measuretypes[7].Id},
                    new MeasureForCreationDto{Description = "Large Family", Weight = 8, MeasureTypeId = measuretypes[7].Id},
                    new MeasureForCreationDto{Description = "Female", Weight = 2, MeasureTypeId = measuretypes[8].Id},
                    new MeasureForCreationDto{Description = "Male", Weight = 6, MeasureTypeId = measuretypes[8].Id},
                };

                foreach (var item in measures)
            {
               // Measure measure = new Measure();
                //var measure = _mapper.Map<Measure>(item);
                //Add(measure);
            }

            await SaveAll();

            return "Done";

            //strResponse = await m_Singleton.CallMeasures(measures);

        }
        
    }
}