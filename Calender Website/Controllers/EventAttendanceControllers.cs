using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class EventAttendanceControllers : Controller
{
    EventAttendanceService EAS;
    EventService ES;
    public EventAttendanceControllers(EventAttendanceService eas, EventService es)
    {
        EAS = eas;
        ES = es;
    }

    [HttpPost("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> CreateAttendance([FromBody] EventAttendance attendance)
    {
        if (attendance is null) return BadRequest("Data not complete. ");
        if (attendance.UserId.ToString() != "00000000-0000-0000-0000-000000000000" && attendance.EventId.ToString() != "00000000-0000-0000-0000-000000000000")
        {
            if (await EAS.TestExistence(attendance)) return BadRequest("You already attend this Event!");
            Event evt = await ES.GetEvent(Guid.Parse(attendance.EventId));
            if (!await EAS.ValidateDate(evt)) return BadRequest("Because of the date of this event, you can no longer attend these.");
            if (await EAS.AppendEventAttendance(attendance, evt)) return Ok(evt);
        }
        return BadRequest("This attendance cannot be added!");
    }

    [HttpGet("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendance()
    {
        //the function of this endpoint is very unclear in the description. An endpoint with filter is given below this endpoint.
        List<EventAttendance> eventAttendances = await AccessJson.ReadJson<EventAttendance>();
        return Ok(eventAttendances);
    }

    [HttpGet("EventAttendanceofEvent")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendancesOnEvent([FromQuery] Guid Id)
    {
        //the function of this endpoint is very unclear in the description. For now I do not use any filter.
        List<EventAttendance> eventAttendances = await AccessJson.ReadJson<EventAttendance>();
        List<EventAttendance> foundEventAttendances = eventAttendances.FindAll(x => Guid.Parse(x.EventId) == Id).ToList();
        return Ok(foundEventAttendances);
    }

    [HttpDelete("delete-event-attendance")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteEventAttendance([FromQuery] Guid Id)
    {
        string userIdString = HttpContext.Session.GetString("UserId")!;
        if (await EAS.DeleteEventAttendance(Id, userIdString)) return Ok("EventAttendance deleted successfully");
        return BadRequest("Could not find EventAttendance");
    }
}