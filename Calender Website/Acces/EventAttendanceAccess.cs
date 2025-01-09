public class EventAttendanceAccess : BaseAccess<EventAttendance>
{
    public static async Task<bool> RemovebyEventId(Guid eventId)
    {
        List<EventAttendance> allItems = await LoadAll()!;
        List<EventAttendance> itemsToRemove = allItems.FindAll(x => x.EventId == eventId);
        if (itemsToRemove is null) return false;

        itemsToRemove.ForEach(item => allItems.Remove(item));
        AccessJson.WriteJsonList(allItems);
        return true;
    }
}