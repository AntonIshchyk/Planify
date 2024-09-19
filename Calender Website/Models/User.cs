public class User : IHasId
{
    public Guid Id { get; set; }
    public string FirstName { get; }
    public string LastName { get; }
    public string Email { get; }
    private string Password { get; set; }
    public int RecurringDays { get; }

    public User(string firstName, string lastName, string email, string password, int recurringDays)
    {
        Id = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
        RecurringDays = recurringDays;
    }
}