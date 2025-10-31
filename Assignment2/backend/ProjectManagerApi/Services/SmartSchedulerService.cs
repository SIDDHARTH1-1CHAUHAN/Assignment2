using ProjectManagerApi.DTOs;

namespace ProjectManagerApi.Services;

public class SmartSchedulerService : ISmartSchedulerService
{
    public ScheduleResponseDto GenerateSchedule(ScheduleRequestDto request)
    {
        try
        {
            // Build dependency graph
            var taskMap = request.Tasks.ToDictionary(t => t.Title, t => t);
            var graph = new Dictionary<string, List<string>>();
            var inDegree = new Dictionary<string, int>();

            // Initialize graph
            foreach (var task in request.Tasks)
            {
                graph[task.Title] = new List<string>();
                inDegree[task.Title] = 0;
            }

            // Build edges (dependencies)
            foreach (var task in request.Tasks)
            {
                foreach (var dependency in task.Dependencies)
                {
                    if (taskMap.ContainsKey(dependency))
                    {
                        graph[dependency].Add(task.Title);
                        inDegree[task.Title]++;
                    }
                }
            }

            // Topological sort using Kahn's algorithm with priority
            var result = new List<string>();
            var queue = new PriorityQueue<string, int>();

            // Add tasks with no dependencies
            foreach (var task in request.Tasks)
            {
                if (inDegree[task.Title] == 0)
                {
                    var priority = CalculatePriority(task);
                    queue.Enqueue(task.Title, priority);
                }
            }

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();
                result.Add(current);

                foreach (var neighbor in graph[current])
                {
                    inDegree[neighbor]--;
                    if (inDegree[neighbor] == 0)
                    {
                        var priority = CalculatePriority(taskMap[neighbor]);
                        queue.Enqueue(neighbor, priority);
                    }
                }
            }

            // Check for circular dependencies
            if (result.Count != request.Tasks.Count)
            {
                return new ScheduleResponseDto
                {
                    RecommendedOrder = new List<string>(),
                    Message = "Error: Circular dependency detected in tasks. Please review task dependencies."
                };
            }

            return new ScheduleResponseDto
            {
                RecommendedOrder = result,
                Message = $"Successfully scheduled {result.Count} tasks based on dependencies, due dates, and estimated hours."
            };
        }
        catch (Exception ex)
        {
            return new ScheduleResponseDto
            {
                RecommendedOrder = new List<string>(),
                Message = $"Error generating schedule: {ex.Message}"
            };
        }
    }

    private int CalculatePriority(ScheduleTaskDto task)
    {
        // Lower priority value = higher priority in queue
        int priority = 0;

        // Factor 1: Due date (earlier due dates get higher priority)
        if (!string.IsNullOrEmpty(task.DueDate) && DateTime.TryParse(task.DueDate, out var dueDate))
        {
            var daysUntilDue = (dueDate - DateTime.Now).Days;
            priority += Math.Max(0, daysUntilDue * 10); // Earlier dates = lower value
        }
        else
        {
            priority += 10000; // No due date = lowest priority
        }

        // Factor 2: Estimated hours (longer tasks might need to start earlier)
        priority -= task.EstimatedHours * 5; // Longer tasks get slightly higher priority

        return priority;
    }
}