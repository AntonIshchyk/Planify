using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class AdminControllers : Controller
{
    readonly AdminService AS;

    public AdminControllers(AdminService adminService)
    {
        AS = adminService;
    }

    [HttpDelete("delete-admin")]
    public async Task<IActionResult> DeleteAdmin([FromQuery] Guid Id)
    {
        bool doesExist = await AS.AdminExists(Id);

        if (!doesExist) return BadRequest("Admin does not exist");
        return Ok("Admin is deleted");
    }

    [HttpGet("get-admin")]
    public async Task<IActionResult> GetAdmin([FromQuery] Guid Id)
    {
        Admin admin = await AS.GetAdmin(Id);
        if (admin == null) return BadRequest("Admin does not exist");
        return Ok(admin);
    }

    [HttpGet("get-many-admins")]
    public async Task<IActionResult> GetManyAdmins([FromQuery] Guid[] ids)
    {
        Admin[] admins = await AS.GetManyAdmins(ids);
        if (admins.Length <= 0) return BadRequest("There were no admins with one of these ids");
        return Ok(admins);
    }

    [HttpGet("get-all-admins")]
    public async Task<IActionResult> GetAllAdmins()
    {
        List<Admin> admins = await AS.GetAllAdmin();
        return Ok(admins.ToArray());
    }
}