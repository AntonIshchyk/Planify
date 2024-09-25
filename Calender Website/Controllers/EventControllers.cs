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
        if (eventReview is null) return BadRequest();
        return Ok(eventReview);
    }

    [HttpGet("get-all-events")]
    public async Task<IActionResult> GetAllEvents() => Ok(await eventService.GetAllEvents());

    [HttpPost("review")]
    public async Task<IActionResult> AddReview([FromBody] EventAttendance review)
    {
        if (await eventService.AddReview(review)) return Accepted();
        return BadRequest();
    }

    [HttpGet("review")]
    public async Task<IActionResult> GetReview([FromQuery] Guid id) => Ok(await eventService.GetReviewsFromEventId(id));

    public async Task<IActionResult> GetAllReviews() => Ok(await GetAllReviews());

    [HttpPost("create-event")]
    [LoggedInFilter]
    public async Task<IActionResult> PostEvent([FromBody] Event e)
    {
        if (e is null || e.Description == "None" || e.Title == "None" || e.Location == "None") return BadRequest("There is not enough info to make an event");
        e.Id = Guid.NewGuid();
        if (await eventService.AppendEvent(e)) return Created();
        return BadRequest("Something went wrong");
    }

    [HttpPut("update-event")]
    [LoggedInFilter]
    public async Task<IActionResult> UpdateEvent([FromBody] Event e)
    {
        if (await eventService.UpdateEvent(e)) return Accepted();
        return BadRequest();
    }

    [HttpDelete("delete-event")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteEvent([FromQuery] Guid id)
    {
        if (await eventService.DeleteEvent(id)) return Accepted();
        return BadRequest();
    }
}