public class EventAttendanceService
{
    public async Task<bool> AppendEventAttendance(EventAttendance ea, Event evt)
    {
        List<EventAttendance> eventattendances = await AccessJson.ReadJson<EventAttendance>();
        if (eventattendances.Find(a => a.EventId == ea.EventId || a.UserId == ea.UserId) is not null) return false;
        await AccessJson.WriteJson(ea);
        return true;
    }
    public async Task<bool> TestDate(Event evt)
    {
        if (DateOnly.Parse(evt.Date) < DateOnly.FromDateTime(DateTime.Now)) return false;
        return true;
    }
    public async Task<bool> DeleteEventAttendance(Guid eventId, string userId)
    {
        List<EventAttendance> eventattendances = await AccessJson.ReadJson<EventAttendance>();
        EventAttendance evta = eventattendances.Find(x => x.EventId == eventId && x.UserId.ToString() == userId)!;
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
}