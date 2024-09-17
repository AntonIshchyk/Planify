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
        }
    }
}