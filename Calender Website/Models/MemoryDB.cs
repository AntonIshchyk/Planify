public class MemoryDB
{
    public static List<User> Users { get; set; }
    public static List<Admin> Admins { get; set; }

    static MemoryDB()
    {
        Users = new List<User>();
        Admins = new List<Admin>();
    }
}