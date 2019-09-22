using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Votes = new HashSet<Vote>();
        }
        public int PostId { get; set; }
        public User Poster { get; set; }
        public int PosterId { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public string Content { get; set; }
        public ICollection<Vote> Votes { get; set; }

    }
}
