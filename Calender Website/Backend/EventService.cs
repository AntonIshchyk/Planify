using System.Text.Json;

public class EventService{
    string path = $"events.json";
    public async Task<List<Event>> ReadAllEvents(){
        return JsonSerializer.Deserialize<List<Event>>(await System.IO.File.ReadAllTextAsync(path));
    }
    public async Task<Event> GetEvent(Guid id){
        List<Event> events = await ReadAllEvents();
        return events.FirstOrDefault(e => e.Id == id);

    }
}