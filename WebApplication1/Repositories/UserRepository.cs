using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.DAL;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class UserRepository
    {
        public bool AddUser(User user)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                }
            } catch { return false; }

            return true;
        }

        public User Authenticate(string userName, string password)
        {
            User user;
            using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
            {
                user = context.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
            }
            if (user == null)
                return null;

            // authentication successful, generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("symetricKeyForNWTProject");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public User GetUserById(int id)
        {    
            User user;
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    user = context.Users.FirstOrDefault(u => u.UserId == id);
                }
            } catch { return null; }

            return user;
        }

        public bool CheckUsername(string userName)
        {
            try
            {
                using (var context = new SocialNetworkContext(new DbContextOptions<SocialNetworkContext>()))
                {
                    if (context.Users.FirstOrDefault(u => u.UserName == userName) == null)
                        return false;
                    return true;
                }
            }
            catch { return true; }
        }
    }
}
