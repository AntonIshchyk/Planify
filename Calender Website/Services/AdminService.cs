public class AdminService
{
    public async Task<bool> AdminExists(Guid Id)
    {
        return await AdminAccess.Exists(Id);
    }

    public async Task<Admin?> AdminExists(Admin? admin)
    {
        List<Admin> admins = await AccesJson.ReadJson<Admin>();

        return admins.FirstOrDefault(a => a.Username == admin?.Username && a.Password == admin.Password && a.Email == admin.Email);
    }

    //Save admin to json
    public async Task<bool> SaveAdmin(Admin admin)
    {
        List<Admin> admins = await AccesJson.ReadJson<Admin>();

        foreach (Admin posibleSameAdmin in admins)
        {
            if (posibleSameAdmin.Email == admin.Email && posibleSameAdmin.Username == admin.Username && posibleSameAdmin.Password == admin.Password)
                return true;
        }
        await AccesJson.WriteJson(admin);
        return false;
    }

    public async Task UpdateAdmin(Admin admin)
    {
        await AdminAccess.Update(admin);
    }

    public async Task DeleteAdmin(Guid Id)
    {
        await AdminAccess.Remove(Id);
    }

    public async Task DeleteAdmin(Admin admin)
    {
        await AdminAccess.Remove(admin);
    }

    public async Task<Admin> GetAdmin(Guid Id)
    {
        return await AdminAccess.Get(Id);
    }

    public async Task<List<Admin>> GetAllAdmin()
    {
        return await AdminAccess.LoadAll()!;
    }

    public async Task<Admin[]> GetManyAdmins(Guid[] ids)
    {
        List<Admin> specificAdmins = [];
        List<Admin> allAdmins = await AccesJson.ReadJson<Admin>(); ;
        foreach (Guid id in ids)
        {
            Admin admin = allAdmins.Find(a => a.Id == id)!;
            if (admin is not null) specificAdmins.Add(admin);
        }
        return specificAdmins.ToArray();
    }

    public async Task<bool> IsLoggedIn(){
        List<Admin> allAdmins = await AccesJson.ReadJson<Admin>();
        if(allAdmins.Any(x => x.LoggedIn == true)) return true;
        return false;
    }
}