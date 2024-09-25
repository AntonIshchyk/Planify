using Microsoft.AspNetCore.Mvc.Filters;

public class LoggedInFilter : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext actioncontext, ActionExecutionDelegate next)
    {
       
        // Example: Get a specific query parameter by key (e.g., "id")
        if(!actioncontext.HttpContext.Session.TryGetValue("UserId", out var idValue)){
            Console.WriteLine($"{actioncontext.HttpContext.Request.Path} was requested, but no id was given");
            actioncontext.HttpContext.Response.StatusCode = 401;
            return;
        }
        if(idValue is null){
            Console.WriteLine($"{actioncontext.HttpContext.Request.Path} was requested, but the user is not logged in!");
            actioncontext.HttpContext.Response.StatusCode = 401;
            return;
        }
        await next();
    }
}