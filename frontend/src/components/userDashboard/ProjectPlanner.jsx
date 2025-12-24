import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, CheckCircle, Circle, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/card';
import { Button } from '../../UI/button';
import { Badge } from '../../UI/badge';
import { Progress } from '../../UI/progress';

const mockProjects = [
  {
    id: '1',
    title: 'Solar System Model',
    description: 'Create a voice-described model of our solar system',
    subject: 'Science',
    progress: 60,
    dueDate: 'Dec 30, 2025',
    priority: 'high',
    tasks: [
      { id: '1-1', title: 'Research planet sizes', completed: true },
      { id: '1-2', title: 'Learn orbital patterns', completed: true },
      { id: '1-3', title: 'Record descriptions', completed: false },
      { id: '1-4', title: 'Practice presentation', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Math Problem Set',
    description: 'Complete 20 algebra problems with voice explanations',
    subject: 'Mathematics',
    progress: 75,
    dueDate: 'Dec 28, 2025',
    priority: 'medium',
    tasks: [
      { id: '2-1', title: 'Linear equations (10 problems)', completed: true },
      { id: '2-2', title: 'Quadratic equations (5 problems)', completed: true },
      { id: '2-3', title: 'Word problems (5 problems)', completed: false },
    ],
  },
];

export function ProjectPlanner() {
  const [projects, setProjects] = useState(mockProjects);
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleTask = (projectId, taskId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const completedTasks = updatedTasks.filter(t => t.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        
        announceAction(
          updatedTasks.find(t => t.id === taskId)?.completed 
            ? 'Task marked as completed' 
            : 'Task marked as incomplete'
        );
        
        return { ...project, tasks: updatedTasks, progress };
      }
      return project;
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger bg-opacity-10 text-danger border-danger';
      case 'medium':
        return 'bg-warning bg-opacity-10 text-warning border-warning';
      case 'low':
        return 'bg-success bg-opacity-10 text-success border-success';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary border-secondary';
    }
  };

  const announceAction = (message) => {
    const announcement = document.createElement('div');
    announcement.className = 'visually-hidden';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <Card className="border">
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <CardTitle className="d-flex align-items-center gap-2 mb-0">
            <Target className="text-primary" />
            Active Projects
          </CardTitle>
          <Button
            size="sm"
            className="btn btn-primary text-white"
            onClick={() => announceAction('Opening project creation dialog')}
          >
            <Plus style={{width: 16, height: 16}} className="me-1" />
            New Project
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="d-flex flex-column gap-3" role="list" aria-label="Active projects">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                role="listitem"
              >
                <div
                  className={`
                    p-4 rounded border border-2 transition-all
                    ${expandedProject === project.id 
                      ? 'border-primary bg-light' 
                      : 'border-secondary'}
                  `}
                >
                  {/* Project header */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    aria-expanded={expandedProject === project.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setExpandedProject(expandedProject === project.id ? null : project.id);
                      }
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3 flex-wrap">
                      <div className="flex-grow-1">
                        <h5 className="fw-semibold text-dark mb-1">{project.title}</h5>
                        <p className="small text-muted mb-2">{project.description}</p>
                        <div className="d-flex flex-wrap align-items-center gap-2">
                          <Badge className={`border ${getPriorityColor(project.priority)}`}>
                            {project.priority} priority
                          </Badge>
                          <Badge className="bg-info bg-opacity-10 text-info border-info">
                            {project.subject}
                          </Badge>
                          <span className="small text-muted">Due: {project.dueDate}</span>
                        </div>
                      </div>
                      <div className="fw-bold text-primary" style={{fontSize: '1.5rem'}}>
                        {project.progress}%
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <Progress value={project.progress} className="h-2" />
                      <div className="d-flex justify-content-between align-items-center small text-muted mt-1 flex-wrap">
                        <span>
                          {project.tasks.filter(t => t.completed).length} of {project.tasks.length} tasks completed
                        </span>
                        <span>
                          {project.progress === 100 ? '✓ Complete' : `${100 - project.progress}% remaining`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded task list */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-top"
                      >
                        <h6 className="small fw-semibold text-dark mb-3">Tasks</h6>
                        <div className="d-flex flex-column gap-2" role="list" aria-label={`Tasks for ${project.title}`}>
                          {project.tasks.map((task) => (
                            <motion.div
                              key={task.id}
                              whileHover={{ x: 4 }}
                              className="d-flex align-items-center gap-3 p-2 rounded transition-all"
                              role="listitem"
                              style={{backgroundColor: 'transparent'}}
                            >
                              <button
                                onClick={() => toggleTask(project.id, task.id)}
                                className={`
                                  rounded-circle border-2 d-flex align-items-center justify-content-center flex-shrink-0
                                  transition-all
                                  ${task.completed 
                                    ? 'bg-success border-success' 
                                    : 'border-secondary'}
                                `}
                                style={{width: 24, height: 24}}
                                aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                                aria-checked={task.completed}
                                role="checkbox"
                              >
                                {task.completed && <CheckCircle className="text-white" style={{width: 16, height: 16}} />}
                              </button>
                              <span
                                className={`flex-grow-1 small ${
                                  task.completed ? 'text-muted text-decoration-line-through' : 'text-dark'
                                }`}
                              >
                                {task.title}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Project actions */}
                        <div className="d-flex gap-2 mt-4 flex-wrap">
                          <Button
                            size="sm"
                            className="btn btn-outline-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              announceAction('Viewing project details');
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="btn btn-outline-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              announceAction('Editing project');
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-5">
            <Target style={{width: 64, height: 64}} className="text-secondary mx-auto mb-4" />
            <p className="text-muted mb-2">No active projects</p>
            <p className="small text-secondary">Say "Create a project" to get started</p>
          </div>
        )}

        {/* Voice command help */}
        <div className="pt-4 border-top mt-4">
          <button
            className="btn btn-link btn-sm w-100 d-flex align-items-center justify-content-center gap-2 text-primary text-decoration-none py-2"
            aria-label="Use voice commands to manage projects"
          >
            <Mic style={{width: 16, height: 16}} />
            <span>Say "Create project" or "Show my projects"</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
