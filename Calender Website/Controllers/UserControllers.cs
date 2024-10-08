using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class UserController : Controller
{
    readonly UserService US;

    public UserController(UserService us)
    {
        US = us;
    }

    [HttpGet("get-all-users")]
    public async Task<IActionResult> GetAllUsers() => Ok(await US.GetAllUsers());

    [HttpGet("get-user-by-id")]
    public async Task<IActionResult> GetUserById([FromQuery] Guid Id)
    {
        User user = await US.GetUserById(Id);
        if (user is null) return NotFound("User does not exist");
        return Ok(user);
    }

    [HttpGet("get-many-users-by-id")]
    public async Task<IActionResult> GetManyUsers([FromQuery] Guid[] Ids)
    {
        User[] foundUsers = await US.GetManyUsers(Ids);
        if (foundUsers.Length <= 0) return BadRequest("There were no users with any of these ids");
        return Ok(foundUsers);
    }

    [HttpPut("update-user")]
    public async Task<IActionResult> UpdateUser([FromBody] User user)
    {
        bool userUpdated = await US.UpdateUser(user);
        if (!userUpdated) return NotFound("Could not find user");
        return Ok("User is updated");
    }

    [HttpDelete("delete-user-by-id")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteUser([FromQuery] Guid Id)
    {
        bool userIsDeleted = await US.DeleteUserById(Id);
        if (!userIsDeleted) return NotFound("User not found");
        return Ok("User is deleted");
    }

    [HttpDelete("delete-user")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteUser(User user)
    {
        bool userIsDeleted = await US.DeleteUserWithUser(user);
        if (!userIsDeleted) return NotFound("User not found");
        return Ok("User is deleted");
    }


    [HttpGet("friends")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAllFriends()
    {
        string sessionIdString = HttpContext.Session.GetString("UserId")!;
        Guid sessionId = Guid.Parse(sessionIdString);

        User user = await UserAccess.Get(sessionId);
        if (user is null) return NotFound();

        return Ok(user.Friends);
    }

    [HttpGet("friend-requests")]
    [LoggedInFilter]
    public async Task<IActionResult> GetAllFriendRequests()
    {
        string sessionIdString = HttpContext.Session.GetString("UserId")!;
        Guid sessionId = Guid.Parse(sessionIdString);

        User user = await UserAccess.Get(sessionId);
        if (user is null) return NotFound();

        return Ok(user.FriendRequests);
    }
}