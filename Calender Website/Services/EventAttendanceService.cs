public class EventAttendanceService
{
    public async Task<bool> AppendEventAttendance(EventAttendance ea, Event evt)
    {
        List<EventAttendance> eventattendances = await AccessJson.ReadJson<EventAttendance>();
        if (eventattendances.Find(a => a.EventId == ea.EventId || a.UserId == ea.UserId) is not null) return false;
        await AccessJson.WriteJson(ea);
        return true;
    }
    public bool ValidateDate(Event evt)
    {
        if (DateOnly.Parse(evt.Date) < DateOnly.FromDateTime(DateTime.Now)) return false;
        return true;
    }
    public async Task<bool> DeleteEventAttendance(Guid eventId, Guid userId)
    {
        List<EventAttendance> eventattendances = await AccessJson.ReadJson<EventAttendance>();
        EventAttendance evta = eventattendances.Find(x => Guid.Parse(x.EventId) == eventId && Guid.Parse(x.UserId) == userId)!;
        if (evta is null) return false;
        eventattendances.Remove(evta);
        AccessJson.WriteJsonList(eventattendances);
        return true;
    }
    public async Task<bool> TestExistence(EventAttendance ea)
    {
        List<EventAttendance> eventattendances = await AccessJson.ReadJson<EventAttendance>();
        if (eventattendances.Any(x => x.EventId == ea.EventId && x.UserId == ea.UserId)) return true;
        return false;
    }

    public async Task<List<object>> GetListOfAttendees(Guid eventId)
    {
        List<EventAttendance> eventAttendances = await AccessJson.ReadJson<EventAttendance>();
        List<Guid> userIds = eventAttendances.FindAll(ea => Guid.Parse(ea.EventId) == eventId).Select(ea => Guid.Parse(ea.UserId)).ToList();
        List<object> usersAndAdmins = [];
        List<User> users = await AccessJson.ReadJson<User>();
        List<Admin> admins = await AccessJson.ReadJson<Admin>();
        foreach (Guid id in userIds) foreach (User user in users) if (id == user.Id) usersAndAdmins.Add(user);
        foreach (Guid id in userIds) foreach (Admin admin in admins) if (id == admin.Id) usersAndAdmins.Add(admin);
        return usersAndAdmins;
    }
}