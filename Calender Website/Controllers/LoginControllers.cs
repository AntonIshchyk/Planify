using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website/")]
public class LoginControllers : Controller
{
    readonly LoginService LS;

    public LoginControllers(LoginService loginservice)
    {
        LS = loginservice;
    }

    [HttpPost("login")]
    public IResult Login([FromBody] Admin admin)
    {
        var existingAdmin = LS.AdminExists(admin);
        if (existingAdmin is null) return Results.BadRequest("Admin not found");
        else
        {
            if (existingAdmin.LoggedIn)
            {
                return Results.BadRequest("Admin is already online");
            }
            existingAdmin.LastLogIn = DateTime.Now;
            existingAdmin.LoggedIn = true;
            return Results.Ok($"Welcome {existingAdmin.Username}!");
        }
    }

    [HttpGet("IsRegistered")]
    public IActionResult IsRegistered()
    {
        bool registered = LS.IsRegistered();
        return Ok(new IsRegisteredResponse(registered, LS.GetCurrentAdmin().Username));
    }

    [HttpPost("register")]
    public IResult Register([FromBody] Admin admin)
    {
        var existingAdmin = LS.AdminExists(admin);
        if (existingAdmin is not null) return Results.BadRequest("This Admin already exists");
        // create a new id, for safety reasons
        admin.Id = Guid.NewGuid();
        MemoryDB.Admins.Add(admin);
        return Results.Ok($"Admin registered {admin.Username}, {admin.Id}, {admin.Password}");
    }

    [HttpPost("logout")]
    public IResult Logout([FromBody] Admin admin)
    {
        var existingAdmin = LS.AdminExists(admin);
        if (existingAdmin is null) return Results.BadRequest("Admin not found");
        else
        {
            if (existingAdmin.LoggedIn)
            {
                existingAdmin.LastLogOut = DateTime.Now;
                existingAdmin.LoggedIn = false;
                return Results.Ok($"See you later {existingAdmin.Username}!");
            }
            return Results.BadRequest("Admin is already offline");
        }
    }
}