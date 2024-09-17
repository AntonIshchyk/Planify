namespace Backend
{
    public class EndPointManager
    {
        private WebApplication App { get; set; }
        MemoryDB DB { get; set; }

        public EndPointManager(WebApplication app)
        {
            App = app;
            DB = new MemoryDB();

            app.MapPost("/Register/", Register);
            app.MapPost("/Login/", Login);
            app.MapPost("/Logout/", Logout);
        }


        public IResult Register(Admin admin)
        {
            var existingAdmin = MemoryDB.Admins.FirstOrDefault(a => a.Id == admin.Id);
            if (existingAdmin is null)
            {
                MemoryDB.Admins.Add(admin);
                return Results.Ok("Admin registered");
            }
            return Results.BadRequest("This Admin already exists");
        }

        public IResult Login(Admin admin)
        {
            var existingAdmin = MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password);
            if (existingAdmin is null) return Results.BadRequest("Admin not found");
            else
            {
                if (existingAdmin.LoggedIn)
                {
                    existingAdmin.LastLogIn = DateTime.Now;
                    existingAdmin.LoggedIn = true;
                    return Results.Ok($"Welcome {existingAdmin.Username}!");
                }
                return Results.BadRequest("Admin is already online");
            }
        }


        public IResult Logout(Admin admin)
        {
            var existingAdmin = MemoryDB.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password);
            if (existingAdmin is null) return Results.BadRequest("Admin not found");
            else
            {
                if (existingAdmin.LoggedIn)
                {
                    existingAdmin.LastLogOut = DateTime.Now;
                    existingAdmin.LoggedIn = false;
                    return Results.Ok($"See you later {existingAdmin.Username}!");
                }
                return Results.BadRequest("Admin is already offline");
            }
        }
    }
}