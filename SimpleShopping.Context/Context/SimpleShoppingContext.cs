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

    }
}
