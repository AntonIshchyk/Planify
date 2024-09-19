public class EventAttendance : IHasId
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid EventId { get; set; }
    public double Rating { get; }
    public string Feedback { get; }

    public EventAttendance(Guid userId, Guid eventId, double rating, string feedback)
    {
        Id = new Guid();
        UserId = userId;
        EventId = eventId;
        Rating = rating;
        Feedback = feedback;
    }
}