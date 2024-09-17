using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website/Login")]
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
    public async Task<IActionResult> Register([FromBody] Admin admin)
    {
        if (admin.Username == "Unknown" || admin.Email == "None" || admin.Password == "None")
        {
            return BadRequest("Data is not complete");
        }
        // don`t trust id`s from abroad, so...
        // create a new id, for safety reasons
        if (admin.Username == "Unknown" || admin.Password == "None" || admin.Email == "None") return BadRequest("Admin can not be made. Give a username, password and email");
        admin.Id = Guid.NewGuid();
        bool doesAdminExist = await LS.SaveAdmin(admin);
        if (!doesAdminExist) return BadRequest("Admin is already registered");
        else return Ok("Admin registered");
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