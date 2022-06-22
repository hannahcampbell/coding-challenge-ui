using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SchedulicityChat.Models;

public class Message {
    [Key]
    public int Id { get; set; }

    [ForeignKey("FK_Room")]
    public int RoomId { get; set; }

    [ForeignKey("FK_User")]
    public int UserId { get; set; }

    public string Content { get; set; }

    public DateTime Created { get; set; }
}

public class MessageViewModel: Message {
    public string UserName { get; set; }
}