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
    public async Task<IResult> GetEvent([FromQuery] Guid id)
    {
        EventReview eventReview = await eventService.GetEventReviews(id);
        if (eventReview is null) return Results.BadRequest();
        return Results.Ok(eventReview);
    }

    [HttpPost("review")]
    public async Task<IResult> AddReview([FromBody] EventAttendance review)
    {
        if (await eventService.AddReview(review)) return Results.Accepted();
        return Results.BadRequest();
    }

    [HttpGet("review")]
    public async Task<IResult> GetReviews([FromQuery] Guid id) => Results.Ok(await eventService.GetReviews(id));

    [HttpPost("create-event")]
    [LoggedInFilter]
    public async Task<IResult> PostEvent([FromBody] Event e)
    {
        if (await eventService.AppendEvent(e)) return Results.Accepted();
        return Results.BadRequest();
    }

    [HttpPut("update-event")]
    [LoggedInFilter]
    public async Task<IResult> UpdateEvent([FromBody] Event e)
    {
        if (await eventService.UpdateEvent(e)) return Results.Accepted();
        return Results.BadRequest();
    }

    [HttpDelete("delete-event")]
    [LoggedInFilter]
    public async Task<IResult> DeleteEvent([FromQuery] Guid id)
    {
        if (await eventService.DeleteEvent(id)) return Results.Accepted();
        return Results.BadRequest();
    }
}