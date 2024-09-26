public class AdminService
{
    public async Task<bool> AdminExists(Guid Id) => await AdminAccess.Exists(Id);

    public async Task<Admin?> AdminExists(Admin? admin)
    {
        List<Admin> admins = await AccessJson.ReadJson<Admin>();

        return admins.FirstOrDefault(a => a.Username == admin?.Username && a.Password == admin.Password && a.Email == admin.Email);
    }

    //Save admin to json
    public async Task<bool> SaveAdmin(Admin admin)
    {
        List<Admin> admins = await AccessJson.ReadJson<Admin>();
        if (admins.Find(a => a.Email == admin.Email && a.Username == admin.Username && a.Password == admin.Password) is not null) return false;
        await AccessJson.WriteJson(admin);
        return true;
    }

    public async Task<bool> UpdateAdmin(Admin admin) => await AdminAccess.Update(admin);

    public async Task DeleteAdmin(Guid Id) => await AdminAccess.Remove(Id);

    public async Task DeleteAdmin(Admin admin) => await AdminAccess.Remove(admin);

    public async Task<Admin> GetAdmin(Guid Id) => await AdminAccess.Get(Id);

    public async Task<List<Admin>> GetAllAdmin() => await AdminAccess.LoadAll()!;

    public async Task<Admin[]> GetManyAdmins(Guid[] ids)
    {
        List<Admin> specificAdmins = [];
        List<Admin> allAdmins = await AccessJson.ReadJson<Admin>(); ;
        foreach (Guid id in ids)
        {
            Admin admin = allAdmins.Find(a => a.Id == id)!;
            if (admin is not null) specificAdmins.Add(admin);
        }
        return specificAdmins.ToArray();
    }

    public async Task<bool> IsLoggedIn()
    {
        List<Admin> allAdmins = await AccessJson.ReadJson<Admin>();
        if (allAdmins.Any(x => x.LoggedIn == true)) return true;
        return false;
    }
}