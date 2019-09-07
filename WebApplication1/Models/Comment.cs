using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Comment
    {
        public Comment()
        {

        }
        public Comment(string content, int postId, int userId)
        {
            Content = content;
            PostId = postId;
            UserId = userId;
        }

        public int CommentId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
    }
}
