using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleShopping.Context.Context
{
    public class SimpleShoppingContext: DbContext
    {
        public SimpleShoppingContext(DbContextOptions<SimpleShoppingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Test> Test { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Make> Make { get; set; }
        public virtual DbSet<ItemModel> ItemModel { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<ItemImage> ItemImage { get; set; }

    }
}
