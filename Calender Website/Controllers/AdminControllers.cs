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
    [AdminFilter]
    public async Task<IActionResult> DeleteAdmin([FromQuery] Guid Id)
    {
        bool doesExist = await AS.DoesAdminExist(Id);
        if (!doesExist) return BadRequest("Admin does not exist");
        return Ok("Admin is deleted");
    }

    [HttpGet("get-admin")]
    [AdminFilter]
    public async Task<IActionResult> GetAdmin([FromQuery] Guid Id)
    {
        Admin admin = await AS.GetAdmin(Id);
        if (admin == null) return BadRequest("Admin does not exist");
        return Ok(admin);
    }

    [HttpGet("get-many-admins")]
    [AdminFilter]
    public async Task<IActionResult> GetManyAdmins([FromQuery] Guid[] ids)
    {
        Admin[] admins = await AS.GetManyAdmins(ids);
        if (admins.Length <= 0) return BadRequest("There were no admins with one of these ids");
        return Ok(admins);
    }

    [HttpGet("get-all-admins")]
    [AdminFilter]
    public async Task<IActionResult> GetAllAdmins() => Ok(await AS.GetAllAdmin());

    [HttpPut("update-admin")]
    [AdminFilter]
    public async Task<IActionResult> UpdateAdmin([FromBody] Admin admin)
    {
        bool updatedAdmin = await AS.UpdateAdmin(admin);
        if (!updatedAdmin) return BadRequest("Admin was not found");
        return Ok("Admin has been updated");
    }
}