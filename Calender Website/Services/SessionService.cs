public class SessionService
{
    public async Task<Session?> GetSessionByPersonId(Guid id)
    {
        List<Session> sessions = await AccesJson.ReadJson<Session>();

        return sessions.FirstOrDefault(s => s.PersonId == id);
    }

    public async Task<Session?> GetSessionById(Guid id)
    {
        return await SessionAccess.Get(id);
    }

    public async Task<List<Session>> GetAllSessions()
    {
        return await SessionAccess.LoadAll()!;
    }

    public async Task CreateSession(Session session)
    {
        await SessionAccess.Add(session);
    }

    public async Task UpdateSession(Session session)
    {
        await SessionAccess.Update(session);
    }

    public async Task DeleteSessionById(Guid id)
    {
        await SessionAccess.Remove(id);
    }

    public async Task DeleteSession(Session session)
    {
        await SessionAccess.Remove(session.Id);
    }
}