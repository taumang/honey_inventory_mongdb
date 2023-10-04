using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace honey_inventory_mongdb.Models
{
    public class HoneyInventory
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    public string Honey_Name { get; set; } = null!;
    public string Honey_Color { get; set; } = null!;

    public decimal Honey_Price  { get; set; }

    public string Honey_Size { get; set; } = null!;
    public int Number_of_Bottles { get; set; }
    }
}