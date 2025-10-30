namespace ProjectManagerApi.DTOs;

public class ScheduleTaskDto
{
    public string Title { get; set; } = string.Empty;
    public int EstimatedHours { get; set; }
    public string? DueDate { get; set; }
    public List<string> Dependencies { get; set; } = new();
}

public class ScheduleRequestDto
{
    public List<ScheduleTaskDto> Tasks { get; set; } = new();
}

public class ScheduleResponseDto
{
    public List<string> RecommendedOrder { get; set; } = new();
    public string Message { get; set; } = string.Empty;
}