/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.DAL
{
    public class Initializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<SocialNetworkContext>
    {
        protected override void Seed(SocialNetworkContext context)
        {
            var users = new List<User>
            {
                new User{ FirstName= "Ante", LastName= "Antić" },
                new User{ FirstName= "Mate", LastName= "Matić" },
                new User{ FirstName= "Ivica", LastName= "Ivić" }
            };

            users.ForEach(u => context.Users.Add(u));
            context.SaveChanges();

            var posts = new List<Post>
            {
                new Post{ Content= "title", Poster = users[0] }
            };

            posts.ForEach(c => context.Posts.Add(c));
            context.SaveChanges();

            var comments = new List<Comment>
            {
                new Comment{ Content="Prva poruka", User = users[1]}
            };

            comments.ForEach(m => context.Comments.Add(m));
            context.SaveChanges();
        }
    }
}*/