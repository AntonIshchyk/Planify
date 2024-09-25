using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class SessionControllers : Controller
{
    readonly SessionService _sessionService;
    readonly AdminService _adminService;

    public SessionControllers(SessionService sessionService, AdminService adminService)
    {
        _sessionService = sessionService;
        _adminService = adminService;
    }

    [HttpDelete("delete-session")]
    public async Task<IActionResult> DeleteSession([FromQuery] Guid Id)
    {
        await _sessionService.DeleteSession(Id);

        bool exists = await _sessionService.SessionExists(Id);
        if (exists) return BadRequest("Session was not deleted");
        return Ok("Session was deleted");
    }

    [HttpGet("get-session-id")]
    public async Task<IActionResult> GetSession([FromQuery] Guid Id)
    {
        Session session = await _sessionService.GetSessionById(Id);
        if (session is not null)
        {
            Admin admin = await _adminService.GetAdmin(session.PersonId);
            return Ok($"{admin.LoggedIn} -> {admin.Username}");
        }
        return BadRequest("Session was not found");
    }

    [HttpGet("get-session")]
    public async Task<IActionResult> GetSession([FromBody] Session session) => await GetSession(session.Id);

    [HttpGet("get-all-sessions")]
    public async Task<IActionResult> GetAllSessions() => Ok(await _sessionService.GetAllSessions());
}