import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, BookOpen, Plus, Check, ChevronRight, Mic } from 'lucide-react';
import { Card, Button, Badge } from 'react-bootstrap';

const mockLessons = [
  {
    id: '1',
    title: 'Introduction to Fractions',
    subject: 'Mathematics',
    duration: '20 min',
    scheduledFor: 'Today, 2:00 PM',
    status: 'scheduled',
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Photosynthesis Process',
    subject: 'Science',
    duration: '25 min',
    scheduledFor: 'Today, 3:00 PM',
    status: 'scheduled',
    difficulty: 'medium',
  },
  {
    id: '3',
    title: 'World War II Overview',
    subject: 'History',
    duration: '30 min',
    scheduledFor: 'Tomorrow, 10:00 AM',
    status: 'scheduled',
    difficulty: 'hard',
  },
];

export function LessonPlanner() {
  const [lessons, setLessons] = useState(mockLessons);
  const [expandedLesson, setExpandedLesson] = useState(null);

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const handleStartLesson = (lessonId) => {
    setLessons(lessons.map(lesson =>
      lesson.id === lessonId
        ? { ...lesson, status: 'in-progress' }
        : lesson
    ));
    announceAction(`Starting lesson: ${lessons.find(l => l.id === lessonId)?.title}`);
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
            <Calendar className="text-primary" />
            Lesson Plan
          </Card.Title>
          <Button
            size="sm"
            variant="primary"
            onClick={() => announceAction('Opening lesson creation dialog')}
          >
            <Plus size={16} className="me-1" />
            Add Lesson
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        <h6 className="small fw-semibold text-muted d-flex align-items-center gap-2 mb-3">
          <Clock size={16} className="text-primary" />
          Today's Schedule
        </h6>

        <div role="list" aria-label="Scheduled lessons">
          <AnimatePresence>
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                role="listitem"
                className="mb-3"
              >
                <div
                  className={`p-3 rounded border ${expandedLesson === lesson.id
                      ? 'border-primary bg-light'
                      : 'border-secondary bg-white'
                    }`}
                  onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedLesson === lesson.id}
                  aria-label={`${lesson.title}, ${lesson.subject}, ${lesson.duration}, scheduled for ${lesson.scheduledFor}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                        {lesson.status === 'completed' ? (
                          <div className="d-flex align-items-center justify-content-center rounded-circle bg-success flex-shrink-0" style={{width: 24, height: 24}}>
                            <Check className="text-white" size={16} />
                          </div>
                        ) : (
                          <div className="border rounded-circle flex-shrink-0" style={{width: 24, height: 24}} />
                        )}
                        <h5 className="mb-0 fw-semibold">{lesson.title}</h5>
                      </div>

                      <div className="d-flex flex-wrap align-items-center gap-2 ms-4">
                        <Badge bg={getStatusVariant(lesson.status)}>
                          {lesson.status === 'in-progress' ? '▶ In Progress' : lesson.status}
                        </Badge>
                        <Badge bg={getDifficultyVariant(lesson.difficulty)}>
                          {lesson.difficulty}
                        </Badge>
                        <span className="small text-muted">{lesson.subject}</span>
                      </div>

                      <div className="d-flex align-items-center gap-3 mt-2 ms-4 small text-muted flex-wrap">
                        <span className="d-flex align-items-center gap-1">
                          <Clock size={12} />
                          {lesson.duration}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={12} />
                          {lesson.scheduledFor}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-muted flex-shrink-0"
                      style={{ transform: expandedLesson === lesson.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease-in-out' }}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedLesson === lesson.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-top"
                      >
                        <p className="small text-muted mb-3">
                          This lesson will cover the fundamental concepts with interactive voice explanations
                          and adaptive pacing based on your understanding.
                        </p>

                        <div className="d-flex gap-2 flex-wrap">
                          {lesson.status === 'scheduled' && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartLesson(lesson.id);
                              }}
                            >
                              <BookOpen size={16} className="me-1" />
                              Start Now
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              announceAction('Rescheduling lesson');
                            }}
                          >
                            Reschedule
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

        {lessons.length === 0 && (
          <div className="text-center py-5">
            <BookOpen size={64} className="text-secondary mx-auto mb-3" />
            <p className="text-muted mb-2">No lessons scheduled yet</p>
            <p className="small text-secondary">Say "Plan a lesson" to get started</p>
          </div>
        )}

        <div className="pt-3 border-top">
          <Button
            variant="link"
            size="sm"
            className="w-100 d-flex align-items-center justify-content-center gap-2 text-primary text-decoration-none py-2"
            aria-label="Use voice commands to manage lessons"
          >
            <Mic size={16} />
            <span>Say "Plan a lesson" or "Show my schedule"</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
