using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class EventAttendanceControllers : Controller
{
    EventAttendanceService EAS;
    EventService ES;
    public EventAttendanceControllers(EventAttendanceService eas, EventService es){
        EAS = eas;
        ES = es;
    }

    [HttpPost("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> CreateAttendance([FromBody] JsonElement obj){
        if(obj.TryGetProperty("UserId", out _) && obj.TryGetProperty("EventId", out _)){
            var attendance = JsonSerializer.Deserialize<EventAttendance>(obj.ToString());
            if(!await EAS.TestExistence(attendance)) return BadRequest("You already attend this Event!");
            Event evt = await ES.GetEvent(attendance.EventId);  
            if(!await EAS.TestDate(evt)) return BadRequest("Because of the date of this event, you can no longer attend these.");
            if(await EAS.AppendEventAttendance(attendance, evt)) return Ok(evt);
        }
        return BadRequest("This attendance cannot be added!");
    }

    [HttpGet("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendance(){
        //the function of this endpoint is very unclear in the description. An endpoint with filter is given below this endpoint.
        List<EventAttendance> eal = await AccessJson.ReadJson<EventAttendance>();
        return Ok(eal);
    }

    [HttpGet("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAttendanceOnEvent([FromQuery] Guid Id){
        //the function of this endpoint is very unclear in the description. For now I do not use any filter.
        List<EventAttendance> eal = await AccessJson.ReadJson<EventAttendance>();
        List<EventAttendance> ealf = eal.FindAll(x => x.EventId == Id).ToList();
        return Ok(ealf);
    }

    [HttpDelete("EventAttendance")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteEventAttendance([FromQuery] Guid Id){
        var userIdString = HttpContext.Session.GetString("UserId");
        if(await EAS.DeleteEventAttendance(Id, userIdString)) return Ok("EventAttendance deleted successfully");
        return BadRequest("Could not find EventAttendance");
    }
}