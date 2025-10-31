using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerApi.DTOs;
using ProjectManagerApi.Services;
using System.Security.Claims;

namespace ProjectManagerApi.Controllers;

[ApiController]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    // POST: api/projects/{projectId}/tasks
    [HttpPost("api/projects/{projectId}/tasks")]
    public async Task<IActionResult> CreateTask(int projectId, [FromBody] CreateTaskDto createDto)
    {
        var userId = GetUserId();
        var task = await _taskService.CreateTaskAsync(projectId, createDto, userId);
        
        if (task == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        return CreatedAtAction(nameof(CreateTask), new { projectId, id = task.Id }, task);
    }

    // PUT: api/tasks/{taskId}
    [HttpPut("api/tasks/{taskId}")]
    public async Task<IActionResult> UpdateTask(int taskId, [FromBody] UpdateTaskDto updateDto)
    {
        var userId = GetUserId();
        var task = await _taskService.UpdateTaskAsync(taskId, updateDto, userId);
        
        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        return Ok(task);
    }

    // DELETE: api/tasks/{taskId}
    [HttpDelete("api/tasks/{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        var userId = GetUserId();
        var deleted = await _taskService.DeleteTaskAsync(taskId, userId);
        
        if (!deleted)
        {
            return NotFound(new { message = "Task not found" });
        }

        return NoContent();
    }
}