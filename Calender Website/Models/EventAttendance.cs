public class EventAttendance : IHasId
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid EventId { get; set; }
    public double Rating { get; set; }
    public string Feedback { get; set; } = "None";

    public EventAttendance() { }
    public EventAttendance(Guid userId, Guid eventId, double rating, string feedback)
    {
        UserId = userId;
        EventId = eventId;
        Rating = rating;
        Feedback = feedback;
    }
}