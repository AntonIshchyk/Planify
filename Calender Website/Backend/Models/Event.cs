public class Event
{
    public int Id { get; set; }
    public string Title { get; }
    public string Description { get; }
    public DateTime Date { get; }
    public DateTime StartTime { get; }
    public DateTime EndTime { get; }
    public string Location { get; }
    public bool AdminApproval { get; }

    public Event(int id, string title, string description, DateTime date, DateTime startTime, DateTime endTime, string location, bool adminApproval)
    {
        Id = id;
        Title = title;
        Description = description;
        Date = date;
        StartTime = startTime;
        EndTime = endTime;
        Location = location;
        AdminApproval = adminApproval;
    }
}