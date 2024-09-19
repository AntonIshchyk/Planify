using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class LoginControllers : Controller
{
    readonly LoginService LS;

    public LoginControllers(LoginService loginservice)
    {
        LS = loginservice;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Admin admin)
    {
        Admin existingAdmin = await LS.AdminExists(admin)!;
        if (existingAdmin is null) return BadRequest("Admin not found");
        else
        {
            if (existingAdmin.LoggedIn)
            {
                return BadRequest("Admin is already online");
            }
            existingAdmin.LastLogIn = DateTime.Now;
            existingAdmin.LoggedIn = true;
            await LS.UpdateAdmin(existingAdmin);
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
        bool doesAdminExist = await LS.SaveAdmin(admin);
        if (doesAdminExist) return BadRequest("Admin is already registered");
        else return Ok("Admin registered");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] Admin admin)
    {
        var existingAdmin = await LS.AdminExists(admin);
        if (existingAdmin is null) return BadRequest("Admin not found");
        else
        {
            if (existingAdmin.LoggedIn)
            {
                existingAdmin.LastLogOut = DateTime.Now;
                existingAdmin.LoggedIn = false;
                await LS.UpdateAdmin(existingAdmin);
                return Ok($"See you later {existingAdmin.Username}!");
            }
            return BadRequest("Admin is already offline");
        }
    }

    [HttpDelete("delete-admin")]
    public async Task<IActionResult> DeleteAdmin([FromQuery] Guid Id)
    {
        bool doesExist = await LS.DeleteAdmin(Id);
        if (!doesExist) return BadRequest("Admin does not exist");
        return Ok("Admin is deleted");
    }

    [HttpGet("get-admin")]
    public async Task<IActionResult> GetAdmin([FromQuery] Guid Id)
    {
        Admin admin = await LS.GetAdmin(Id);
        if (admin == null) return BadRequest("Admin does not exist");
        return Ok(admin);
    }

    [HttpGet("get-all-admins")]
    public async Task<IActionResult> GetAllAdmin([FromQuery] Guid[] ids)
    {
        Admin[] admins = await LS.GetManyAdmins(ids);
        if (admins.Length <= 0) return BadRequest("There were no admins with one of these ids");
        return Ok(admins);
    }
}