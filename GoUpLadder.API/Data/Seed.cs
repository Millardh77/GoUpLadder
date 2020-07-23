using System.Collections.Generic;
using System.Linq;
using GoUpLadder.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace GoUpLadder.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
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

                var measures = new List<Measure>
                {
                    new Measure{Description = "Race", Weight = 1},
                    new Measure{Description = "Income", Weight = 2},
                    new Measure{Description = "Investments", Weight = 3},
                    new Measure{Description = "Family Size", Weight = 4}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach ( var user in users )
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
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
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