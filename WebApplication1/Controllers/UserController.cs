using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{

    public class UserController : Controller
    {
        private UserRepository _userRepository;
        public UserController()
        {
            _userRepository = new UserRepository();
        }

        [HttpPost]
        [Route("api/UserController/signUp")]
        public IActionResult SignUp(User user)
        {
            return Ok(_userRepository.AddUser(user));
        }

        [HttpPost]
        [Route("api/UserController/logIn")]
        public IActionResult LogIn(User user)
        {
            return Ok(_userRepository.Authenticate(user.LastName, user.Password));
        }

        [HttpGet]
        [Route("api/UserController/getUser")]
        public IActionResult GetUser(int id)
        {
            return Ok(_userRepository.GetUserById(id));
        }
    }
}
