public class AdminAccess : BaseAccess<Admin>
{
    public static async Task<Admin> GetLogIn(Admin admin)
    {
        List<Admin> allItems = await LoadAll()!;
        return allItems.FirstOrDefault(x => x.Username == admin.Username && x.Email == admin.Email && x.Password == admin.Password)!;
    }
}
