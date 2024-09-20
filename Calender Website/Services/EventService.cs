using System.Text.Json;

public class EventService
{
    string path = $"./Data/Events.json";
    string path_reviews = $"./Data/Reviews.json";
    public async Task<Dictionary<Guid, Event>> ReadAllEvents(){
        try{
        return JsonSerializer.Deserialize<Dictionary<Guid, Event>>(await File.ReadAllTextAsync(path))!;
        }
        catch{
            return new();
        }
    }

    public async Task<Dictionary<Guid, List<EventAttendance>>> ReadAllReviews() => JsonSerializer.Deserialize<Dictionary<Guid, List<EventAttendance>>>(await File.ReadAllTextAsync(path_reviews))!;
    public async Task<Event> GetEvent(Guid id)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if(events.ContainsKey(id)) return events[id];
        return null;
    }
    public async Task<IResult> AppendEvent(Event e)
    {
        if (e == null)
        {
        return Results.BadRequest("Event cannot be null.");
        }

        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (events.ContainsKey(e.Id)) return Results.BadRequest("There already exists an event with this Id!");
        events.Add(e.Id, e);
        return await WriteEvents(events);
    }
    public async Task<IResult> UpdateEvent(Event e)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (!events.ContainsKey(e.Id)) return Results.BadRequest("There is no event with this Id!");
        events[e.Id] = e;
        await WriteEvents(events);
        return Results.Ok("Success");
    }
    public async Task<IResult> WriteEvents(Dictionary<Guid, Event> events){
        try{
        await File.WriteAllTextAsync(path, JsonSerializer.Serialize(events));
        return Results.Ok();
        }
        catch{
            return Results.BadRequest("File not found");
        }
    }

     public async Task<IResult> WriteReviews(Dictionary<Guid, List<EventAttendance>> reviews){
        try{
        await File.WriteAllTextAsync(path_reviews, JsonSerializer.Serialize(reviews));
        return Results.Ok();
        }
        catch{
            return Results.BadRequest("File not found");
        }
    }
    

    public async Task<IResult> DeleteEvent(Guid id)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (!events.ContainsKey(id)) return Results.BadRequest("There is no event with this id!");
        events.Remove(id);
        await WriteEvents(events);
        return Results.Ok("Success!");
    }
    public async Task<IResult> AddReview(EventAttendance review){
        if(GetEvent(review.EventId) is null) return Results.BadRequest("Event doesn't exist!");
        Dictionary<Guid, List<EventAttendance>> reviews = await ReadAllReviews();
        if(reviews.ContainsKey(review.EventId)) reviews[review.EventId].Add(review);
        else reviews[review.EventId] = new List<EventAttendance>(){review};
        await WriteReviews(reviews);
        return Results.Created();
    }

    public async Task<List<EventAttendance>> GetReviews(Guid id){
        Dictionary<Guid, List<EventAttendance>> reviews = await ReadAllReviews();
        if(!reviews.ContainsKey(id)) return new();
        return reviews[id];
    }
}