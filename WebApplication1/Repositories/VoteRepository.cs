using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.DAL;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class VoteRepository
    {
        public bool AddVote(Vote vote)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    context.Votes.Add(vote);
                    context.SaveChanges();
                }
            } catch { return false; }
            return true;
        }

        public bool EditVote(int userId, int postId, VoteType voteType)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    var vote = context.Votes.FirstOrDefault(v => v.PostId == postId && v.UserId == userId);
                    vote.VoteType = voteType;
                    context.SaveChanges();
                }
            }
            catch { return false; }
            return true;
        }
    }
}
