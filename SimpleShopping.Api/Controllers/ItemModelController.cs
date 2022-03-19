using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Context;
using SimpleShopping.Context.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleShopping.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemModelController : ControllerBase
    {
        private readonly SimpleShoppingContext _context;

        public ItemModelController(SimpleShoppingContext context)
        {
            _context = context;
        }

        // GET: api/ItemModel
        [HttpGet]
        public IEnumerable<ItemModel> GetCategores()
        {
            return _context.ItemModel;
        }

        // GET api/ItemModel/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemModel(Guid id)
        {
            var itemModel = await _context.ItemModel.FindAsync(id);

            if (itemModel == null)
            {
                return NotFound();
            }

            return Ok(itemModel);
        }

        // POST api/ItemModel
        [HttpPost]
        public async Task PostItemModel([FromBody] ItemModel itemModel)
        {

            _context.ItemModel.Add(itemModel);
            await _context.SaveChangesAsync();
        }

        // PUT api/ItemModel/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemModel(Guid id, [FromBody] ItemModel itemModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(itemModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemModelExists(id))
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

        // DELETE api/ItemModel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemModel(Guid id)
        {
            var itemModel = await _context.ItemModel.FindAsync(id);
            if (itemModel == null)
            {
                return NotFound();
            }

            _context.ItemModel.Remove(itemModel);
            await _context.SaveChangesAsync();

            return Ok(itemModel);
        }

        private bool ItemModelExists(Guid id)
        {
            return _context.ItemModel.Any(e => e.Id == id);
        }
    }
}
