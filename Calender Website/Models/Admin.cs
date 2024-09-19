public class Admin
{
    public Guid Id { get; set; }
    public string Username { get; set; } = "Unknown";
    public string Password { get; set; } = "None";
    public string Email { get; set; } = "None";
    public DateTime LastLogIn { get; set; }
    public DateTime LastLogOut { get; set; }
    public bool LoggedIn { get; set; }

    public Admin() { }

    public Admin(string username, string password, string email)
    {
        Id = Guid.NewGuid();
        Username = username;
        Password = password;
        Email = email;
    }
}