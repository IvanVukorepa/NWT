using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.DAL;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.DAL
{
    public class SocialNetworkContext : DbContext
    {
        public SocialNetworkContext(DbContextOptions<SocialNetworkContext> options) : base(options)
        {
            /*
            if (!Database.Exists())
            {
                Database.SetInitializer(new Initializer());
                Database.Initialize(true);
            }*/
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string cn = @"Server=(localdb)\mssqllocaldb;Database=nwt;Trusted_Connection=True;ConnectRetryCount=0";
            optionsBuilder.UseSqlServer(cn);

            base.OnConfiguring(optionsBuilder);
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Vote> Votes { get; set; }
        /*
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();



            base.OnModelCreating(modelBuilder);
        }*/
    }
}