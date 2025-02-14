var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
// Uncomment this if you need Swagger
// builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:3001")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});
builder.Services.AddTransient<EventService>();
builder.Services.AddTransient<AdminService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<AttendanceService>();
builder.Services.AddTransient<EventAttendanceService>();

var app = builder.Build();

// Development and production environment handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowReactApp"); // Apply CORS policy after UseRouting and before UseAuthorization
app.UseSession();
app.UseAuthorization();
app.MapControllers();

app.Urls.Add("http://localhost:3000");

app.Run();
