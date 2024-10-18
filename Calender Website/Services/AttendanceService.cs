public class AttendanceService
{
    public async Task<bool> SaveAttendance(Attendance attendance)
    {
        if (attendance is null) return false;

        List<Attendance> attendances = await AccessJson.ReadJson<Attendance>();

        Attendance doubleAttendance = attendances.FirstOrDefault(a => a.Date.Split(" ")[0] == attendance.Date.Split(" ")[0])!;
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
}