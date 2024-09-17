using System.Text.Json;

public class LoginService
{
    public Admin IsCurrentAdmin(Admin admin) => MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password)!;

    public bool IsRegistered() => MemoryDB.Admins.Any(a => a.LoggedIn);

    public Admin GetCurrentAdmin() => MemoryDB.Admins.First(a => a.LoggedIn);

    public async Task SaveAdmin(Admin admin)
    {
        await File.WriteAllTextAsync($"Data/Admins/{admin.Id}.json", JsonSerializer.Serialize(admin));
    }
}