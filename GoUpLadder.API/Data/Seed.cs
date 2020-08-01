using System.Collections.Generic;
using System.Linq;
using GoUpLadder.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace GoUpLadder.API.Data
{
    public class Seed
    {
        private static readonly IUpLadderRepository _repo;
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager, IUpLadderRepository repo)
        {
            //_repo = repo;
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create some roles

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "VIP"}
                };
                // create some measures

                var measuretypes = new List<MeasureType>
                {
                    new MeasureType{Description = "Age Range"},
                    new MeasureType{Description = "Income Range"},
                    new MeasureType{Description = "Education Level"},
                    new MeasureType{Description = "General Health"},
                    new MeasureType{Description = "Race/Ethnicity"},
                    new MeasureType{Description = "State"},
                    new MeasureType{Description = "Investments"},
                    new MeasureType{Description = "Family Size"},
                    new MeasureType{Description = "Gender"}
                };
                //var message = _mapper.Map<Message>(messageForCreationDto);

                _repo.Add(measuretypes);

                var measures = new List<Measure>
                {
                    new Measure{Description = "Under 21", Weight = 6, Type = measuretypes[0]},
                    new Measure{Description = "21 - 30", Weight = 9, Type = measuretypes[0]},
                    new Measure{Description = "31 - 40", Weight = 10, Type = measuretypes[0]},
                    new Measure{Description = "41 - 50", Weight = 7, Type = measuretypes[0]},
                    new Measure{Description = "51 - 60", Weight = 6, Type = measuretypes[0]},
                    new Measure{Description = "61 - 70", Weight = 5, Type = measuretypes[0]},
                    new Measure{Description = "71 - 80", Weight = 4, Type = measuretypes[0]},
                    new Measure{Description = "81 - 90", Weight = 3, Type = measuretypes[0]},
                    new Measure{Description = "90 - 100", Weight = 2, Type = measuretypes[0]},
                    new Measure{Description = "Over 100", Weight = 1, Type = measuretypes[0]},
                    new Measure{Description = "High School Diploma", Weight = 2, Type = measuretypes[1]},
                    new Measure{Description = "Some College", Weight = 4, Type = measuretypes[1]},
                    new Measure{Description = "Bachelors Degree", Weight = 6, Type = measuretypes[1]},
                    new Measure{Description = "Masters Degree", Weight = 8, Type = measuretypes[1]},
                    new Measure{Description = "Doctorate Degree", Weight = 10, Type = measuretypes[1]},
                    new Measure{Description = "Under 20,000", Weight = 2, Type = measuretypes[2]},
                    new Measure{Description = "20,000 - 49,999", Weight = 4, Type = measuretypes[2]},
                    new Measure{Description = "50,000 - 99,999", Weight = 6, Type = measuretypes[2]},
                    new Measure{Description = "100,000 - 499,999", Weight = 8, Type = measuretypes[2]},
                    new Measure{Description = "500,000+", Weight = 10, Type = measuretypes[2]},
                    new Measure{Description = "Poor Health", Weight = 1, Type = measuretypes[3]},
                    new Measure{Description = "Ok Health", Weight = 5, Type = measuretypes[3]},
                    new Measure{Description = "Great Health", Weight = 10, Type = measuretypes[3]},
                    new Measure{Description = "Black", Weight = 1, Type = measuretypes[4]},
                    new Measure{Description = "White", Weight = 10, Type = measuretypes[4]},
                    new Measure{Description = "Alabama", Weight = 1, Type = measuretypes[5]},
                    new Measure{Description = "New York", Weight = 10, Type = measuretypes[5]},
                    new Measure{Description = "Poor Investments", Weight = 1, Type = measuretypes[6]},
                    new Measure{Description = "Great Investments", Weight = 10, Type = measuretypes[6]},
                    new Measure{Description = "Small Family", Weight = 2, Type = measuretypes[7]},
                    new Measure{Description = "Large Family", Weight = 8, Type = measuretypes[7]},
                    new Measure{Description = "Female", Weight = 2, Type = measuretypes[8]},
                    new Measure{Description = "Male", Weight = 6, Type = measuretypes[8]},
                };
                _repo.Add(measures);

                _repo.SaveAll();

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
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

            }
        }
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