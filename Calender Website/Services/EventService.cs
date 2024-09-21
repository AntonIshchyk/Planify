using System.Text.Json;

public class EventService
{
    public async Task<Event> GetEvent(Guid id)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if(events.Any(x => x.Id == id)) return events.Find(x => x.Id == id);
        return null;
    }
    public async Task<IResult> AppendEvent(Event e)
    {
        if (e == null)
        {
        return Results.BadRequest("Event cannot be null.");
        }

        List<Event> events = await AccesJson.ReadJson<Event>();
        if (events.Any(x => x.Id == e.Id)) return Results.BadRequest("There already exists an event with this Id!");
        events.Add(e);
        AccesJson.WriteJsonList<Event>(events);
        return Results.Accepted();
    }
    public async Task<IResult> UpdateEvent(Event e)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (!events.Any(x => x.Id == e.Id)) return Results.BadRequest("There is no event with this Id!");
        events[events.FindIndex(e => e == events.Find(x => x.Id == e.Id))] = e;
        AccesJson.WriteJsonList<Event>(events);
        return Results.Ok("Success");
    }
    

    public async Task<IResult> DeleteEvent(Guid id)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (!events.Any(e => e.Id == id)) return Results.BadRequest("There is no event with this id!");
        events.Remove(events.First(e => e.Id == id));
        AccesJson.WriteJsonList<Event>(events);
        return Results.Ok("Success!");
    }
    public async Task<IResult> AddReview(EventAttendance review){
        if(GetEvent(review.EventId) is null) return Results.BadRequest("Event doesn't exist!");
        List<EventAttendance> reviews = await AccesJson.ReadJson<EventAttendance>();
        reviews.Add(review);
        AccesJson.WriteJsonList<EventAttendance>(reviews);
        return Results.Created();
    }

    public async Task<List<EventAttendance>> GetReviews(Guid eventId){
        List<EventAttendance> reviews = await AccesJson.ReadJson<EventAttendance>();
        if(!reviews.Any(r => r.EventId == eventId)) return new();
        return reviews.FindAll(r => r.EventId == eventId).ToList();
    }
}