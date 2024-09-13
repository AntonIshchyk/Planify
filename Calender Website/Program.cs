using Backend;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

WebApplication app = builder.Build();

app.Urls.Add("http://localhost:5027");
EndPointManager endPointManager = new(app);

app.Run();
