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
            honeyInventorySettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            honeyInventorySettings.Value.DatabaseName);

        _honeyCollection = mongoDatabase.GetCollection<HoneyInventory>(
            honeyInventorySettings.Value.HoneyCollectionName);
    }
    public async Task<List<HoneyInventory>> GetAsync() =>
        await _honeyCollection.Find(_ => true).ToListAsync();

    public async Task<HoneyInventory?> GetAsync(string id) =>
        await _honeyCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(HoneyInventory newHoney) =>
        await _honeyCollection.InsertOneAsync(newHoney);

    public async Task UpdateAsync(string id, HoneyInventory updatedHoney) =>
        await _honeyCollection.ReplaceOneAsync(x => x.Id == id, updatedHoney);

    public async Task RemoveAsync(string id) =>
        await _honeyCollection.DeleteOneAsync(x => x.Id == id);
}
}