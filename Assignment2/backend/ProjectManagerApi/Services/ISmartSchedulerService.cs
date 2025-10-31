using ProjectManagerApi.DTOs;

namespace ProjectManagerApi.Services;

public interface ISmartSchedulerService
{
    ScheduleResponseDto GenerateSchedule(ScheduleRequestDto request);
}