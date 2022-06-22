using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulicityChat;
using SchedulicityChat.Models;

namespace SchedulicityChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SchedulicityChatContext _context;

        public UsersController(SchedulicityChatContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/users/dale
        [HttpGet("{name}")]
        public async Task<ActionResult<User>> GetUser(string name)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Name == name);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // if the user exists already, just return the the existing user (normally would return a 409 Conflict)
            if(!UserExists(user.Name)) {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { name = user.Name }, user);
            } else {
                var existing = await _context.Users.FirstOrDefaultAsync(u => u.Name == user.Name);
                return existing;
            }   
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string name)
        {
            return _context.Users.Any(e => e.Name == name);
        }
    }
}
