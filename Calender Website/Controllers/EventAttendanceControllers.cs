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
        if (attendance is null) return BadRequest("Data not complete.");
        if (attendance.EventId == Guid.Empty) return BadRequest("This attendance cannot be added!");
        else
        {
            string userIdString = HttpContext.Session.GetString("UserId")!;
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid userId)) return BadRequest("User ID is invalid or not available in session.");
            attendance.UserId = userId;
            if (await EAS.TestExistence(attendance)) return BadRequest("You already attend this Event!");
            Event evt = await ES.GetEvent(attendance.EventId);
            if (!EAS.ValidateDate(evt)) return BadRequest("Because of the date of this event, you can no longer attend these.");
            attendance.Id = Guid.NewGuid();
            if (await EAS.AppendEventAttendance(attendance)) return Ok("You are now attending this Event!");
        }
        return BadRequest("Something went wrong.");
    }

    [HttpGet("IsAttending")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttending()
    {
        string UserId = HttpContext.Session.GetString("UserId")!;
        return Ok(await EAS.GetAttending(UserId));
    }

    [HttpGet("EventAttendance")]
    [LoggedInFilter]
    //the function of this endpoint is very unclear in the description. An endpoint with filter is given below this endpoint.
    public async Task<IActionResult> GetAttendance() => Ok(await AccessJson.ReadJson<EventAttendance>());

    [HttpGet("EventAttendanceofEvent")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendancesOnEvent([FromQuery] Guid Id)
    {
        //the function of this endpoint is very unclear in the description. For now I do not use any filter.
        List<EventAttendance> eventAttendances = await AccessJson.ReadJson<EventAttendance>();
        return Ok(eventAttendances.FindAll(x => x.EventId == Id).ToList());
    }

    [HttpGet("get-attending-events")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendingEvents()
    {
        List<Event> events = await ES.GetAllAttendingEvents(HttpContext.Session.GetString("UserId")!);
        return Ok(events);
    }

    [HttpDelete("delete-event-attendance")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteEventAttendance([FromQuery] Guid eventId)
    {
        if (eventId == Guid.Empty) return BadRequest("Event with the given id can not be deleted.");
        string userIdString = HttpContext.Session.GetString("UserId")!;
        if (await EAS.DeleteEventAttendance(eventId, Guid.Parse(userIdString))) return Ok("EventAttendance deleted successfully");
        return BadRequest("Could not find EventAttendance");
    }

    [HttpGet("list-of-attendees")]
    [AdminFilter]
    public async Task<IActionResult> GetListOfAttendeesOnEvent([FromQuery] Guid eventId)
    {
        if (eventId == Guid.Empty) return BadRequest("This id is not reliable.");
        Event foundEvent = await ES.GetEvent(eventId);
        if (foundEvent is null) return BadRequest("Event not found.");
        List<object> usersAndAdmins = await EAS.GetListOfAttendees(eventId);
        if (usersAndAdmins.Count <= 0) return BadRequest("There are no attendees.");
        return Ok(usersAndAdmins);
    }
}