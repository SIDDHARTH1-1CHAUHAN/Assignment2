using ProjectManagerApi.DTOs;

namespace ProjectManagerApi.Services;

public interface ITaskService
{
    Task<TaskDto?> CreateTaskAsync(int projectId, CreateTaskDto createDto, int userId);
    Task<TaskDto?> UpdateTaskAsync(int taskId, UpdateTaskDto updateDto, int userId);
    Task<bool> DeleteTaskAsync(int taskId, int userId);
}