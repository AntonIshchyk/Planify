public class EventReview
{
    public Event Event { get; set; }
    public List<EventAttendance> Reviews { get; set; }

    public EventReview(Event @event, List<EventAttendance> reviews)
    {
        Event = @event;
        Reviews = reviews;
    }
}