using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class EventController : Controller
{
    EventService eventService;
    public EventController(EventService eventservice)
    {
        eventService = eventservice;
    }

    [HttpGet("event")]
    public async Task<IActionResult> GetEvent([FromQuery] Guid id)
    {
        EventReview eventReview = await eventService.GetEventReviews(id);
        if (eventReview is null) return NotFound("Review could not be found. ");
        return Ok(eventReview);
    }

    // to do
    // [HttpGet("event-friends")]
    // public async Task<IActionResult> GetFriendsParticipatingEvent([FromQuery] Guid id)
    // {
    //     EventReview eventReview = await eventService.GetEventReviews(id);
    //     if (eventReview is null) return NotFound("Review could not be found. ");
    //     return Ok(eventReview);
    // }

    [HttpGet("get-all-events")]
    public async Task<IActionResult> GetAllEvents() => Ok(await eventService.GetAllEvents());

    [HttpPost("review")]
    public async Task<IActionResult> AddReview([FromBody] EventAttendance review)
    {
        if (await eventService.AddReview(review)) return Accepted("Review added. ");
        return BadRequest("Review could not be added. ");
    }

    [HttpGet("review")]
    public async Task<IActionResult> GetReview([FromQuery] Guid id) => Ok(await eventService.GetReviewsFromEventId(id));

    public async Task<IActionResult> GetAllReviews() => Ok(await GetAllReviews());

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
    public async Task<IActionResult> UpdateEvent([FromBody] Event e)
    {
        if (await eventService.UpdateEvent(e)) return Accepted("Event updated. ");
        return NotFound("Event could not be found. ");
    }

    [HttpDelete("delete-event")]
    [AdminFilter]
    public async Task<IActionResult> DeleteEvent([FromQuery] Guid id)
    {
        if (await eventService.DeleteEvent(id)) return Accepted("Event deleted. ");
        return BadRequest("Event not found. ");
    }
}