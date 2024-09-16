public class EventAttendance
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int EventId { get; set; }
    public double Rating { get; }
    public string Feedback { get; }

    public EventAttendance(int id, int userId, int eventId, double rating, string feedback)
    {
        Id = id;
        UserId = userId;
        EventId = eventId;
        Rating = rating;
        Feedback = feedback;
    }
}