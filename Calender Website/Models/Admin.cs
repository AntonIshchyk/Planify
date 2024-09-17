public class Admin
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public DateTime LastLogIn { get; set; }
    public DateTime LastLogOut { get; set; }
    public bool LoggedIn { get; set; }

    public Admin()
    {
        Id = Guid.NewGuid();
    }

    public Admin(string username, string password, string email)
    {
        Id = Guid.NewGuid();
        Username = username;
        Password = password;
        Email = email;
    }

    public Admin(Guid id, string username, string password, string email)
    {
        Id = Guid.NewGuid();
        Username = username;
        Password = password;
        Email = email;
    }
}