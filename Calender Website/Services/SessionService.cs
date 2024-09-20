public class SessionService
{
    //Save session to json
    public async Task SaveSession(Session session)
    {
        await AccesJson.WriteJson(session);
    }
}