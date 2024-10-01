public class UserService
{
    public async Task<User> GetUserById(Guid Id)
    {
        List<User> users = await AccessJson.ReadJson<User>();
        return users.FirstOrDefault(u => u.Id == Id)!;
    }
    public async Task<User> GetUser(User user) => await UserAccess.GetLogIn(user);

    public async Task<List<User>> GetAllUsers() => await UserAccess.LoadAll();

    public async Task<bool> SaveUser(User user)
    {
        List<User> users = await AccessJson.ReadJson<User>();
        if (users.Find(u => u.Email == user.Email && u.FirstName == user.FirstName && u.LastName == u.LastName && u.Password == user.Password) is not null) return false;
        await AccessJson.WriteJson(user);
        return true;
    }

    public async Task<User[]> GetManyUsers(Guid[] Ids) => await UserAccess.GetMany(Ids);

    public async Task<bool> UpdateUser(User user) => await UserAccess.Update(user);

    public async Task<bool> DeleteUserById(Guid Id) => await UserAccess.Remove(Id);

    public async Task<bool> DeleteUserWithUser(User user) => await UserAccess.Remove(user);
}