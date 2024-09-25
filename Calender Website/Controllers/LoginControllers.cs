using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class LoginControllers : Controller
{
    readonly AdminService AS;
    readonly SessionService _sessionService;

    public LoginControllers(AdminService adminService, SessionService sessionService)
    {
        AS = adminService;
        _sessionService = sessionService;
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

            Session session = new(existingAdmin.Id);

            await _sessionService.CreateSession(session);
            await AS.UpdateAdmin(existingAdmin);

            return Ok($"Welcome {existingAdmin.Username}!");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Admin admin)
    {
        if (admin.Username == "Unknown" || admin.Email == "None" || admin.Password == "None") return BadRequest("Data is not complete");
        // don`t trust id`s from abroad, so...
        // create a new id, for safety reasons
        admin.Id = Guid.NewGuid();
        bool doesAdminExist = await AS.SaveAdmin(admin);
        if (doesAdminExist) return BadRequest("Admin is already registered");
        else return Ok("Admin registered");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] Admin admin)
    {
        Admin existingAdmin = await AS.AdminExists(admin);
        if (existingAdmin is null) return BadRequest("Admin not found");
        else
        {
            Session session = await _sessionService.GetSessionByPersonId(existingAdmin.Id);
            if (session == null || !session.LoggedIn) return BadRequest("Admin is already offline");
            existingAdmin.LastLogOut = DateTime.Now;
            session.LogOutDate = DateTime.Now;

            existingAdmin.LoggedIn = false;
            session.LoggedIn = false;

            await AS.UpdateAdmin(existingAdmin);
            await _sessionService.UpdateSession(session);

            return Ok($"See you later {existingAdmin.Username}!");

        }
    }
}