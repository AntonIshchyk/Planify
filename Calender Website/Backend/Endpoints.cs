namespace Backend
{
    public class EndPointManager
    {
        private WebApplication App { get; set; }

        MemoryDB DB;

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
            if (existingAdmin is not null)
            {
                return Results.BadRequest("This Admin already exists");
            }
            MemoryDB.Admins.Add(admin);
            return Results.Ok("Admin registered");
        }

        public IResult Login(Admin admin)
        {
            var existingAdmin = MemoryDB.Admins.FirstOrDefault(a => a.Id == admin.Id);
            if (existingAdmin is null)
            {
                return Results.BadRequest("Admin not found");
            }
            else
            {
                if (existingAdmin.LoggedIn)
                {
                    return Results.BadRequest("Admin is already logged in");
                }
                existingAdmin.LastLogIn = DateTime.Now;
                existingAdmin.LoggedIn = true;
                return Results.Ok($"Welcome {existingAdmin.Username}!");
            }
        }

        public IResult Logout(Admin admin)
        {
            var existingAdmin = MemoryDB.Admins.FirstOrDefault(a => a.Id == admin.Id);
            if (existingAdmin is null)
            {
                return Results.BadRequest("Admin not found");
            }
            else
            {
                if (existingAdmin.LoggedIn)
                {
                    existingAdmin.LastLogOut = DateTime.Now;
                    existingAdmin.LoggedIn = false;
                    return Results.Ok($"See you later {existingAdmin.Username}!");
                }
                return Results.BadRequest("Admin is already logged out");
            }
        }
    }
}