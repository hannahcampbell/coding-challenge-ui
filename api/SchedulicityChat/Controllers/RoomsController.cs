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
    public class RoomsController : ControllerBase
    {
        private readonly SchedulicityChatContext _context;

        public RoomsController(SchedulicityChatContext context)
        {
            _context = context;
        }

        // GET: api/rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        // GET: api/room/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.FirstOrDefaultAsync(room => room.Id == id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        // GET: api/room/5/messages
        [HttpGet("{id}/messages")]
        public async Task<ActionResult<IEnumerable<MessageViewModel>>> GetMessages(int id)
        {
             return await _context.Messages.Where(message => message.RoomId == id)
            .Join(
                _context.Users,
                message => message.UserId,
                user => user.Id,
                (message, user) => new MessageViewModel()
                {
                    Id = message.Id,
                    UserId = user.Id,
                    RoomId = message.RoomId,
                    UserName = user.Name,
                    Content = message.Content,
                    Created = message.Created   
                }
            ).ToListAsync();
        }

        // POST: api/rooms
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            if(RoomExists(room.Name)) {
                return Conflict();
            }

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }

        private bool RoomExists(string name)
        {
            return _context.Rooms.Any(e => e.Name == name);
        }
    }
}
