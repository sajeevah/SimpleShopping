using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Context;
using SimpleShopping.Context.Models;

namespace SimpleShopping.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakeController : ControllerBase
    {
        private readonly SimpleShoppingContext _context;

        public MakeController(SimpleShoppingContext context)
        {
            _context = context;
        }

        // GET: api/Make
        [HttpGet]
        public IEnumerable<Make> GetCategores()
        {
            return _context.Make;
        }

        // GET api/Make/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMake(Guid id)
        {
            var make = await _context.Make.FindAsync(id);

            if (make == null)
            {
                return NotFound();
            }

            return Ok(make);
        }

        // POST api/Make
        [HttpPost]
        public async Task PostMake([FromBody] Make make)
        {

            _context.Make.Add(make);
            await _context.SaveChangesAsync();
        }

        // PUT api/Make/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMake(Guid id, [FromBody] Make make)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != make.Id)
            {
                return BadRequest();
            }

            _context.Entry(make).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MakeExists(id))
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

        // DELETE api/Make/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMake(Guid id)
        {
            var make = await _context.Make.FindAsync(id);
            if (make == null)
            {
                return NotFound();
            }

            _context.Make.Remove(make);
            await _context.SaveChangesAsync();

            return Ok(make);
        }

        private bool MakeExists(Guid id)
        {
            return _context.Make.Any(e => e.Id == id);
        }
    }
}
