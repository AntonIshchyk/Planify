public class Attendance : IHasId
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Date { get; }

    public Attendance() { }
    public Attendance(Guid userId, DateTime date)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        Date = date;
    }
}