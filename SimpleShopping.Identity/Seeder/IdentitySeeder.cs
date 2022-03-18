using Microsoft.AspNetCore.Identity;
using SimpleShopping.Identity.Constants;
using SimpleShopping.Identity.Interfaces;

namespace SimpleShopping.Identity.Seeder
{
    public class IdentitySeeder : IIdentitySeeder
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentitySeeder(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await RegisterDefaultUsers();
            await AddAuthRoles();
        }

        private async Task AddAuthRoles()
        {
            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            }
            if (!await _roleManager.RoleExistsAsync(UserRoles.Buyer))
            {
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Buyer));
            }
            if (!await _roleManager.RoleExistsAsync(UserRoles.Seller))
            {
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Seller));
            }
        }

        private async Task RegisterDefaultUsers()
        {
            IdentityUser user = new()
            {
                Email = "admin@gmail.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "admin"
            };
            var result = await _userManager.CreateAsync(user, "Admin@123");
            if (result.Succeeded)
            {
                if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await _userManager.AddToRoleAsync(user, UserRoles.Admin);
                }
            }
        }
    }
}
