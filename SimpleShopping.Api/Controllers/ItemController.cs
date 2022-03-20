using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Context;
using SimpleShopping.Context.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleShopping.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly SimpleShoppingContext _context;

        public ItemController(SimpleShoppingContext context)
        {
            _context = context;
        }

        // GET: api/Item
        [HttpGet]
        public async Task<IActionResult> GetCategores()
        {
            var items = await _context.Item
                .Include(c => c.Category)
                .Include(m => m.ItemModel)
                .Include(ma => ma.Make)
                .Include(i => i.ItemImages)
                .ToArrayAsync();


            return Ok(items);
        }

        // GET api/Item/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            var item = await _context.Item
                .Include(c => c.Category)
                .Include(m => m.ItemModel)
                .Include(ma => ma.Make)
                .Include(i => i.ItemImages)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // GET api/Item/seller/5
        [HttpGet("seller/{id}")]
        [Authorize(Roles = "Seller", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetSellerItems(string id)
        {
            var items = await _context.Item.Where(x => x.SellerId == id)
                .Include(c => c.Category)
                .Include(m => m.ItemModel)
                .Include(ma => ma.Make)
                .Include(i => i.ItemImages)
                .ToListAsync();

            return Ok(items);
        }

        // POST api/Item
        [HttpPost]
        [Authorize(Roles = "Seller", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task PostItem([FromBody] Item item)
        {

            _context.Item.Add(item);
            await _context.SaveChangesAsync();
        }

        // PUT api/Item/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Seller", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutItem(Guid id, [FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/Item/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Seller", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var item = await _context.Item.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Item.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        private bool ItemExists(Guid id)
        {
            return _context.Item.Any(e => e.Id == id);
        }
    }
}
