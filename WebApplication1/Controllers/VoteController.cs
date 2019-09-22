using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    public class VoteController : Controller
    {
        private VoteRepository _voteRepository;
        public VoteController()
        {
            _voteRepository = new VoteRepository();
        }

        [HttpPost]
        [Route("api/VoteController/add")]
        public IActionResult AddVote([FromBody]JObject data)
        {
            int UserId = data["userId"].ToObject<int>();
            int PostId = data["postId"].ToObject<int>();
            VoteType voteType = data["vote"].ToObject<VoteType>();

            Vote vote = new Vote();
            vote.UserId = UserId;
            vote.PostId = PostId;
            vote.VoteType = voteType;
            return Ok(_voteRepository.AddVote(vote));
        }

        [HttpPost]
        [Route("api/VoteController/edit")]
        public IActionResult EditVote([FromBody]JObject data)
        {
            int userId = data["userId"].ToObject<int>();
            int postId = data["postId"].ToObject<int>();
            VoteType voteType = data["vote"].ToObject<VoteType>();

            return Ok(_voteRepository.EditVote(userId, postId, voteType));
        }
    }
}
