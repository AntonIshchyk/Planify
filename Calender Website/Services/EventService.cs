public class EventService
{
    public async Task<Event> GetEvent(Guid id) => await EventAccess.Get(id);

    public async Task<EventReview> GetEventReviews(Guid id)
    {
        List<Event> events = await AccessJson.ReadJson<Event>();
        if (events.Any(x => x.Id == id)) return new EventReview(await GetEvent(id), await GetReviewsFromEventId(id));
        return null!;
    }

    public async Task<bool> AppendEvent(Event e)
    {
        if (e is null) return false;
        List<Event> events = await AccessJson.ReadJson<Event>();
        if (events.Any(x => x.Id == e.Id && x.Title == e.Title)) return false;
        events.Add(e);
        AccessJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> UpdateEvent(Event e)
    {
        List<Event> events = await AccessJson.ReadJson<Event>();
        int index = events.FindIndex(searchEvent => searchEvent.Id == e.Id);
        if (index < 0) return false;
        events[index] = e;
        AccessJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> DeleteEvent(Guid id) => await EventAccess.Remove(id);

    public async Task<bool> AddReview(EventAttendance review)
    {
        if (GetEvent(review.EventId) is null) return false;
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        reviews.Add(review);
        AccessJson.WriteJsonList(reviews);
        return true;
    }

    public async Task<List<EventAttendance>> GetReviewsFromEventId(Guid eventId)
    {
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        return reviews.FindAll(r => r.EventId == eventId).ToList();
    }

    public async Task<List<Event>> GetAllEvents() => await EventAccess.LoadAll();

    public async Task<List<EventAttendance>> GetAllReviews() => await EventAttendanceAccess.LoadAll();

    public async Task<Event[]> GetManyEvents(Guid[] ids) => await EventAccess.GetMany(ids);

    public async Task<EventAttendance[]> GetManyReviews(Guid[] ids) => await EventAttendanceAccess.GetMany(ids);
}