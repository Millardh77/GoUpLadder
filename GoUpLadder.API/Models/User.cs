using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace GoUpLadder.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string MidName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Zip4 { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string EducationLevel { get; set; }
        public string IncomeLevel { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public virtual ICollection<UserMeasure> UserMeasures { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}