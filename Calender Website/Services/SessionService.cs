public class SessionService
{
    //Save session to json
    public async Task<bool> SaveSession(Session session)
    {
        List<Session> sessions = await AccesJson.ReadJson<Session>();

        await AccesJson.WriteJson(session);
        return true;
    }
}