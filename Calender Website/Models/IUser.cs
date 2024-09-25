public interface IUser : IHasId
{
    string Password { get; set; }
    string Email { get; set; }
}