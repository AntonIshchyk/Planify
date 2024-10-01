public class UserAccess : BaseAccess<User>
{
    public static async Task<User> GetLogIn(User user)
    {
        List<User> allItems = await LoadAll()!;
        return allItems.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password)!;
    }
}

