namespace Backend
{
    public class Admin
    {
        public int Id { get; set; }
        public string Username { get; }
        private string Password { get; set; }
        public string Email { get; }
        public DateTime LastLogin { get; set; }
        public bool Online { get; set; }

        public Admin(int id, string username, string password, string email)
        {
            Id = id;
            Username = username;
            Password = password;
            Email = email;
        }
    }

    public class Attendance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; }

        public Attendance(int id, int userId, DateTime date)
        {
            Id = id;
            UserId = userId;
            Date = date;
        }
    }

    public class Event
    {
        public int Id { get; set; }
        public string Title { get; }
        public string Description { get; }
        public DateTime Date { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }
        public string Location { get; }
        public bool AdminApproval { get; }

        public Event(int id, string title, string description, DateTime date, DateTime startTime, DateTime endTime, string location, bool adminApproval)
        {
            Id = id;
            Title = title;
            Description = description;
            Date = date;
            StartTime = startTime;
            EndTime = endTime;
            Location = location;
            AdminApproval = adminApproval;
        }
    }

    public class EventAttendance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public double Rating { get; }
        public string Feedback { get; }

        public EventAttendance(int id, int userId, int eventId, double rating, string feedback)
        {
            Id = id;
            UserId = userId;
            EventId = eventId;
            Rating = rating;
            Feedback = feedback;
        }
    }

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        private string Password { get; set; }
        public int RecurringDays { get; }

        public User(int id, string firstName, string lastName, string email, string password, int recurringDays)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            RecurringDays = recurringDays;
        }
    }
}