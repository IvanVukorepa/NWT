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
        public Post CreatePost(Post post)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    context.Posts.Add(post);
                    context.SaveChanges();
                }
            }
            catch { return null; }

            return post;
        }

        public bool EditPost(Post post)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var postDb = context.Posts.FirstOrDefault(p => p.PostId == post.PostId);

                    postDb.Content = post.Content;

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

        public Post GetPostById(int id)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var post = context.Posts
                                .Include(p => p.Poster)
                                .Include(p => p.Votes)
                                    //.ThenInclude(v => v.)
                                .Include(p => p.Comments)
                                .FirstOrDefault(p => p.PostId == id);
                    return post;
                }
            }
            catch { return null; }
        }
    }
}
