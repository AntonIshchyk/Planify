public class User : IHasId
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int RecurringDays { get; set; }

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