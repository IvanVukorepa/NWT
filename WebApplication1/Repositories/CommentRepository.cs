using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.DAL;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class CommentRepository
    {
        public bool AddComment(Comment comment)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    context.Comments.Add(comment);
                    context.SaveChanges();
                }
            }
            catch { return false; }
            return true;
        }

        public IEnumerable<Comment> getCommentsForPost(int postId)
        {
            List<Comment> comments;
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    comments = context.Comments.Include(c => c.User).Where(c => c.PostId == postId).ToList<Comment>();
                }
            }
            catch { return null; }

            return comments;
        }
    }
}
