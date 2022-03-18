using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleShopping.Context.Models
{
    public class ItemImage
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ItemId { get; set; }

        [Required]
        public string? Url { get; set; }

        [ForeignKey("ItemId")]
        public virtual Item? Item { get; set; }

    }
}
