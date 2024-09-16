public class User
{
    public int Id { get; set; }
    public string FirstName { get; }
    public string LastName { get; }
    public string Email { get; }
    private string Password { get; set; }
    public int RecurringDays { get; }

    public User(int id, string firstName, string lastName, string email, string password, int recurringDays)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
        RecurringDays = recurringDays;
    }
}