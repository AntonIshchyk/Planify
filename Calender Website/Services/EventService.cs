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

    public async Task<bool> ApproveEvent(Guid eventId)
    {
        Event unapprovedevent = await EventAccess.Get(eventId);
        unapprovedevent.AdminApproval = true;
        await EventAccess.Update(unapprovedevent);
        return true;
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
        if (index == -1) return false;
        events[index] = e;
        AccessJson.WriteJsonList(events);
        return true;
    }

    public async Task<bool> DeleteEvent(Guid id) => await EventAccess.Remove(id);

    public async Task<bool> AddReview(EventAttendance review, Guid userId)
    {
        if (GetEvent(review.EventId) is null) return false;
        List<EventAttendance> reviews = await AccessJson.ReadJson<EventAttendance>();
        if (!reviews.Exists(x => x.EventId == review.EventId && x.UserId == userId))
        {
            review.Id = Guid.NewGuid();
            review.UserId = userId;
            reviews.Add(review);
        }
        else
        {
            reviews.First(x => x.EventId == review.EventId && x.UserId == userId).Rating = review.Rating;
            reviews.First(x => x.EventId == review.EventId && x.UserId == userId).Feedback = review.Feedback;
        }
        AccessJson.WriteJsonList(reviews);
        return true;
    }

    public async Task<List<EventAttendance>> GetReviewsFromEventId(Guid eventId)
    {
        List<EventAttendance> reviews = await EventAttendanceAccess.LoadAll();
        return reviews.FindAll(r => r.EventId == eventId).ToList();
    }

    public async Task<double> GetAverageRating(Guid eventId)
    {
        List<EventAttendance> reviews = await GetReviewsFromEventId(eventId);
        List<EventAttendance> filtered = reviews.Where(r => r.Rating > 0).ToList();
        if (filtered.Count == 0) return 0;
        return Math.Round(filtered.Average(x => x.Rating) * 2) / 2;

    }

    public async Task<List<Event>> GetAllAttendingEvents(string UserId)
    {
        List<EventAttendance> eventAttendances = await EventAttendanceAccess.LoadAll();
        List<Event> events = new();
        foreach (EventAttendance attendance in eventAttendances)
        {
            if (attendance.UserId.ToString() == UserId) events.Add(await EventAccess.Get(attendance.EventId));
        }
        return events;
    }

    public async Task<List<Event>> GetAllEvents() => await EventAccess.LoadAll();

    public async Task<List<EventAttendance>> GetAllReviews() => await EventAttendanceAccess.LoadAll();

    public async Task<Event[]> GetManyEvents(Guid[] ids) => await EventAccess.GetMany(ids);

    public async Task<EventAttendance[]> GetManyReviews(Guid[] ids) => await EventAttendanceAccess.GetMany(ids);
}