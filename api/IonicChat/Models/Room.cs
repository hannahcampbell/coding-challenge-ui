using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace SchedulicityChat.Models;

[Index(nameof(Name), IsUnique = true)]
public class Room {
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public DateTime Updated { get; set; }
}