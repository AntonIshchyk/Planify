public class Attendance : IHasId
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Date { get; }

    public Attendance() { }
    public Attendance(Guid userId, DateTime date)
    {
        Id = new Guid();
        UserId = userId;
        Date = date;
    }
}