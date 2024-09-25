public class Event : IHasId
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "None";
    public string Description { get; set; } = "None";
    public string Date { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public string Location { get; set; } = "None";
    public bool AdminApproval { get; set; }

    public Event() { }

    public Event(string title, string description, DateOnly date, TimeOnly startTime, TimeOnly endTime, string location)
    {
        Title = title;
        Description = description;
        Date = date.ToString("yyyy-MM-dd");
        StartTime = startTime.ToString("hh:mm");
        EndTime = endTime.ToString("hh:mm");
        Location = location;
    }
}