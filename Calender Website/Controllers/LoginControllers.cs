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

    [HttpPost("login-admin")]
    public async Task<IActionResult> LoginAdmin([FromBody] Admin admin)
    {
        Admin existingAdmin = await AS.GetAdminByLogIn(admin);
        if (existingAdmin is null) return BadRequest("Admin not found");
        if (existingAdmin.LoggedIn) return BadRequest("Admin is already online");
        existingAdmin.LastLogIn = DateTime.Now;
        existingAdmin.LoggedIn = true;
        HttpContext.Session.SetString("UserId", existingAdmin.Id.ToString());
        HttpContext.Session.SetInt32("IsAdmin", 1);
        await AS.UpdateAdmin(existingAdmin);

        return Ok($"Welcome {existingAdmin.Username}!");
    }

    [HttpPost("login-user")]
    public async Task<IActionResult> LoginUser([FromBody] User user)
    {
        User existingUser = await US.GetUser(user);
        if (existingUser is null) return BadRequest("User not found");
        if (HttpContext.Session.GetString("UserId") == existingUser.Id.ToString()) return BadRequest("User is already logged in. ");

        HttpContext.Session.SetString("UserId", existingUser.Id.ToString());
        return Ok($"Welcome {user.FirstName + " " + user.LastName}!");
    }

    [HttpPost("register-admin")]
    [AdminFilter]
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
    [LoggedInFilter]
    public async Task<IActionResult> Logout([FromQuery] Guid Id)
    {
        List<Admin> admins = await AccessJson.ReadJson<Admin>();
        Admin existingAdmin = admins.FirstOrDefault(a => a.Id == Id)!;

        List<User> users = await AccessJson.ReadJson<User>();
        User existingUser = users.FirstOrDefault(u => u.Id == Id)!;

        if (existingAdmin is null && existingUser is null) return BadRequest("Nobody has the given id. ");

        if (existingAdmin is not null && existingAdmin.Id.ToString() != HttpContext.Session.GetString("UserId")) return BadRequest("Admin is not logged in on this session! ");

        if (existingUser is not null && existingUser.Id.ToString() != HttpContext.Session.GetString("UserId"))
        {
            Console.WriteLine($"Given id: {Id}");
            Console.WriteLine($"Logged in user id: {existingUser.Id}");
            Console.WriteLine($"session id in use: {HttpContext.Session.GetString("UserId")}");
            return BadRequest("User is not logged in on this session! ");
        }

        if (existingAdmin is not null)
        {
            existingAdmin.LastLogOut = DateTime.Now;
            existingAdmin.LoggedIn = false;
            await AS.UpdateAdmin(existingAdmin);

            HttpContext.Session.Clear();
            return Ok($"See you later {existingAdmin.Username}!");
        }
        else if (existingUser is not null)
        {
            Console.WriteLine($"Given id: {Id}");
            Console.WriteLine($"Logged in user id: {existingUser.Id}");
            Console.WriteLine($"session id in use: {HttpContext.Session.GetString("UserId")}");
            HttpContext.Session.Clear();
            return Ok($"See you later {existingUser.FirstName + " " + existingUser.LastName}!");
        }
        else return BadRequest();
    }
}