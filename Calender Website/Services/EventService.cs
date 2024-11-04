using System.Reflection.Metadata.Ecma335;

public class EventService
{
    public async Task<Event> GetEvent(Guid id) => await EventAccess.Get(id);

    public async Task<EventReview> GetEventReviews(Guid id)
    {
        List<Event> events = await AccessJson.ReadJson<Event>();
        if (events.Any(x => x.Id == id)) return new EventReview(await GetEvent(id), await GetReviewsFromEventId(id), await GetAverageRating(id));
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

    public async Task<bool> UpdateEvent(Event e, Guid id)
    {
        List<Event> events = await AccessJson.ReadJson<Event>();
        int index = events.FindIndex(searchEvent => searchEvent.Id.ToString() == id.ToString());
        if (index < 0) return false;
        events[index] = e;
        AccessJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> DeleteEvent(Guid id) => await EventAccess.Remove(id);

    public async Task<bool> AddReview(EventAttendance review, string userIdString)
    {
        if (GetEvent(Guid.Parse(review.EventId)) is null) return false;
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        if (!reviews.Exists(x => x.EventId == review.EventId && x.UserId == userIdString))
        {
            review.Id = Guid.NewGuid();
            review.UserId = userIdString;
            reviews.Add(review);
        }
        else
        {
            reviews.First(x => x.EventId == review.EventId && x.UserId == userIdString).Rating = review.Rating;
            reviews.First(x => x.EventId == review.EventId && x.UserId == userIdString).Feedback = review.Feedback;
        }
        AccessJson.WriteJsonList(reviews);
        return true;
    }

    public async Task<List<EventAttendance>> GetReviewsFromEventId(Guid eventId)
    {
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        return reviews.FindAll(r => Guid.Parse(r.EventId) == eventId).ToList();
    }

    public async Task<double> GetAverageRating(Guid eventId)
    {
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        List<EventAttendance> filtered = reviews.FindAll(x => Guid.Parse(x.EventId) == eventId).ToList();
        if (filtered.Count() == 0) return 0;
        return filtered.Average(x => x.Rating);
    }

    public async Task<List<Event>> GetAllEvents() => await EventAccess.LoadAll();

    public async Task<List<EventAttendance>> GetAllReviews() => await EventAttendanceAccess.LoadAll();

    public async Task<Event[]> GetManyEvents(Guid[] ids) => await EventAccess.GetMany(ids);

    public async Task<EventAttendance[]> GetManyReviews(Guid[] ids) => await EventAttendanceAccess.GetMany(ids);
}