import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import type { Project } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await projectApi.getAll();
      setProjects(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load projects. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      setError('Project title is required');
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      await projectApi.create(newProject);
      setNewProject({ title: '', description: '' });
      setShowCreateForm(false);
      setSuccess('✓ Project created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      loadProjects();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project. Please try again.');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project? All tasks will be deleted as well.')) return;

    try {
      setActionLoading(true);
      setError('');
      await projectApi.delete(id);
      setSuccess('✓ Project deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      loadProjects();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete project. Please try again.');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Project Manager</h1>
            <p className="welcome-text">Welcome back, {user?.fullName}!</p>
          </div>
          <button onClick={logout} className="btn-secondary btn-logout">
            <span className="logout-icon">→</span> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
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

        <div className="dashboard-actions">
          <div>
            <h2>My Projects</h2>
            <p className="projects-count">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary"
            disabled={actionLoading}
          >
            {showCreateForm ? '✕ Cancel' : '+ New Project'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateProject} className="create-form fade-in">
            <div className="form-row">
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Project title (3-100 characters)"
                className="form-input"
                required
                minLength={3}
                maxLength={100}
                disabled={actionLoading}
              />
            </div>
            <div className="form-row">
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Project description (optional, max 500 characters)"
                className="form-textarea"
                maxLength={500}
                rows={3}
                disabled={actionLoading}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary btn-submit" 
              disabled={actionLoading}
            >
              {actionLoading ? (
                <span className="loading-spinner">⟳ Creating...</span>
              ) : (
                'Create Project'
              )}
            </button>
          </form>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No projects yet</h3>
            <p>Create your first project to get started with task management!</p>
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary"
              >
                + Create First Project
              </button>
            )}
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
              >
                <div 
                  className="project-card-content"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <h3>{project.title}</h3>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  <div className="project-stats">
                    <div className="stat-item">
                      <span className="stat-icon">✓</span>
                      <span>{project.completedTaskCount} / {project.taskCount} tasks</span>
                    </div>
                    <span className="project-date">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {project.taskCount > 0 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${(project.completedTaskCount / project.taskCount) * 100}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  className="btn-delete"
                  disabled={actionLoading}
                >
                  {actionLoading ? '...' : '🗑 Delete'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {actionLoading && (
        <div className="overlay-loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;