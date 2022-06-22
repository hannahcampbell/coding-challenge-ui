using SchedulicityChat.Models;
using Microsoft.EntityFrameworkCore;

namespace SchedulicityChat;

public class SchedulicityChatContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Message> Messages { get; set; }

    public SchedulicityChatContext (DbContextOptions<SchedulicityChatContext> options): base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Room>().HasData(
            new Room {
                Id = 1, 
                Name = "general", 
                Updated = DateTime.Now.ToUniversalTime() 
            }
        );
    }
}
