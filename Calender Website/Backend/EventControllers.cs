using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

[Microsoft.AspNetCore.Components.Route("api/events")]
public class EventController : Controller{

    EventService eventService;
    public EventController(EventService eventservice){
        eventService = eventservice;
    }
    [HttpGet()]
    public async Task<IResult> GetEvent([FromQuery] Guid id){
        return Results.Ok(GetEvent(id));
    }
    
}