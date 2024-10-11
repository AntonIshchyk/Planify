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
        return Ok($"Welcome {existingUser.FirstName + " " + existingUser.LastName}!");
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
    public async Task<IActionResult> Logout()
    {
        string sessionIdString = HttpContext.Session.GetString("UserId")!;
        Guid sessionId = Guid.Parse(sessionIdString);

        Admin admin = await AdminAccess.Get(sessionId);
        if (admin != null)
        {
            admin.LastLogOut = DateTime.Now;
            admin.LoggedIn = false;
            await AS.UpdateAdmin(admin);

            HttpContext.Session.Clear();
            return Ok($"See you later {admin.Username}!");
        }

        User user = await UserAccess.Get(sessionId);
        if (user != null)
        {
            HttpContext.Session.Clear();
            return Ok($"See you later {user.FirstName + " " + user.LastName}!");
        }
        return BadRequest("No data found");
    }
}