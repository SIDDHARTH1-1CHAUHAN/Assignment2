import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectApi, taskApi } from '../services/api';
import type { ProjectDetail, Task } from '../types';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await projectApi.getById(Number(id));
      setProject(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      await taskApi.create(Number(id), {
        title: newTask.title,
        dueDate: newTask.dueDate || undefined,
      });
      setNewTask({ title: '', dueDate: '' });
      setShowTaskForm(false);
      setSuccess('✓ Task added successfully!');
      setTimeout(() => setSuccess(''), 3000);
      loadProject();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      setActionLoading(true);
      setError('');
      await taskApi.update(task.id, {
        isCompleted: !task.isCompleted,
      });
      setSuccess(`✓ Task marked as ${!task.isCompleted ? 'completed' : 'incomplete'}!`);
      setTimeout(() => setSuccess(''), 2000);
      loadProject();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setActionLoading(true);
      setError('');
      await taskApi.delete(taskId);
      setSuccess('✓ Task deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      loadProject();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner large"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="error-page">
        <div className="error-icon">⚠️</div>
        <h2>Project not found</h2>
        <p>The project you're looking for doesn't exist or you don't have access to it.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(t => t.isCompleted).length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="project-detail">
      <header className="project-header">
        <div className="header-content">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="btn-back"
      >
        ← Back to Dashboard
      </button>

      <button 
        onClick={() => navigate(`/projects/${id}/scheduler`)} 
        className="btn-back"
      >
        🎯 Smart Scheduler
      </button>
    </div>
      </header>

      <div className="project-detail-content">
        {error && (
          <div className="error-message fade-in">
            <span>{error}</span>
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        {success && (
          <div className="success-message fade-in">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="success-close">×</button>
          </div>
        )}

        <div className="project-info">
          <div className="project-info-header">
            <div>
              <h1>{project.title}</h1>
              {project.description && (
                <p className="project-description-detail">{project.description}</p>
              )}
              <p className="project-date-detail">
                Created on {new Date(project.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="project-stats-card">
              <div className="stat-item-large">
                <span className="stat-number">{completedTasks}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-large">
                <span className="stat-number">{totalTasks}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
            </div>
          </div>
          
          {totalTasks > 0 && (
            <div className="progress-section">
              <div className="progress-header">
                <span>Overall Progress</span>
                <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="progress-bar large">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <div>
              <h2>Tasks</h2>
              <p className="tasks-subtitle">
                {project.tasks.length === 0 
                  ? 'No tasks yet' 
                  : `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`
                }
              </p>
            </div>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="btn-primary"
              disabled={actionLoading}
            >
              {showTaskForm ? '✕ Cancel' : '+ Add Task'}
            </button>
          </div>

          {showTaskForm && (
            <form onSubmit={handleCreateTask} className="create-form fade-in">
              <div className="form-row">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title (required)"
                  className="form-input"
                  required
                  maxLength={200}
                  disabled={actionLoading}
                />
              </div>
              <div className="form-row">
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="form-input"
                  disabled={actionLoading}
                  placeholder="Due date (optional)"
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary btn-submit" 
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="loading-spinner">⟳ Adding...</span>
                ) : (
                  'Add Task'
                )}
              </button>
            </form>
          )}

          {project.tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>Add your first task to start tracking your project progress!</p>
              {!showTaskForm && (
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="btn-primary"
                >
                  + Add First Task
                </button>
              )}
            </div>
          ) : (
            <div className="task-list-detail">
              {project.tasks.map((task) => {
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.isCompleted;
                
                return (
                  <div
                    key={task.id}
                    className={`task-item-detail ${task.isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
                  >
                    <div className="task-info">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleToggleTask(task)}
                        className="task-checkbox"
                        disabled={actionLoading}
                      />
                      <div className="task-details">
                        <h3 className="task-title-detail">{task.title}</h3>
                        <div className="task-meta">
                          {task.dueDate && (
                            <span className={`task-due-date ${isOverdue ? 'overdue-text' : ''}`}>
                              {isOverdue && '⚠️ '} 
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {task.isCompleted && (
                            <span className="task-completed-badge">✓ Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn-delete"
                      disabled={actionLoading}
                    >
                      {actionLoading ? '...' : '🗑'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {actionLoading && (
        <div className="overlay-loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;