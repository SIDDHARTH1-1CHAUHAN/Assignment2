using ProjectManagerApi.DTOs;

namespace ProjectManagerApi.Services;

public interface IProjectService
{
    Task<List<ProjectDto>> GetUserProjectsAsync(int userId);
    Task<ProjectDetailDto?> GetProjectByIdAsync(int projectId, int userId);
    Task<ProjectDto?> CreateProjectAsync(CreateProjectDto createDto, int userId);
    Task<bool> DeleteProjectAsync(int projectId, int userId);
}