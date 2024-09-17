public class LoginService
{
    public Admin IsCurrentAdmin(Admin admin) => MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password)!;

    // is registered -> WHO? 
    // just random an admin = no point at this moment
    public bool IsRegistered() => MemoryDB.Admins.Any(a => a.LoggedIn);

    // to fix
    // it gets first online admin, not really the one you are
    public Admin GetCurrentAdmin() => MemoryDB.Admins.First(a => a.LoggedIn);
}