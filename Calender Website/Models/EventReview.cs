public class EventReview
{
    public Event Event { get; set; }
    public List<EventAttendance> Reviews { get; set; }

    public double AverageRating{get;set;}

    public EventReview(Event @event, List<EventAttendance> reviews, double averageRating)
    {
        Event = @event;
        Reviews = reviews;
        AverageRating = averageRating;
    }
}