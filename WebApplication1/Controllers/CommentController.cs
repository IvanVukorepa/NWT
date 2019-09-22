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
    public class CommentController : Controller
    {
        private CommentRepository _commentRepository;
        public CommentController()
        {
            _commentRepository = new CommentRepository();
        }

        [HttpPost]
        [Route("api/CommentController/Create")]
        public IActionResult CreateComment([FromBody]JObject data)
        {
            string content = data["comment"].ToObject<string>();
            int postId = data["postId"].ToObject<int>();
            int userId = data["userId"].ToObject<int>();

            Comment comment = new Comment(content, postId, userId);

            return Ok(_commentRepository.AddComment(comment));
        }

        [HttpGet]
        [Route("api/CommentController/getComments")]
        public IActionResult getCommentsForPost(int postId)
        {
            return Ok(_commentRepository.getCommentsForPost(postId));
        }
    }
}
