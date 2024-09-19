using System.Text.Json;

public class LoginService
{
    public async Task<Admin?> AdminExists(Admin admin)
    {
        List<Admin> admins = await AccesJson.ReadJson<Admin>();

        return admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password && a.Email == admin.Email);
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

    public async Task<bool> UpdateAdmin(Admin admin)
    {
        List<Admin> admins = await AccesJson.ReadJson<Admin>();

        int index = admins.FindIndex(a => a.Id == admin.Id);

        if (index == -1) return false;

        admins[index] = admin;
        AccesJson.WriteJsonList(admins);

        return true;
    }
}