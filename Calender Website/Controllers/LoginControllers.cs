using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class LoginControllers : Controller
{
    readonly AdminService AS;
    readonly UserService US;

    public LoginControllers(AdminService adminService, UserService userService)
    {
        AS = adminService;
        US = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] JsonElement obj)
    {

        //only the admin has an UserName. In this way we test if it is an admin. 
        if (obj.TryGetProperty("Username", out _))
        {

            var admin = JsonSerializer.Deserialize<Admin>(obj.ToString());
            if (admin != null && !string.IsNullOrEmpty(admin.Username))
            {
                Admin existingAdmin = await AS.GetAdminByLogIn(admin);
                if (existingAdmin == null) return BadRequest("Admin not found");
                if (existingAdmin.LoggedIn) return BadRequest("Admin is already online");
                existingAdmin.LastLogIn = DateTime.Now;
                existingAdmin.LoggedIn = true;
                HttpContext.Session.SetString("UserId", existingAdmin.Id.ToString());
                HttpContext.Session.SetInt32("IsAdmin", 1);
                await AS.UpdateAdmin(existingAdmin);

                return Ok($"Welcome {existingAdmin.Username}!");

            }
        }

        //Only a user has FirstName. The code below is for the User.
        if (obj.TryGetProperty("Email", out _))
        {

            var user = JsonSerializer.Deserialize<User>(obj.ToString());
            if (user != null && !string.IsNullOrEmpty(user.FirstName))
            {
                User existingUser = await US.GetUser(user);
                if (existingUser is null) return BadRequest("User not found");
                HttpContext.Session.SetString("UserId", existingUser.Id.ToString());

                return Ok($"Welcome {user.FirstName + " " + user.LastName}!");
            }
        }

        //If it cannot convert rightly to an Admin or User, we get a badrequest
        return BadRequest("No User or Admin Found!");
    }

    [HttpPost("register-admin")]
    [LoggedInFilter]
    public async Task<IActionResult> Register([FromBody] Admin admin)
    {
        if (admin is null) return BadRequest("This is not an admin. ");
        if (admin.Username == "Unknown" || admin.Email == "None" || admin.Password == "None") return BadRequest("Data is not complete");
        // don`t trust id`s from abroad, so...
        // create a new id, for safety reasons
        admin.Id = Guid.NewGuid();
        bool IsAdminWritenToJson = await AS.SaveAdmin(admin);
        if (!IsAdminWritenToJson) return BadRequest("Admin is already registered");
        else return Ok("Admin registered");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        if (user is null) return BadRequest("This is not a user.");
        if (user.Email == "None" || user.FirstName == "None" || user.LastName == "None" || user.Password == "None") return BadRequest("Data is not complete.");

        user.Id = Guid.NewGuid();
        bool IsUserWritenToJson = await US.SaveUser(user);
        if (!IsUserWritenToJson) return BadRequest("User already exists");
        else return Ok("User registered");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] JsonElement obj)
    {
        if (obj.TryGetProperty("Username", out _))
        {
            var admin = JsonSerializer.Deserialize<Admin>(obj.ToString());
            var existingAdmin = await AS.GetAdminByLogIn(admin!);
            if (existingAdmin is null) return BadRequest("Admin not found");
            if (existingAdmin.Id.ToString() != HttpContext.Session.GetString("UserId")) return BadRequest("This Admin is not Logged in on this Session!");
            else
            {
                existingAdmin.LastLogOut = DateTime.Now;
                existingAdmin.LoggedIn = false;
                await AS.UpdateAdmin(existingAdmin);

                HttpContext.Session.Clear();

                return Ok($"See you later {existingAdmin.Username}!");

            }
        }
        if (obj.TryGetProperty("Email", out _))
        {
            var user = JsonSerializer.Deserialize<User>(obj.ToString());
            var existingUser = await US.GetUser(user!);
            if (existingUser is null) return BadRequest("User not found");
            if (existingUser.Id.ToString() != HttpContext.Session.GetString("UserId")) return BadRequest("This User is not Logged in on this Session!");

            HttpContext.Session.Clear();

            return Ok($"See you later {existingUser.FirstName + " " + existingUser.LastName}!");
        }
        return BadRequest("Json is not either Admin or User!");
    }
}