using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerApi.DTOs;
using ProjectManagerApi.Services;
using System.Security.Claims;

namespace ProjectManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly ISmartSchedulerService _schedulerService;

    public ProjectsController(IProjectService projectService, ISmartSchedulerService schedulerService)
    {
        _projectService = projectService;
        _schedulerService = schedulerService;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    // GET: api/projects
    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var userId = GetUserId();
        var projects = await _projectService.GetUserProjectsAsync(userId);
        return Ok(projects);
    }

    // GET: api/projects/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(int id)
    {
        var userId = GetUserId();
        var project = await _projectService.GetProjectByIdAsync(id, userId);
        
        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        return Ok(project);
    }

    // POST: api/projects
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto createDto)
    {
        var userId = GetUserId();
        var project = await _projectService.CreateProjectAsync(createDto, userId);
        
        if (project == null)
        {
            return BadRequest(new { message = "Failed to create project" });
        }

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    // DELETE: api/projects/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserId();
        var deleted = await _projectService.DeleteProjectAsync(id, userId);
        
        if (!deleted)
        {
            return NotFound(new { message = "Project not found" });
        }

        return NoContent();
    }

    // POST: api/projects/{id}/schedule (Smart Scheduler - Bonus Feature)
    [HttpPost("{id}/schedule")]
    public IActionResult ScheduleTasks(int id, [FromBody] ScheduleRequestDto request)
    {
        var result = _schedulerService.GenerateSchedule(request);
        return Ok(result);
    }
}