using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleShopping.Context.Models
{
    public class Test
    {
        [Key]
        public Guid Id { get; set; }
        public string? LastName { get; set; }
    }
}
