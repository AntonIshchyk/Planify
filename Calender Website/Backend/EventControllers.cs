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

    [HttpPost]
    public async Task<IResult> PostEvent([FromBody] Event e){
        return await eventService.AppendEvent(e);
    }
    [HttpPut]
    public async Task<IResult> UpdateEvent([FromBody] Event e){
        return await eventService.UpdateEvent(e);
    }
    [HttpDelete]
    public async Task<IResult> DeleteEvent([FromQuery] Guid id){
        return await eventService.DeleteEvent(id);
    }
    
}