using Microsoft.AspNetCore.Mvc;

[Microsoft.AspNetCore.Components.Route("api/events")]
public class EventController : Controller
{
    EventService eventService;
    public EventController(EventService eventservice)
    {
        eventService = eventservice;
    }
    [HttpGet()]
    public async Task<IResult> GetEvent([FromQuery] Guid id) => Results.Ok((await eventService.GetEvent(id), await eventService.GetReviews(id)));

    [HttpPost("review")]
    public async Task<IResult> AddReview([FromBody] EventAttendance review) => await eventService.AddReview(review);

    public async Task<IResult> GetReviews([FromQuery] Guid id) => Results.Ok(await eventService.GetReviews(id));

//The following controllers ONLY work if an admin is logged in on this pc. This is what the [LoggedInFilter] means.
    [LoggedInFilter]
    [HttpPost()]
    public async Task<IResult> PostEvent([FromBody] Event e) => await eventService.AppendEvent(e);

    [LoggedInFilter]
    [HttpPut]
    public async Task<IResult> UpdateEvent([FromBody] Event e) => await eventService.UpdateEvent(e);

    [LoggedInFilter]
    [HttpDelete]
    public async Task<IResult> DeleteEvent([FromQuery] Guid id) => await eventService.DeleteEvent(id);
}