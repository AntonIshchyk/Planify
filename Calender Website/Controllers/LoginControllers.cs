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
        if (HttpContext.Session.GetString("UserId") != null) return BadRequest("You are already logged in on this session!");
        if (HttpContext.Session.GetString("UserId") == existingAdmin.Id.ToString()) return BadRequest("Admin is already online");
        existingAdmin.LastLogIn = DateTime.Now;
        HttpContext.Session.SetString("UserId", existingAdmin.Id.ToString());
        HttpContext.Session.SetInt32("IsAdmin", 1);
        await AS.UpdateAdmin(existingAdmin);
        return Ok($"Welcome {existingAdmin.Username}!");
    }

    [HttpPost("login-user")]
    public async Task<IActionResult> LoginUser([FromBody] User user)
    {
        try
        {
            User existingUser = await US.GetUser(user);
            if (existingUser is null) return BadRequest("User not found");
            if (HttpContext.Session.GetString("UserId") != null) return BadRequest("You are already logged in on this session!");
            if (HttpContext.Session.GetString("UserId") == existingUser.Id.ToString()) return BadRequest("User is already logged in. ");
            HttpContext.Session.SetString("UserId", existingUser.Id.ToString());
            return Ok($"Welcome {existingUser.FirstName + " " + existingUser.LastName}!");
        }
        catch
        {
            return BadRequest("Error in Code.");
        }
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

        if (!await AS.SaveAdmin(admin)) return BadRequest("Invalid Data");
        return Ok("Admin registered");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        if (user is null) return BadRequest("This is not a user.");
        if (user.Email == "None" || user.FirstName == "None" || user.LastName == "None" || user.Password == "None") return BadRequest("Data is not complete.");

        user.Id = Guid.NewGuid();
        bool IsUserWritenToJson = await US.SaveUser(user);
        if (!IsUserWritenToJson) return BadRequest("Invalid Data");
        HttpContext.Session.SetString("UserId", user.Id.ToString());
        return Ok("User registered");
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
    [HttpGet("check-admin")]
    public IActionResult CheckAdmin()
    {
        var isAdmin = HttpContext.Session.GetInt32("IsAdmin");
        if (isAdmin == 1)
        {
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpGet("check-logged-in")]
    public IActionResult CheckLoggedIn()
    {
        var UserId = HttpContext.Session.GetString("UserId");
        if (UserId != null)
        {
            return Ok(true);
        }
        return Ok(false);
    }

    [HttpGet("get-session-id")]
    public IActionResult GetSessionId()
    {
        var UserId = HttpContext.Session.GetString("UserId");
        return Ok(UserId);
    }
}