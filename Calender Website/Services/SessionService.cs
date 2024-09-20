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

    public async Task<bool> UpdateSession(Session session)
    {
        List<Session> sessions = await AccesJson.ReadJson<Session>();

        int index = sessions.FindIndex(s => s.Id == session.Id);

        if (index == -1) return false;

        sessions[index] = session;
        AccesJson.WriteJsonList(sessions);

        return true;
    }

    // useful for later
    // public async Task<bool> UpdateObj<T>(T obj) where T : IHasId
    // {
    //     List<T> objects = await AccesJson.ReadJson<T>();

    //     int index = objects.FindIndex(s => s.Id == obj.Id);

    //     if (index == -1) return false;

    //     objects[index] = obj;
    //     AccesJson.WriteJsonList(objects);

    //     return true;
    // }
}