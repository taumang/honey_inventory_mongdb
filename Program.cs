global using MongoDB.Bson;
global using MongoDB.Bson.Serialization.Attributes;
global using honey_inventory_mongdb.Models;
global using MongoDB.Driver;
global using Microsoft.Extensions.Options;
global using honey_inventory_mongdb.Services;
global using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<HoneyInventorySettings>(
    builder.Configuration.GetSection("HoneyInventoryDatabase"));

builder.Services.AddControllers()
        .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null
        );
builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowAllOrigins",
        builder => {
            builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
        });
});
        
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<HoneyInventoryServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });

app.Run();
