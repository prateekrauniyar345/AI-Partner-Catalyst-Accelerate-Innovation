import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, CheckCircle, Mic } from 'lucide-react';
import { Card, Button, Badge, ProgressBar, Form } from 'react-bootstrap';

export function ProjectPlanner({ projects = [], setProjects = () => {} }) {
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

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
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
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <Card.Title as="h5" className="d-flex align-items-center gap-2 mb-0">
            <Target className="text-primary" />
            Active Projects
          </Card.Title>
          <Button
            size="sm"
            variant="primary"
            onClick={() => announceAction('Opening project creation dialog')}
          >
            <Plus size={16} className="me-1" />
            New Project
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
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
                  className={`p-4 rounded border ${expandedProject === project.id ? 'border-primary bg-light' : ''}`}
                >
                  <div
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
                        <h5 className="fw-semibold mb-1">{project.title}</h5>
                        <p className="small text-muted mb-2">{project.description}</p>
                        <div className="d-flex flex-wrap align-items-center gap-2">
                          <Badge bg={getPriorityVariant(project.priority)}>
                            {project.priority} priority
                          </Badge>
                          <Badge bg="info">
                            {project.subject}
                          </Badge>
                          <span className="small text-muted">Due: {project.dueDate}</span>
                        </div>
                      </div>
                      <div className="fw-bold text-primary" style={{ fontSize: '1.5rem' }}>
                        {project.progress}%
                      </div>
                    </div>

                    <div className="mb-3">
                      <ProgressBar now={project.progress} style={{ height: '8px' }} />
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

                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-top"
                      >
                        <h6 className="small fw-semibold mb-3">Tasks</h6>
                        <div className="d-flex flex-column gap-2" role="list" aria-label={`Tasks for ${project.title}`}>
                          {project.tasks.map((task) => (
                            <motion.div
                              key={task.id}
                              whileHover={{ x: 4 }}
                              role="listitem"
                            >
                              <Form.Check
                                type="checkbox"
                                id={`task-${task.id}`}
                                label={task.title}
                                checked={task.completed}
                                onChange={() => toggleTask(project.id, task.id)}
                                className={task.completed ? 'text-muted text-decoration-line-through' : ''}
                              />
                            </motion.div>
                          ))}
                        </div>

                        <div className="d-flex gap-2 mt-4 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              announceAction('Viewing project details');
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
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

        {projects.length === 0 && (
          <div className="text-center py-5">
            <Target size={64} className="text-secondary mx-auto mb-4" />
            <p className="text-muted mb-2">No active projects</p>
            <p className="small text-secondary">Say "Create a project" to get started</p>
          </div>
        )}

        <div className="pt-4 border-top mt-4">
          <Button
            variant="link"
            size="sm"
            className="w-100 d-flex align-items-center justify-content-center gap-2 text-primary text-decoration-none py-2"
            aria-label="Use voice commands to manage projects"
          >
            <Mic size={16} />
            <span>Say "Create project" or "Show my projects"</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
