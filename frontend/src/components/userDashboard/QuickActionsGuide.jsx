import { motion } from 'framer-motion';
import { Mic, BookOpen, Target, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { Card } from 'react-bootstrap';

const voiceCommands = [
  {
    category: 'Learning',
    icon: BookOpen,
    variant: 'primary',
    commands: [
      { phrase: '"Start a lesson"', action: 'Begin your next scheduled lesson' },
      { phrase: '"Teach me about [topic]"', action: 'Start learning about any subject' },
      { phrase: '"Explain again"', action: 'Repeat the last explanation' },
      { phrase: '"Slow down" / "Speed up"', action: 'Adjust speaking pace' },
      { phrase: '"Take a break"', action: 'Pause your learning session' },
    ],
  },
  {
    category: 'Progress',
    icon: BarChart3,
    variant: 'info',
    commands: [
      { phrase: '"Show my progress"', action: 'View learning statistics' },
      { phrase: '"What did I learn today?"', action: 'Daily summary' },
      { phrase: '"My achievements"', action: 'List earned badges' },
      { phrase: '"How am I doing?"', action: 'Get progress report' },
    ],
  },
  {
    category: 'Planning',
    icon: Target,
    variant: 'success',
    commands: [
      { phrase: '"Plan a lesson"', action: 'Schedule new learning session' },
      { phrase: '"Create project"', action: 'Start a new project' },
      { phrase: '"Show my schedule"', action: 'View upcoming lessons' },
      { phrase: '"What\'s next?"', action: 'Next scheduled activity' },
    ],
  },
  {
    category: 'Settings',
    icon: Settings,
    variant: 'warning',
    commands: [
      { phrase: '"Change voice"', action: 'Select different AI voice' },
      { phrase: '"Speak slower" / "faster"', action: 'Adjust voice speed' },
      { phrase: '"More details" / "Less details"', action: 'Change verbosity' },
      { phrase: '"Settings"', action: 'Open settings panel' },
    ],
  },
];

export function QuickActionsGuide() {
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5" className="d-flex align-items-center gap-2">
          <Mic className="text-primary" />
          Voice Commands Guide
        </Card.Title>
      </Card.Header>

      <Card.Body>
        {voiceCommands.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: categoryIndex * 0.1 }} className="mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className={`d-inline-flex align-items-center justify-content-center rounded bg-${category.variant}-subtle`} style={{ width: 32, height: 32 }}>
                  <Icon className={`text-${category.variant}`} />
                </div>
                <h4 className="mb-0 h6">{category.category}</h4>
              </div>

              <div className="ms-3">
                {category.commands.map((command, commandIndex) => (
                  <motion.div key={commandIndex} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: categoryIndex * 0.1 + commandIndex * 0.05 }} className="mb-2">
                    <div className="d-flex align-items-start gap-3 p-2 rounded">
                      <div className={`bg-${category.variant}`} style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                      <div className="flex-grow-1">
                        <code className={`small fw-normal text-${category.variant} bg-${category.variant}-subtle px-2 py-1 rounded`}>{command.phrase}</code>
                        <p className="small text-muted mt-1 mb-0">{command.action}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        <div className="pt-3 border-top">
          <div className="d-flex align-items-start gap-3 p-3 bg-primary-subtle rounded">
            <HelpCircle className="text-primary" />
            <div className="flex-grow-1">
              <h5 className="small fw-semibold mb-1">Need Help?</h5>
              <p className="small text-muted mb-0">Say <strong>"Help"</strong> or <strong>"What can you do?"</strong> anytime to get personalized assistance with voice commands.</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-top text-center">
          <p className="small text-muted mb-0">💡 <strong>Accessibility Tip:</strong> All visual elements have spoken descriptions. You can navigate this entire dashboard using only your voice.</p>
        </div>
      </Card.Body>
    </Card>
  );
}
