using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

public class LoginService
{
    public Admin IsCurrentAdmin(Admin admin) => MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password)!;

    public bool IsRegistered() => MemoryDB.Admins.Any(a => a.LoggedIn);

    public Admin GetCurrentAdmin() => MemoryDB.Admins.First(a => a.LoggedIn);

    public async Task<bool> SaveAdmin(Admin admin)
    {
        string path = $"Data/Admins.json";
        List<Admin> admins = JsonSerializer.Deserialize<List<Admin>>(await File.ReadAllTextAsync(path))!;
        foreach (Admin posibleSameAdmin in admins)
        {
            if (posibleSameAdmin.Email == admin.Email && posibleSameAdmin.Username == admin.Username && posibleSameAdmin.Password == admin.Password) return false;
        }
        admins.Add(admin);
        Console.WriteLine(admin.Id);
        Console.WriteLine(admin.Username);
        Console.WriteLine(admin.Email);
        Console.WriteLine(admin.Password);
        Console.WriteLine(admin.LastLogIn);
        Console.WriteLine(admin.LastLogOut);
        Console.WriteLine(admin.LoggedIn);
        await File.WriteAllTextAsync(path, JsonSerializer.Serialize(admins));
        return true;
    }
}