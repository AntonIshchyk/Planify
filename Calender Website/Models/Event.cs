public class Event : IHasId
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "None";
    public string Description { get; set; } = "None";
    public string Date { get; set; } = DateOnly.FromDateTime(DateTime.MinValue).ToString();
    public string StartTime { get; set; } = TimeOnly.FromDateTime(DateTime.MinValue).ToString();
    public string EndTime { get; set; } = TimeOnly.FromDateTime(DateTime.MinValue).ToString();
    public string Location { get; set; } = "None";
    public bool AdminApproval { get; set; } = false;

    public Event() { }

    public Event(string title, string description, DateOnly date, TimeOnly startTime, TimeOnly endTime, string location)
    {
        Title = title;
        Description = description;
        Date = date.ToString();
        StartTime = startTime.ToString();
        EndTime = endTime.ToString();
        Location = location;
    }
}