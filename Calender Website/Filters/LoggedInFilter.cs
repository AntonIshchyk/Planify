using Microsoft.AspNetCore.Mvc.Filters;

public class LoggedInFilter : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext actioncontext, ActionExecutionDelegate next)
    {
        var context = actioncontext.HttpContext;
        SessionService SS = new();
         var queryParams = context.Request.Query;

        // Example: Get a specific query parameter by key (e.g., "id")
        if(!queryParams.TryGetValue("idPerson", out var idValue)){
            Console.WriteLine($"{context.Request.Path} was requested, but no id was given");
            context.Response.StatusCode = 401;
            return;
        }
         if(!Guid.TryParse(idValue, out var parsedId)){
                Console.WriteLine($"{context.Request.Path} was requested, but no valid id was given");
                context.Response.StatusCode = 401;
                return;
            }
        if(SS.GetSessionByPersonId(parsedId) is null){
            Console.WriteLine($"{context.Request.Path} was requested, but the user is not logged in!");
            context.Response.StatusCode = 401;
            return;
        }
        await next();
    }
}