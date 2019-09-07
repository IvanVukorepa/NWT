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
    public class Data
    {
        public string Content;
        public User User;
    }
    public class PostController : Controller
    {
        private PostRepository _postRepository;

        public PostController()
        {
            _postRepository = new PostRepository();
        }

        [HttpPost]
        [Route("api/PostController/Create")]
        public IActionResult Create([FromBody]JObject data)
        {
            string content = data["content"].ToObject<string>();
            User user = data["poster"].ToObject<User>();

            Post post = new Post();
            post.Content = content;
            post.PosterId = user.UserId;
            /*Post post = new Post();
            post.Content = data.content;
            post.Poster.UserId = data.userId;*/
            return Ok(_postRepository.CreatePost(post));
        }

        [Route("api/PostController/getAllPosts")]
        [HttpGet]
        public IEnumerable<Post> GetAllPosts()
        {
            return _postRepository.GetAll();
        }
    }
}
