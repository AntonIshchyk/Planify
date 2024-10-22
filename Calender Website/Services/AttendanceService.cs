public class AttendanceService
{
    public async Task<bool> SaveAttendance(Attendance attendance)
    {
        if (attendance is null) return false;

        List<Attendance> attendances = await AccessJson.ReadJson<Attendance>();

        Attendance doubleAttendance = attendances.FirstOrDefault(a => a.Date.Split(" ")[0] == attendance.Date.Split(" ")[0] && a.UserId == attendance.UserId)!;
        if (doubleAttendance is not null) return false;

        await AccessJson.WriteJson(attendance);
        return true;
    }

    public async Task<List<Attendance>> GetAttendancesOfUser(Guid id)
    {
        List<Attendance> attendances = await AccessJson.ReadJson<Attendance>();
        List<Attendance> attendancesOfUser = attendances.FindAll(a => a.UserId == id);
        return attendancesOfUser;
    }

    public async Task<bool> UpdateAttendance(Attendance attendance) => await AttendanceAccess.Update(attendance);

    public async Task<bool> DeleteAttendance(Guid id) => await AttendanceAccess.Remove(id);

    public async Task<List<Attendance>> GetAllAttendancesOfDate(DateTime date)
    {
        List<Attendance> attendances = await AccessJson.ReadJson<Attendance>();
        List<Attendance> foundAttendances = attendances.FindAll(a => DateTime.Parse(a.Date).Year == date.Year && DateTime.Parse(a.Date).Month == date.Month && DateTime.Parse(a.Date).Day == date.Day);
        return foundAttendances;
    }
}