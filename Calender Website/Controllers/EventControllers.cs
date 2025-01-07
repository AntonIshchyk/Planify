using System.Globalization;
using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class EventController : Controller
{
    EventService eventService;
    EventAttendanceService eventAttendanceService;
    public EventController(EventService eventservice, EventAttendanceService eAS)
    {
        eventService = eventservice;
        eventAttendanceService = eAS;
    }

    [HttpGet("event")]
    public async Task<IActionResult> GetEvent([FromQuery] Guid id)
    {
        EventReview eventReview = await eventService.GetEventReviews(id);
        if (eventReview is null) return BadRequest("Review could not be found. ");
        return Ok(eventReview);
    }


    [HttpGet("event-friends")]
    [LoggedInFilter]
    public async Task<IActionResult> GetFriendsParticipatingEvent([FromQuery] Guid eventId)
    {
        string userIdString = HttpContext.Session.GetString("UserId")!;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid userId)) return BadRequest("User ID is invalid or not available in session.");

        List<object> attendees = await eventAttendanceService.GetListOfAttendees(eventId);
        List<User> friends = [];
        // Since friends can be users only
        foreach (object attendee in attendees) if (attendee is User user) if (user.Friends.Contains(userId)) friends.Add(user);
        return Ok(friends);
    }

    [HttpGet("get-all-events")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAllEvents()
    {
        List<Event> events = await eventService.GetAllEvents();
        return Ok(events);
    }


    [HttpPost("review")]
    [LoggedInFilter]
    public async Task<IActionResult> AddReview([FromBody] EventAttendance review)
    {
        string userIdString = HttpContext.Session.GetString("UserId")!;
        if (await eventService.AddReview(review, Guid.Parse(userIdString))) return Ok("Review added.");
        return BadRequest("Review could not be added. ");
    }

    [HttpGet("review")]
    public async Task<IActionResult> GetReviewsOfEvent([FromQuery] Guid id) => Ok(await eventService.GetReviewsFromEventId(id));

    public async Task<IActionResult> GetAllReviews() => Ok(await eventService.GetAllReviews());

    [HttpPost("create-event")]
    [AdminFilter]
    public async Task<IActionResult> PostEvent([FromBody] Event e)
    {
        if (e is null || e.Description == "None" || e.Title == "None" || e.Location == "None") return BadRequest("There is not enough info to make an event. ");
        e.Id = Guid.NewGuid();
        if (DateTime.Parse(e.EndTime) < DateTime.Parse(e.StartTime)) return BadRequest("End time cannot be earlier then start time. ");
        if (await eventService.AppendEvent(e)) return Ok("Event created. ");
        return BadRequest("Something went wrong");
    }

    [HttpPut("update-event")]
    [AdminFilter]
    public async Task<IActionResult> UpdateEvent([FromBody] Event e, [FromQuery] Guid Id)
    {
        e.Id = Id;
        if (await eventService.UpdateEvent(e)) return Ok("Event updated.");
        return BadRequest("Event could not be found.");
    }

    [HttpDelete("delete-event")]
    [AdminFilter]
    public async Task<IActionResult> DeleteEvent([FromQuery] Guid id)
    {
        if (await eventService.DeleteEvent(id)) return Ok("Event deleted.");
        return BadRequest("Event not found. ");
    }
}