public class MemoryDB
{
    public static List<Users> Users { get; set; }
    public static List<Admins> Admins { get; set; }

    static MemoryDB()
    {
        Users = [];
        Admins = [];
    }
}