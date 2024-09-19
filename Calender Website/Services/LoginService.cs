using System.Text.Json;

public class LoginService
{
    public Admins AdminExists(Admins admin) => MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password)!;

    // is registered -> WHO? 
    // just random an admin = no point at this moment
    public bool IsRegistered() => MemoryDB.Admins.Any(a => a.LoggedIn);

    // to fix
    // it gets first online admin, not really the one you are
    public Admins GetCurrentAdmin() => MemoryDB.Admins.First(a => a.LoggedIn);

    public async Task<bool> SaveAdmin(Admins admin)
    {
        List<Admins> admins = await AccesJson.ReadJson<Admins>();
        foreach (Admins posibleSameAdmin in admins)
        {
            if (posibleSameAdmin.Email == admin.Email && posibleSameAdmin.Username == admin.Username && posibleSameAdmin.Password == admin.Password)
                return false;
        }
        await AccesJson.WriteJson(admin);
        return true;
    }
}