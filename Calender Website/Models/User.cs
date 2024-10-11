public class User : IHasId
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = "None";
    public string LastName { get; set; } = "None";
    public string Email { get; set; } = "None";
    public string Password { get; set; } = "None";
    public int RecurringDays { get; set; }

    public List<Guid> Friends { get; set; } = new();
    public List<Guid> FriendRequests { get; set; } = new();

    public User() { }
    public User(string firstName, string lastName, string email, string password, int recurringDays)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
        RecurringDays = recurringDays;
    }
}