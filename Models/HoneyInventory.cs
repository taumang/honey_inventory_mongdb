using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace honey_inventory_mongdb.Models
{
    public class HoneyInventory
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    [JsonPropertyName("Name")]
    public string Honey_Name { get; set; } = null!;
    public string Honey_Color { get; set; } = null!;

    public decimal Honey_Price  { get; set; }

    public string Honey_Size { get; set; } = null!;
    public int Number_of_Bottles { get; set; }
    // Auto-generates the Id characters for the ID 
    //  public HoneyInventory()
    // {
    //     Id = GenerateId();
    // }

    // private string GenerateId()
    // {
    //     const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    //     var random = new Random();
    //     var builder = new StringBuilder(24);

    //     for (int i = 0; i < 24; i++)
    //     {
    //         builder.Append(chars[random.Next(chars.Length)]);
    //     }

    //     return builder.ToString();
    // }

    }
}