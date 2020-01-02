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
                    post.CreationTime = DateTime.Now;
                    context.Posts.Add(post);
                    context.SaveChanges();
                }
            }
            catch { return null; }

            return post;
        }

        public bool EditPost(int postId, string content)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var post = context.Posts.FirstOrDefault(p => p.PostId == postId);

                    post.Content = content;

                    context.SaveChanges();
                }
            }
            catch { return false; }

            return true;
        }

        public bool DeletePost(int postId)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var post = context.Posts.FirstOrDefault(p => p.PostId == postId);
                    context.Posts.Remove(post);
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
                    var posts = context.Posts.Include(p => p.Poster).ToList();
                    return posts;
                }
            }
            catch { return null; }
        }

        public List<Post> GetFiltered(string filter)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var posts = context.Posts.Include(p => p.Poster).Where(p => p.Content.Contains(filter)).ToList();
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
