public class Session
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public DateTime LogIn { get; set; }
    public DateTime? LogOut { get; set; }
    public bool LoggedIn { get; set; }

    public Session(Guid personId, bool loggedIn = true)
    {
        Id = Guid.NewGuid();
        PersonId = personId;
        LogIn = DateTime.Now;
        // No logout time at creation
        LogOut = null;
        LoggedIn = loggedIn;
    }
}