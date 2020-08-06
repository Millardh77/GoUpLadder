using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GoUpLadder.API.Dtos;
using GoUpLadder.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace GoUpLadder.API.Data
{
    public class Seed
    {
        private readonly IMapper _mapper;
          private readonly IUpLadderRepository _repo;
        public Seed(IUpLadderRepository repo, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }
        //private static readonly IUpLadderRepository _repo;
        private DataContext _context;
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            //_repo = repo;
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create some measures
                var measuretypes = new List<MeasureType>
                {
                    new MeasureType{Description = "Age Range", Id = 1},
                    new MeasureType{Description = "Education Level", Id = 2},
                    new MeasureType{Description = "Income Range", Id = 3},
                    new MeasureType{Description = "General Health", Id = 4},
                    new MeasureType{Description = "Race/Ethnicity", Id = 5},
                    new MeasureType{Description = "Investments", Id = 6},
                    new MeasureType{Description = "Family Size", Id = 7},
                    new MeasureType{Description = "State", Id = 8},
                    new MeasureType{Description = "Gender", Id = 9}
                };
        

            foreach (var item in measuretypes)
            {
                //MeasureType measuretype = new MeasureType();
                // var measuretype = _mapper.Map<MeasureType>(item);
                context.Add(item);
            }
           
            //var message = _mapper.Map<Message>(messageForCreationDto);
           //string strResponse = await m_Singleton.CallMeasureTypes(measuretypesforcreation);

            var measures = new List<Measure>
                {
                    new Measure{Description = "Under 21", Weight = 6, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "21 - 30", Weight = 9, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "31 - 40", Weight = 10, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "41 - 50", Weight = 7, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "51 - 60", Weight = 6, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "61 - 70", Weight = 5, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "71 - 80", Weight = 4, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "81 - 90", Weight = 3, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "90 - 100", Weight = 2, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "Over 100", Weight = 1, MeasureTypeId = measuretypes[0].Id},
                    new Measure{Description = "High School Diploma", Weight = 2, MeasureTypeId = measuretypes[1].Id},
                    new Measure{Description = "Some College", Weight = 4, MeasureTypeId = measuretypes[1].Id},
                    new Measure{Description = "Bachelors Degree", Weight = 6, MeasureTypeId = measuretypes[1].Id},
                    new Measure{Description = "Masters Degree", Weight = 8, MeasureTypeId = measuretypes[1].Id},
                    new Measure{Description = "Doctorate Degree", Weight = 10, MeasureTypeId = measuretypes[1].Id},
                    new Measure{Description = "Under 20,000", Weight = 2, MeasureTypeId = measuretypes[2].Id},
                    new Measure{Description = "20,000 - 49,999", Weight = 4, MeasureTypeId = measuretypes[2].Id},
                    new Measure{Description = "50,000 - 99,999", Weight = 6, MeasureTypeId = measuretypes[2].Id},
                    new Measure{Description = "100,000 - 499,999", Weight = 8, MeasureTypeId = measuretypes[2].Id},
                    new Measure{Description = "500,000+", Weight = 10, MeasureTypeId = measuretypes[2].Id},
                    new Measure{Description = "Poor Health", Weight = 1, MeasureTypeId = measuretypes[3].Id},
                    new Measure{Description = "Ok Health", Weight = 5, MeasureTypeId = measuretypes[3].Id},
                    new Measure{Description = "Great Health", Weight = 10, MeasureTypeId = measuretypes[3].Id},
                    new Measure{Description = "Black", Weight = 1, MeasureTypeId = measuretypes[4].Id},
                    new Measure{Description = "White", Weight = 10, MeasureTypeId = measuretypes[4].Id},
                   new Measure{Description = "Poor Investments", Weight = 1, MeasureTypeId = measuretypes[5].Id},
                    new Measure{Description = "Great Investments", Weight = 10, MeasureTypeId = measuretypes[5].Id},
                    new Measure{Description = "Small Family", Weight = 2, MeasureTypeId = measuretypes[6].Id},
                    new Measure{Description = "Large Family", Weight = 8, MeasureTypeId = measuretypes[6].Id},
                    new Measure{Description = "Alabama", Weight = 1, MeasureTypeId = measuretypes[7].Id},
                    new Measure{Description = "New York", Weight = 10, MeasureTypeId = measuretypes[7].Id},
                    new Measure{Description = "Female", Weight = 2, MeasureTypeId = measuretypes[8].Id},
                    new Measure{Description = "Male", Weight = 6, MeasureTypeId = measuretypes[8].Id},
                };

                foreach (var item in measures)
            {
               // Measure measure = new Measure();
                //var measure = _mapper.Map<Measure>(item);
                //Add(measure);
                context.Add(item);
            }

             context.SaveChangesAsync();

                // create some roles
                if (!roleManager.Roles.Any())
            {

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "VIP"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }
            }

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member");
                }

                // create admin user
                var adminUser = new User
                {
                    UserName = "Admin"
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
                }
               

                

            // return "Done";
            }
        }
       
        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        // private static Seed m_Singleton = new Seed(_mapper);
      

        // public async Task<string> CallMeasures(List<Measure> Measures)
        // {
        //     UpLadderRespository repo = new UpLadderRespository(context);
            
        //     await repo.SaveAll();
        //     return "Done";
        // }
        // public async Task<string> CallMeasureTypes(List<MeasureTypeForCreationDto> MeasureTypes)
        // {
        //     UpLadderRespository repo = new UpLadderRespository(context);
        //     foreach (var item in MeasureTypes)
        //     {
        //         MeasureType measuretype = new MeasureType();
        //         //measuretype = _mapper.Map<MeasureType>(item);
        //         repo.Add(item);
        //     }

        //     await repo.SaveAll();
        //     return "Done";
        // }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}