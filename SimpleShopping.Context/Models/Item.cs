using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleShopping.Context.Models
{
    public class Item
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string? Description { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public Guid ItemModelId { get; set; }

        [Required]
        public Guid MakeId { get; set; }

        [Required]
        public string? SellerId { get; set; }

        public string? ImageUrl { get; set; }
        public int Quantity { get; set; }

        public virtual ICollection<ItemImage>? ItemImages { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }
        
        [ForeignKey("ItemModelId")]
        public virtual ItemModel? ItemModel { get; set; }

        [ForeignKey("MakeId")]
        public virtual Make? Make { get; set; }
    }
}
