using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class User
    {
        public User()
        {
            this.Posts = new HashSet<Post>();
        }
        public User(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Posts = new HashSet<Post>();
        }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public ICollection<Post> Posts { get; set; }
        public string Token { get; set; }
    }
}