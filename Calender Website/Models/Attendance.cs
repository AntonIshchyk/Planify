public class Attendance : IHasId
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    private DateTime _date;
    public string Date
    {
        get
        {
            return _date.ToString("yyyy-MM-dd HH:mm");
        }
        set
        {
            bool converted = DateTime.TryParse(value, out _date);
            if (!converted) Console.WriteLine($"Given value ({value}) could not be converted to a datetime object. ");
        }
    }

    public Attendance() { }
    public Attendance(Guid userId, DateTime date)
    {
        UserId = userId;
        Date = date.ToString("yyyy-MM-dd HH:MM");
    }
}