using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace honey_inventory_mongdb.Models
{
    public class HoneyInventorySettings
    {
         public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string HoneyCollectionName { get; set; } = null!;
    }
}