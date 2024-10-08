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

    [HttpPost("send-friend-request")]
    [LoggedInFilter]
    public async Task<IActionResult> SendFriendRequest([FromQuery] Guid toId)
    {
        // check if the sender exists 
        string sessionIdString = HttpContext.Session.GetString("UserId")!;
        Guid sessionId = Guid.Parse(sessionIdString);

        User user = await UserAccess.Get(sessionId);
        if (user is null) return NotFound();

        // make sure user doesn`t send a friend request to himself
        if (toId == user.Id)
        {
            return BadRequest("You cannot send a friend request to yourself");
        }

        // check if potential friend exists
        User friend = await UserAccess.Get(toId);
        if (friend is null) return BadRequest("Have not found your friend");

        if (friend.FriendRequests.Contains(user.Id))
        {
            return Ok("You have already sent a friend request");
        }

        // add a friend request to the friend
        friend.FriendRequests.Add(user.Id);

        await US.UpdateUser(friend);
        return Ok("Friend request was send");
    }


    [HttpGet("search")]
    public async Task<IActionResult> Search(string str)
    {
        List<Event> allEvents = await EventAccess.LoadAll();
        List<User> allUsers = await UserAccess.LoadAll();

        str = str.ToLower();
        List<Event> foundEvents = allEvents
        .Where(e => e.Title.ToLower().Contains(str))
        .ToList();

        List<User> foundUsers = allUsers
        .Where(u => u.FirstName.ToLower().Contains(str) ||
                     u.LastName.ToLower().Contains(str))
        .ToList();

        List<object> result = new();

        result.AddRange(foundEvents);
        result.AddRange(foundUsers);

        return Ok(result);
    }
}



/*
3.1 User can see which friends are going to attend an event.
+ In order to make all the steps below, User must be logged in.
- Based on provided String: Create a GET endpoint which allows User to search for Events and Users.
+ Based on an User Id: Create a POST endpoint which lets User to send a friend request.
+ Create a GET endpoint which lets User to see all friend requests he got.
- Based on an User Id: Create a POST endpoint which lets User to approve or deny a friend request.
+ Create a GET endpoint which lets User to see all his friends.
- Based on an User Id: Create a POST endpoint which lets User to delete a person from friends.
- Based on an Event Id: Create a GET endpoint which lets User to see all of friends that are signed up for the event.
*/