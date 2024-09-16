public class Attendance
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; }

    public Attendance(int id, int userId, DateTime date)
    {
        Id = id;
        UserId = userId;
        Date = date;
    }
}