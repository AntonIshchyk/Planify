public class EventAttendance : IHasId
{
    public Guid Id { get; set; }
    private Guid _userId;
    public string UserId
    {
        get
        {
            return _userId.ToString();
        }
        set
        {
            Guid.TryParse(value, out _userId);
        }
    }
    private Guid _eventId;
    public string EventId
    {
        get
        {
            return _eventId.ToString();
        }
        set
        {
            Guid.TryParse(value, out _eventId);
        }
    }
    public double Rating { get; set; }
    public string Feedback { get; set; } = "None";

    public EventAttendance() { }
    public EventAttendance(string userId, string eventId, double rating, string feedback)
    {
        UserId = userId;
        EventId = eventId;
        Rating = rating;
        Feedback = feedback;
    }
}