using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Context;
using SimpleShopping.Identity.Extensions;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

// Add services to the container.
builder.Services.AddDbContext<SimpleShoppingContext>(x => x.UseSqlServer(configuration.GetConnectionString("SimpleShoppingConnectionString")));

builder.Services.AddAuthServices(configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
