import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectApi } from '../services/api';

interface ScheduleTask {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

interface ScheduleResult {
  recommendedOrder: string[];
  message: string;
}

const SmartScheduler: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<ScheduleTask[]>([
    { title: '', estimatedHours: 1, dueDate: '', dependencies: [] }
  ]);
  const [result, setResult] = useState<ScheduleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  const addTask = () => {
    setTasks([...tasks, { title: '', estimatedHours: 1, dueDate: '', dependencies: [] }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: keyof ScheduleTask, value: any) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const toggleDependency = (taskIndex: number, dependencyTitle: string) => {
    const updatedTasks = [...tasks];
    const deps = updatedTasks[taskIndex].dependencies;
    
    if (deps.includes(dependencyTitle)) {
      updatedTasks[taskIndex].dependencies = deps.filter(d => d !== dependencyTitle);
    } else {
      updatedTasks[taskIndex].dependencies = [...deps, dependencyTitle];
    }
    
    setTasks(updatedTasks);
  };

  const handleSchedule = async () => {
    // Validate
    const invalidTasks = tasks.filter(t => !t.title.trim());
    if (invalidTasks.length > 0) {
      setError('All tasks must have a title');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResult(null);
      
      const response = await projectApi.schedule(Number(id), tasks);
      setResult(response);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate schedule. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (exampleType: 'simple' | 'complex' | 'parallel') => {
    if (exampleType === 'simple') {
      setTasks([
        { title: 'Design API', estimatedHours: 5, dueDate: '2025-11-01', dependencies: [] },
        { title: 'Implement Backend', estimatedHours: 12, dueDate: '2025-11-05', dependencies: ['Design API'] },
        { title: 'Build Frontend', estimatedHours: 10, dueDate: '2025-11-07', dependencies: ['Design API'] },
        { title: 'End-to-End Test', estimatedHours: 8, dueDate: '2025-11-10', dependencies: ['Implement Backend', 'Build Frontend'] }
      ]);
    } else if (exampleType === 'complex') {
      setTasks([
        { title: 'Setup Database', estimatedHours: 4, dueDate: '2025-11-01', dependencies: [] },
        { title: 'Create User Model', estimatedHours: 3, dueDate: '2025-11-02', dependencies: ['Setup Database'] },
        { title: 'Create Auth Service', estimatedHours: 8, dueDate: '2025-11-03', dependencies: ['Create User Model'] },
        { title: 'Build Login Page', estimatedHours: 6, dueDate: '2025-11-04', dependencies: ['Create Auth Service'] },
        { title: 'Write Tests', estimatedHours: 10, dueDate: '2025-11-05', dependencies: ['Create Auth Service'] },
        { title: 'Deploy', estimatedHours: 5, dueDate: '2025-11-06', dependencies: ['Build Login Page', 'Write Tests'] }
      ]);
    } else {
      setTasks([
        { title: 'Research Competitors', estimatedHours: 8, dueDate: '2025-11-15', dependencies: [] },
        { title: 'Design Logo', estimatedHours: 6, dueDate: '2025-11-10', dependencies: [] },
        { title: 'Write Documentation', estimatedHours: 12, dueDate: '2025-11-20', dependencies: [] },
        { title: 'Create Marketing Plan', estimatedHours: 10, dueDate: '2025-11-12', dependencies: [] }
      ]);
    }
    setShowInstructions(false);
  };

  const clearAll = () => {
    setTasks([{ title: '', estimatedHours: 1, dueDate: '', dependencies: [] }]);
    setResult(null);
    setError('');
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>🎯 Smart Task Scheduler</h1>
            <p className="welcome-text">Optimize your task order based on dependencies and priorities</p>
          </div>
          <button 
            onClick={() => navigate(`/projects/${id}`)} 
            className="btn-secondary btn-logout"
          >
            <span className="logout-icon">←</span> Back to Project
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Error Message */}
        {error && (
          <div className="error-message fade-in">
            <span>{error}</span>
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        {/* Instructions Card */}
        {showInstructions && (
          <div className="create-form fade-in" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📋 How It Works</h3>
            <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
              The Smart Scheduler uses topological sorting to determine the optimal order for completing your tasks.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
              <li style={{ padding: '0.5rem 0', color: '#666' }}>✅ <strong>Resolves dependencies</strong> - Ensures prerequisite tasks come first</li>
              <li style={{ padding: '0.5rem 0', color: '#666' }}>📅 <strong>Considers due dates</strong> - Prioritizes urgent tasks</li>
              <li style={{ padding: '0.5rem 0', color: '#666' }}>⏱️ <strong>Accounts for effort</strong> - Balances workload distribution</li>
              <li style={{ padding: '0.5rem 0', color: '#666' }}>⚠️ <strong>Detects conflicts</strong> - Warns about circular dependencies</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => loadExample('simple')} 
                className="btn-primary"
                style={{ flex: '1 1 200px' }}
              >
                Load Simple Example
              </button>
              <button 
                onClick={() => loadExample('complex')} 
                className="btn-primary"
                style={{ flex: '1 1 200px' }}
              >
                Load Complex Example
              </button>
              <button 
                onClick={() => loadExample('parallel')} 
                className="btn-primary"
                style={{ flex: '1 1 200px' }}
              >
                Load Parallel Tasks
              </button>
            </div>
            <button 
              onClick={() => setShowInstructions(false)} 
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              Got it! Let me create my own
            </button>
          </div>
        )}

        {/* Tasks Section */}
        <div className="dashboard-actions">
          <div>
            <h2>Your Tasks</h2>
            <p className="projects-count">{tasks.filter(t => t.title.trim()).length} {tasks.filter(t => t.title.trim()).length === 1 ? 'task' : 'tasks'} configured</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={clearAll}
              className="btn-secondary"
              disabled={loading}
            >
              Clear All
            </button>
            <button
              onClick={addTask}
              className="btn-primary"
              disabled={loading}
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
          {tasks.map((task, index) => (
            <div key={index} className="project-card">
              <div className="project-card-content" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Task {index + 1}</h3>
                  {tasks.length > 1 && (
                    <button
                      onClick={() => removeTask(index)}
                      className="btn-delete"
                      style={{ fontSize: '1.2rem', padding: '0.25rem 0.75rem' }}
                    >
                      × Remove
                    </button>
                  )}
                </div>

                {/* Task Title */}
                <div className="form-row" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(index, 'title', e.target.value)}
                    placeholder="e.g., Design API"
                    className="form-input"
                    required
                  />
                </div>

                {/* Hours and Due Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Estimated Hours *
                    </label>
                    <input
                      type="number"
                      value={task.estimatedHours}
                      onChange={(e) => updateTask(index, 'estimatedHours', parseInt(e.target.value) || 1)}
                      min="1"
                      max="1000"
                      className="form-input"
                    />
                  </div>

                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => updateTask(index, 'dueDate', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Dependencies */}
                {tasks.length > 1 && (
                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Dependencies (Select prerequisite tasks)
                    </label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '0.5rem' }}>
                      {tasks.map((t, i) => {
                        if (i === index || !t.title.trim()) return null;
                        return (
                          <label key={i} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0.5rem',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            marginBottom: '0.25rem'
                          }}
                          className="dependency-item"
                          >
                            <input
                              type="checkbox"
                              checked={task.dependencies.includes(t.title)}
                              onChange={() => toggleDependency(index, t.title)}
                              style={{ marginRight: '0.75rem', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '0.875rem' }}>{t.title}</span>
                          </label>
                        );
                      })}
                    </div>
                    {task.dependencies.length > 0 && (
                      <div style={{ 
                        marginTop: '0.75rem', 
                        padding: '0.75rem', 
                        background: '#f0f9ff', 
                        borderLeft: '3px solid #3b82f6',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        color: '#1e40af'
                      }}>
                        <strong>Depends on:</strong> {task.dependencies.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Generate Schedule Button */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button
            onClick={handleSchedule}
            className="btn-primary"
            disabled={loading || tasks.every(t => !t.title.trim())}
            style={{ 
              fontSize: '1.1rem', 
              padding: '1rem 3rem',
              minWidth: '300px'
            }}
          >
            {loading ? (
              <span className="loading-spinner">⟳ Generating Schedule...</span>
            ) : (
              '🚀 Generate Optimal Schedule'
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div id="results-section" className="create-form fade-in">
            <h2 style={{ marginBottom: '1rem' }}>📊 Recommended Task Order</h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.05rem' }}>{result.message}</p>

            {result.recommendedOrder.length > 0 ? (
              <div style={{ marginBottom: '2rem' }}>
                {result.recommendedOrder.map((taskTitle, index) => {
                  const originalTask = tasks.find(t => t.title === taskTitle);
                  return (
                    <div 
                      key={index}
                      className="project-card fade-in"
                      style={{ 
                        marginBottom: '1rem',
                        animation: `fadeIn 0.5s ease ${index * 0.1}s both`
                      }}
                    >
                      <div className="project-card-content" style={{ cursor: 'default' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          {/* Order Number */}
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}>
                            {index + 1}
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem' }}>{taskTitle}</h3>
                            {originalTask && (
                              <div className="project-stats" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
                                {originalTask.estimatedHours && (
                                  <div className="stat-item">
                                    <span className="stat-icon">⏱️</span>
                                    <span>{originalTask.estimatedHours}h</span>
                                  </div>
                                )}
                                {originalTask.dueDate && (
                                  <div className="stat-item">
                                    <span className="stat-icon">📅</span>
                                    <span>Due: {new Date(originalTask.dueDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                                {originalTask.dependencies.length > 0 && (
                                  <div className="stat-item">
                                    <span className="stat-icon">🔗</span>
                                    <span>After: {originalTask.dependencies.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Status */}
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#10b981',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}>
                            ✓
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">⚠️</div>
                <h3>Could not generate schedule</h3>
                <p>This usually means there are circular dependencies in your tasks. Please review your task dependencies and try again.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setResult(null)} 
                className="btn-secondary"
                style={{ minWidth: '180px' }}
              >
                Modify Tasks
              </button>
              <button 
                onClick={() => window.print()} 
                className="btn-primary"
                style={{ minWidth: '180px' }}
              >
                🖨️ Print Schedule
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="overlay-loading">
          <div className="spinner"></div>
          <p>Analyzing dependencies and optimizing order...</p>
        </div>
      )}

      <style>{`
        .dependency-item:hover {
          background-color: #f9fafb;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SmartScheduler;