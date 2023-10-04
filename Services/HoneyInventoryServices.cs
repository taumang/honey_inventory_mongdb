using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace honey_inventory_mongdb.Services
{
    public class HoneyInventoryServices
    {
        private readonly IMongoCollection<HoneyInventory> _honeyCollection;

         public HoneyInventoryServices(
        IOptions<HoneyInventorySettings> honeyInventorySettings)
    {
        var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bookStoreDatabaseSettings.Value.DatabaseName);

        _booksCollection = mongoDatabase.GetCollection<Book>(
            bookStoreDatabaseSettings.Value.BooksCollectionName);
    }
    }
}