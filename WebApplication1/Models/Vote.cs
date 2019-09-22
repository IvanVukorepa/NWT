using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public enum VoteType
    {
        Upvote,
        Downvote
    };
    public class Vote
    {
        public int VoteId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public VoteType VoteType { get; set; }
    }
}
