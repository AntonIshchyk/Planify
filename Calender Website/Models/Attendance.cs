public class Attendance : IHasId
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Date { get; set; } = DateOnly.FromDateTime(DateTime.MinValue).ToString();

    public DateTime DateTimeAttendance
    {
        get
        {
            return DateTime.Parse(Date);
        }
    }

    public Attendance() { }
    public Attendance(Guid userId, DateTime date)
    {
        UserId = userId;
        Date = date.ToString("yyyy-MM-dd HH:MM");
    }
}