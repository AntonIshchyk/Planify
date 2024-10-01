public class AdminService
{
    public async Task<bool> DoesAdminExist(Guid Id) => await AdminAccess.Exists(Id);

    public async Task<bool> DoesAdminExist(Admin admin) => await DoesAdminExist(admin.Id);

    //Save admin to json
    public async Task<bool> SaveAdmin(Admin admin)
    {
        List<Admin> admins = await AccessJson.ReadJson<Admin>();
        if (admins.Find(a => a.Email == admin.Email || a.Username == admin.Username) is not null) return false;
        await AccessJson.WriteJson(admin);
        return true;
    }

    public async Task<bool> UpdateAdmin(Admin admin) => await AdminAccess.Update(admin);

    public async Task DeleteAdmin(Guid Id) => await AdminAccess.Remove(Id);

    public async Task DeleteAdmin(Admin admin) => await AdminAccess.Remove(admin);

    public async Task<Admin> GetAdmin(Guid Id) => await AdminAccess.Get(Id);

    public async Task<Admin> GetAdmin(Admin admin) => await AdminAccess.Get(admin);

    public async Task<Admin> GetAdminByLogIn(Admin admin) => await AdminAccess.GetLogIn(admin);

    public async Task<List<Admin>> GetAllAdmin() => await AdminAccess.LoadAll()!;

    public async Task<Admin[]> GetManyAdmins(Guid[] Ids) => await AdminAccess.GetMany(Ids);

    public async Task<bool> IsLoggedIn()
    {
        List<Admin> allAdmins = await GetAllAdmin();
        return allAdmins.Any(x => x.LoggedIn);
    }
}