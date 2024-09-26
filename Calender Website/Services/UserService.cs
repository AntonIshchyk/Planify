using Microsoft.AspNetCore.Mvc;

public class UserService
{
    public async Task<User> GetUserById(Guid Id)
    {
        List<User> users = await AccessJson.ReadJson<User>();
        return users.FirstOrDefault(u => u.Id == Id)!;
    }

    public async Task<bool> SaveUser(User user)
    {
        List<User> users = await AccessJson.ReadJson<User>();
        if (users.Find(u => u.Email == user.Email && u.FirstName == user.FirstName && u.LastName == u.LastName && u.Password == user.Password) is not null) return false;
        await AccessJson.WriteJson(user);
        return true;
    }
}