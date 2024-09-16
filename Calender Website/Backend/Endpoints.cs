using Backend;

namespace EndPointManager
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


        }

        public IResult Register()
        {
            return Results.Ok("To Implement");
        }

        public IResult Login()
        {
            // after loggin in - create a new session
            return Results.Ok("To Implement");
        }
    }
}