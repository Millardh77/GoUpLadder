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
        public Seed(IUpLadderRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
             
            //_repo = repo;
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

           

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
                    await userManager.AddToRoleAsync(user, "Member");
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
                    await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
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