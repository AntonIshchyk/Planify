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
        if (attendance.UserId == Guid.Empty.ToString() && attendance.EventId == Guid.Empty.ToString()) return BadRequest("This attendance cannot be added!");
        else
        {
            if (await EAS.TestExistence(attendance)) return BadRequest("You already attend this Event!");
            Event evt = await ES.GetEvent(Guid.Parse(attendance.EventId));
            if (!EAS.ValidateDate(evt)) return BadRequest("Because of the date of this event, you can no longer attend these.");
            attendance.Id = Guid.NewGuid();
            if (await EAS.AppendEventAttendance(attendance, evt)) return Ok(evt);
        }
        return BadRequest("Something went wrong. ");
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
        if (await EAS.DeleteEventAttendance(Id, Guid.Parse(userIdString))) return Ok("EventAttendance deleted successfully");
        return BadRequest("Could not find EventAttendance");
    }

    [HttpGet("list-of-attendees")]
    [LoggedInFilter]
    public async Task<IActionResult> GetListOfAttendeesOnEvent([FromQuery] Guid eventId)
    {
        if (eventId == Guid.Empty) return BadRequest("This id is not reliable. ");
        Event foundEvent = await ES.GetEvent(eventId);
        if (foundEvent is null) return BadRequest("Event not found. ");
        List<object> usersAndAdmins = await EAS.GetListOfAttendees(eventId);
        if (usersAndAdmins.Count <= 0) return BadRequest("There are no attendees. ");
        return Ok(usersAndAdmins.ToArray());
    }
}