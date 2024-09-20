public class SessionService
{

    public async Task<Session?> GetSessionByPersonId(Guid id)
    {
        List<Session> sessions = await AccesJson.ReadJson<Session>();

        return sessions.FirstOrDefault(s => s.PersonId == id);
    }

    public async Task CreateSession(Session session)
    {
        await AccesJson.WriteJson(session);
    }

    public async Task UpdateSession(Session session)
    {
        await SessionAccess.Update(session);
    }
}