var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddTransient<EventService>();
builder.Services.AddTransient<AdminService>();
builder.Services.AddTransient<SessionService>();

var app = builder.Build();

app.MapControllers();
app.Urls.Add("http://localhost:5027");

app.Run();
