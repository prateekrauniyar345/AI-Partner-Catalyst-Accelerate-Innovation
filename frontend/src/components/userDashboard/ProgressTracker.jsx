import { motion } from 'framer-motion';
import { Award, BookOpen, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/card';
import { Progress } from '../../UI/progress';

const mockProgress = [
  {
    subject: 'Mathematics',
    progress: 65,
    lessons: 13,
    totalLessons: 20,
    timeSpent: '4h 30m',
    lastAccessed: '2 hours ago',
    color: 'bg-primary',
  },
  {
    subject: 'Science',
    progress: 40,
    lessons: 8,
    totalLessons: 20,
    timeSpent: '3h 15m',
    lastAccessed: '1 day ago',
    color: 'bg-success',
  },
  {
    subject: 'History',
    progress: 85,
    lessons: 17,
    totalLessons: 20,
    timeSpent: '6h 45m',
    lastAccessed: '3 hours ago',
    color: 'bg-info',
  },
];

const achievements = [
  { id: 1, name: '7-Day Streak', icon: '🔥', earned: true },
  { id: 2, name: 'Quick Learner', icon: '⚡', earned: true },
  { id: 3, name: 'Curious Mind', icon: '🧠', earned: true },
  { id: 4, name: 'Master', icon: '🏆', earned: false },
];

export function ProgressTracker() {
  return (
    <div className="d-flex flex-column gap-4">
      {/* Overview Stats */}
      <div className="row g-2 g-md-3">
        <div className="col-6 col-lg-3">
          <Card className="border h-100">
            <CardContent className="pt-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{width: 48, height: 48, background: '#f3e8ff'}}>
                  <BookOpen className="text-primary" />
                </div>
                <div>
                  <div className="fs-4 fw-bold">38</div>
                  <div className="small text-muted">Lessons Done</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-6 col-lg-3">
          <Card className="border h-100">
            <CardContent className="pt-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{width: 48, height: 48, background: '#e6f0ff'}}>
                  <Clock className="text-info" />
                </div>
                <div>
                  <div className="fs-4 fw-bold">14h</div>
                  <div className="small text-muted">Study Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-6 col-lg-3">
          <Card className="border h-100">
            <CardContent className="pt-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{width: 48, height: 48, background: '#ecfdf5'}}>
                  <Target className="text-success" />
                </div>
                <div>
                  <div className="fs-4 fw-bold">7</div>
                  <div className="small text-muted">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-6 col-lg-3">
          <Card className="border h-100">
            <CardContent className="pt-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{width: 48, height: 48, background: '#fffbeb'}}>
                  <Award className="text-warning" />
                </div>
                <div>
                  <div className="fs-4 fw-bold">3/4</div>
                  <div className="small text-muted">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subject Progress */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="d-flex align-items-center gap-2">
            <TrendingUp className="text-primary" />
            Your Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockProgress.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="mb-0 fw-semibold">{subject.subject}</h4>
                    <span className="small fw-semibold text-primary">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </div>

              <div className="row g-2 mt-2 text-sm flex-wrap\">
                <div className="col-4 d-flex align-items-center gap-2 text-muted">
                  <CheckCircle className="text-success" style={{width: 16, height: 16}} />
                  <span className="small">{subject.lessons}/{subject.totalLessons} lessons</span>
                </div>
                <div className="col-4 d-flex align-items-center gap-2 text-muted">
                  <Clock className="text-info" style={{width: 16, height: 16}} />
                  <span className="small">{subject.timeSpent}</span>
                </div>
                <div className="col-4 text-muted">
                  <span className="small">Last: {subject.lastAccessed}</span>
                </div>
              </div>
              {index < mockProgress.length - 1 && <hr className="my-3" />}
            </motion.div>
          ))}

          {/* Voice command hint */}
          <div className="pt-3 border-top">
            <button
              className="btn btn-link btn-sm w-100 text-primary text-decoration-none py-2"
              aria-label="Say 'show my progress' to hear details"
            >
              💬 Say "Show my progress" to hear details
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="d-flex align-items-center gap-2">
            <Award className="text-warning" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="row g-3 mb-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="col-6 col-md-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-3 rounded border text-center transition-all cursor-pointer ${
                    achievement.earned
                      ? 'bg-light border-warning border-2'
                      : 'bg-light-gray border-secondary opacity-50'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${achievement.name} achievement ${achievement.earned ? 'earned' : 'not yet earned'}`}
                  style={{minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                >
                  <div style={{fontSize: 32}} className="mb-2">{achievement.icon}</div>
                  <div className="small fw-medium">{achievement.name}</div>
                  {achievement.earned && (
                    <div className="small text-success mt-1">✓ Earned</div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Voice command hint */}
          <div className="pt-3 border-top">
            <button
              className="btn btn-link btn-sm w-100 text-primary text-decoration-none py-2"
              aria-label="Say 'what are my achievements' to hear about them"
            >
              💬 Say "What are my achievements?" to learn more
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
