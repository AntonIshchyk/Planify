public class Session : IHasId
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public DateTime LogInDate { get; set; }
    public DateTime? LogOutDate { get; set; }
    public bool LoggedIn { get; set; }

    public Session(Guid personId, bool loggedIn = true)
    {
        Id = Guid.NewGuid();
        PersonId = personId;
        LogInDate = DateTime.Now;
        // No logout time at creation
        LogOutDate = null;
        LoggedIn = loggedIn;
    }
}