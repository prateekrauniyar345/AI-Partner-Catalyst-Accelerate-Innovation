import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const announceAction = (message) => {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Active Projects
          </CardTitle>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => announceAction('Opening project creation dialog')}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Project
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4" role="list" aria-label="Active projects">
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
                    p-4 rounded-lg border-2 transition-all
                    ${expandedProject === project.id 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200 bg-white'}
                  `}
                >
                  {/* Project header */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedProject === project.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setExpandedProject(expandedProject === project.id ? null : project.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1">{project.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority} priority
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                            {project.subject}
                          </Badge>
                          <span className="text-xs text-gray-500">Due: {project.dueDate}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 ml-4">
                        {project.progress}%
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
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
                        className="pt-4 border-t border-purple-200"
                      >
                        <h6 className="text-sm font-semibold text-gray-700 mb-3">Tasks</h6>
                        <div className="space-y-2" role="list" aria-label={`Tasks for ${project.title}`}>
                          {project.tasks.map((task) => (
                            <motion.div
                              key={task.id}
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                              role="listitem"
                            >
                              <button
                                onClick={() => toggleTask(project.id, task.id)}
                                className={`
                                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                  transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                                  ${task.completed 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'border-gray-300 hover:border-purple-400'}
                                `}
                                aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                                aria-checked={task.completed}
                                role="checkbox"
                              >
                                {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                              </button>
                              <span
                                className={`flex-1 text-sm ${
                                  task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                }`}
                              >
                                {task.title}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Project actions */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              announceAction('Viewing project details');
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
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
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No active projects</p>
            <p className="text-sm text-gray-400">Say "Create a project" to get started</p>
          </div>
        )}

        {/* Voice command help */}
        <div className="pt-4 border-t border-gray-100">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
            aria-label="Use voice commands to manage projects"
          >
            <Mic className="w-4 h-4" />
            <span>Say "Create project" or "Show my projects"</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
