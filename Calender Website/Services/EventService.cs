public class EventService
{
    public async Task<Event> GetEvent(Guid id)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (events.Any(x => x.Id == id)) return events.Find(x => x.Id == id)!;
        return null!;
    }

    public async Task<EventReview> GetEventReviews(Guid id)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (events.Any(x => x.Id == id)) return new EventReview(await GetEvent(id), await GetReviews(id));
        return null!;
    }

    public async Task<bool> AppendEvent(Event e)
    {
        if (e == null) return false;

        List<Event> events = await AccesJson.ReadJson<Event>();
        if (events.Any(x => x.Id == e.Id)) return false;
        events.Add(e);
        AccesJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> UpdateEvent(Event e)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (!events.Any(x => x.Id == e.Id)) return false;
        events[events.FindIndex(e => e == events.Find(x => x.Id == e.Id))] = e;
        AccesJson.WriteJsonList(events);
        return true;
    }


    public async Task<bool> DeleteEvent(Guid id)
    {
        List<Event> events = await AccesJson.ReadJson<Event>();
        if (!events.Any(e => e.Id == id)) return false;
        events.Remove(events.First(e => e.Id == id));
        AccesJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> AddReview(EventAttendance review)
    {
        if (GetEvent(review.EventId) is null) return false;
        List<EventAttendance> reviews = await AccesJson.ReadJson<EventAttendance>();
        reviews.Add(review);
        AccesJson.WriteJsonList(reviews);
        return true;
    }

    public async Task<List<EventAttendance>> GetReviews(Guid eventId)
    {
        List<EventAttendance> reviews = await AccesJson.ReadJson<EventAttendance>();
        if (!reviews.Any(r => r.EventId == eventId)) return [];
        return reviews.FindAll(r => r.EventId == eventId).ToList();
    }
}