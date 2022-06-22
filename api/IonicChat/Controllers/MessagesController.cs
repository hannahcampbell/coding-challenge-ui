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
    public class MessagesController : ControllerBase
    {
        private readonly SchedulicityChatContext _context;

        public MessagesController(SchedulicityChatContext context)
        {
            _context = context;
        }

        // GET: api/messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(msg => msg.Id == id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }


        // POST: api/messages
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            message.Created = DateTime.Now.ToUniversalTime();
            _context.Messages.Add(message);
            
            var room = new Room { Id = message.RoomId, Updated = message.Created };
            _context.Rooms.Attach(room).Property(x => x.Updated).IsModified = true;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }
    }
}
