import React from 'react';
import type { FilterType } from '../types';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="task-filter">
      <button
        className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`filter-button ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button
        className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className="filter-button"
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
      <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSfjsGR804iPRzKI_Rbf9WmDZL2qwzEUEtChIMXigkU7zeZZIA/viewform?usp=publish-editor" 
        target="_blank" 
        rel="noopener noreferrer"
        className="filter-button"
      >
        💬 Feedback
      </a>
    </div>
  );
};

export default TaskFilter;