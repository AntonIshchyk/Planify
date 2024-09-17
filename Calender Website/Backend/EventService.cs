using System.Runtime.CompilerServices;
using System.Text.Json;

public class EventService
{
    string path = $"events.json";
    public async Task<Dictionary<Guid, Event>> ReadAllEvents() => JsonSerializer.Deserialize<Dictionary<Guid, Event>>(await File.ReadAllTextAsync(path))!;

    public async Task<Event> GetEvent(Guid id)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        return events[id];
    }
    public async Task<IResult> AppendEvent(Event e)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (events.ContainsKey(e.Id)) return Results.BadRequest("There already exists an event with this Id!");
        events.Add(e.Id, e);
        await WriteEvents(events);
        return Results.Ok("Success");
    }
    public async Task<IResult> UpdateEvent(Event e)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (!events.ContainsKey(e.Id)) return Results.BadRequest("There is no event with this Id!");
        events[e.Id] = e;
        await WriteEvents(events);
        return Results.Ok("Success");
    }
    public async Task WriteEvents(Dictionary<Guid, Event> events) => await File.WriteAllTextAsync(path, JsonSerializer.Serialize(events));

    public async Task<IResult> DeleteEvent(Guid id)
    {
        Dictionary<Guid, Event> events = await ReadAllEvents();
        if (!events.ContainsKey(id)) return Results.BadRequest("There is no event with this id!");
        events.Remove(id);
        await WriteEvents(events);
        return Results.Ok("Success!");
    }
}