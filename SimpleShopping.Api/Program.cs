using Microsoft.EntityFrameworkCore;
using SimpleShopping.Context.Context;
using SimpleShopping.Identity.Extensions;
using SimpleShopping.Identity.Interfaces;

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

SeedDatabase();

app.Run();

async void SeedDatabase()
{
    using (var scope = app.Services.CreateScope())
    {
        var identitySeeder = scope.ServiceProvider.GetRequiredService<IIdentitySeeder>();
        await identitySeeder.SeedAsync();
    }
}
