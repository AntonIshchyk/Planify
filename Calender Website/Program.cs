var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddTransient<EventService>();
builder.Services.AddTransient<AdminService>();
builder.Services.AddTransient<UserService>();

var app = builder.Build();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/Calender-Website/login-admin")
    {
        Console.WriteLine("Implement seperate login for admin");
        Console.WriteLine("Check for an API key");
    }
    await next.Invoke();
});

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
app.MapControllers();
app.UseSession();
app.UseAuthorization();
app.Urls.Add("http://localhost:5027");

app.Run();