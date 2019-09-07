using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.DAL;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PostRepository
    {
        public bool CreatePost(Post post)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    context.Posts.Add(post);
                    //var user = context.Users.FirstOrDefault(u => u.UserId == post.PosterId);
                    //user.Posts.Add(post);
                    context.SaveChanges();
                }
            }
            catch { return false; }

            return true;
        }

        public List<Post> GetAll()
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var posts = context.Posts.ToList<Post>();
                    return posts;
                }
            }
            catch { return null; }
        }
    }
}
