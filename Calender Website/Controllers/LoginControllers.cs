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
    public async Task<IActionResult> Login([FromBody] Admin admin)
    {
        Admin existingAdmin = await AS.AdminExists(admin);
        if (existingAdmin is null) return BadRequest("Admin not found");
        else
        {
            if (existingAdmin.LoggedIn) return BadRequest("Admin is already online");

            existingAdmin.LastLogIn = DateTime.Now;
            existingAdmin.LoggedIn = true;
            HttpContext.Session.SetString("UserId", admin.Id.ToString());
            await AS.UpdateAdmin(existingAdmin);

            return Ok($"Welcome {existingAdmin.Username}!");
        }
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
        bool doesAdminExist = await AS.SaveAdmin(admin);
        if (doesAdminExist) return BadRequest("Admin is already registered");
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
    public async Task<IActionResult> Logout([FromBody] Admin admin)
    {
        if (admin.Id.ToString() != HttpContext.Session.GetString("UserId")) return BadRequest("This Admin is not Logged in on this Session!");
        var existingAdmin = await AS.AdminExists(admin);
        if (existingAdmin is null) return BadRequest("Admin not found");
        else
        {
            existingAdmin.LastLogOut = DateTime.Now;
            existingAdmin.LoggedIn = false;
            await AS.UpdateAdmin(existingAdmin);

            HttpContext.Session.Clear();

            return Ok($"See you later {existingAdmin.Username}!");

        }
    }
}