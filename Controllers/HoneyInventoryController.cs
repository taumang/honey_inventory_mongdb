using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace honey_inventory_mongdb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class HoneyInventoryController : ControllerBase
    {
        private readonly HoneyInventoryServices _honeyInventoryServices;

        public HoneyInventoryController(HoneyInventoryServices honeyInventoryServices) =>
                _honeyInventoryServices = honeyInventoryServices;//

        [HttpGet]
        public async Task<List<HoneyInventory>> Get() =>
            await _honeyInventoryServices.GetAsync();

        [HttpGet("{id:Length(24)}")]
        public async Task<ActionResult<HoneyInventory>> Get(string id)
        {

            var honey = await _honeyInventoryServices.GetAsync(id);

            if (honey is null)
                return NotFound();

            return honey;

        }

        [HttpPost]
        public async Task<IActionResult> Post(HoneyInventory newHoney)
        {
            try
            {

                await _honeyInventoryServices.CreateAsync(newHoney);
                return CreatedAtAction(nameof(Get), new { id = newHoney.Id }, newHoney);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpPut("{id:Length(24)}")]
        public async Task<IActionResult> Update(string id, HoneyInventory updatedHoney)
        {
            var honey = await _honeyInventoryServices.GetAsync(id);

            if (honey is null)
                return NotFound();


            updatedHoney.Id = honey.Id;
            await _honeyInventoryServices.UpdateAsync(id, updatedHoney);

            return NoContent();
        }

        [HttpDelete("{id:Length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var honey = await _honeyInventoryServices.GetAsync(id);
            if (honey is null)
                return NotFound();

            await _honeyInventoryServices.RemoveAsync(id);
            return NoContent();
        }

    }


}