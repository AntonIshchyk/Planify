using Microsoft.AspNetCore.Mvc;

[Microsoft.AspNetCore.Mvc.Route("Calender-Website/events")]
public class EventController : Controller
{
    EventService eventService;
    public EventController(EventService eventservice)
    { 
        eventService = eventservice;
    }
    [HttpGet]
    public async Task<IResult> GetEvent([FromQuery] Guid id) => Results.Ok(await eventService.GetEvent(id));

    [HttpPost("review")]
    public async Task<IResult> AddReview([FromBody] EventAttendance review) => await eventService.AddReview(review);

    [HttpGet("review")]
    public async Task<IResult> GetReviews([FromQuery] Guid id) => Results.Ok(await eventService.GetReviews(id));

    [HttpPost]
    public async Task<IResult> PostEvent([FromBody] Event e) => await eventService.AppendEvent(e);

    [HttpPut]
    public async Task<IResult> UpdateEvent([FromBody] Event e) => await eventService.UpdateEvent(e);

    [HttpDelete]
    public async Task<IResult> DeleteEvent([FromQuery] Guid id) => await eventService.DeleteEvent(id);
}