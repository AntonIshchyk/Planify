using Microsoft.AspNetCore.Mvc.Filters;

public class AdminFilter : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext actioncontext, ActionExecutionDelegate next)
    {
         var isAdmin = actioncontext.HttpContext.Session.GetInt32("IsAdmin");
        // Example: Get a specific query parameter by key (e.g., "id")
        if (!(isAdmin.HasValue && isAdmin.Value == 1))
        {
            Console.WriteLine($"{actioncontext.HttpContext.Request.Path} was requested, but no id of admin was given");
            actioncontext.HttpContext.Response.StatusCode = 401;
            return;
        }
        await next.Invoke();
    }
}