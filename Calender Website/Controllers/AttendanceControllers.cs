using Microsoft.AspNetCore.Mvc;

[Route("Calender-Website")]
public class AttendanceControllers : Controller
{
    readonly AttendanceService AS;
    public AttendanceControllers(AttendanceService attendanceService)
    {
        AS = attendanceService;
    }

    [HttpPost("attend")]
    [LoggedInFilter]
    public async Task<IActionResult> MakeAttendance([FromBody] Attendance attendance)
    {
        if (attendance is null) return BadRequest("No data found. ");
        if (attendance.Date == "") return BadRequest("Please, give a date next time. ");

        Guid UserId;
        bool converted = Guid.TryParse(HttpContext.Session.GetString("UserId"), out UserId);
        if (!converted) return BadRequest("Something went wrong. ");
        attendance.UserId = UserId;
        attendance.Id = Guid.NewGuid();

        bool IsAttendanceSaved = await AS.SaveAttendance(attendance);
        if (!IsAttendanceSaved) return BadRequest("Attendance is not saved. ");
        return Created();
    }

    [HttpGet("check-own-attendances")]
    [LoggedInFilter]
    public async Task<IActionResult> GetOwnAttendances()
    {
        Guid Id;
        bool converted = Guid.TryParse(HttpContext.Session.GetString("UserId"), out Id);
        if (!converted) return BadRequest("Something went wrong. ");

        List<Attendance> attendancesOfUser = await AS.GetAttendancesOfUser(Id);
        return Ok(attendancesOfUser.ToArray());
    }

    [HttpPut("update-attendance")]
    [LoggedInFilter]
    public async Task<IActionResult> UpdateAttendance([FromBody] Attendance attendance, [FromQuery] Guid attendanceId)
    {
        if (attendance is null) return BadRequest("Data not complete. ");
        if (attendanceId != Guid.Empty) return BadRequest("Data is not complete. ");
        DateTime date;
        if (!DateTime.TryParse(attendance.Date, out date)) return BadRequest("Data isn't complete. ");
        if (date.Day <= DateTime.Now.Day) return BadRequest("You can't adjust data in the past or on the current day. ");

        attendance.Id = attendanceId;
        attendance.UserId = Guid.Parse(HttpContext.Session.GetString("UserId")!);
        bool updated = await AS.UpdateAttendance(attendance);
        if (!updated) return BadRequest("Attendance could not be updated. ");
        return Ok("Attendance updated. ");
    }

    [HttpDelete("delete-attendance")]
    [LoggedInFilter]
    public async Task<IActionResult> DeleteAttendance([FromQuery] Guid id)
    {
        if (id == Guid.Empty) return BadRequest("Data not complete. ");

        bool removed = await AS.DeleteAttendance(id);
        if (!removed) return BadRequest("Something went wrong. ");
        return Ok("Attendance is deleted. ");
    }

    [HttpGet("see-all-attendances-of-date")]
    [AdminFilter]
    public async Task<IActionResult> SeeAllAttendancesOfDate([FromQuery] DateTime date)
    {
        if (date == DateTime.MinValue || date == DateTime.MaxValue) return BadRequest("Data not given. ");
        List<Attendance> attendances = await AS.GetAllAttendancesOfDate(date);
        if (attendances.Count <= 0) return BadRequest("Nobody is attending on the office today. ");
        return Ok(attendances);
    }
}