import { motion } from 'framer-motion';
import { Mic, BookOpen, Target, BarChart3, Settings, HelpCircle, Code } from 'lucide-react';
import { Card } from 'react-bootstrap';

const voiceCommands = [
  {
    category: 'Navigation',
    icon: BarChart3,
    variant: 'info',
    commands: [
      { phrase: '"Show my progress"', action: 'Switch to the Progress Tracker' },
      { phrase: '"Open my courses"', action: 'View your Canvas courses' },
      { phrase: '"Go to projects"', action: 'Navigate to the Project Planner' },
      { phrase: '"Lesson plans"', action: 'Open your scheduled lessons' },
    ],
  },
  {
    category: 'System & Accessibility',
    icon: Settings,
    variant: 'warning',
    commands: [
      { phrase: '"Open settings"', action: 'Pop up the configuration modal' },
      { phrase: '"High contrast mode"', action: 'Toggle visual accessibility' },
      { phrase: '"Detailed responses"', action: 'Increase AI verbosity level' },
      { phrase: '"Change voice to Michael"', action: 'Select a different AI persona' },
      { phrase: '"Close settings"', action: 'Save and hide the settings panel' },
    ],
  },
  {
    category: 'Audio Controls',
    icon: Mic,
    variant: 'primary',
    commands: [
      { phrase: '"Speak slower"', action: 'Set playback speed to 0.8x' },
      { phrase: '"Speak faster"', action: 'Increase playback speed to 1.4x' },
      { phrase: '"Volume up / down"', action: 'Adjust agent audio levels' },
      { phrase: '"Reset speed"', action: 'Return to standard 1.0x pace' },
    ],
  },
  {
    category: 'Developer Tools',
    icon: Code,
    variant: 'success',
    commands: [
      { phrase: '"Log [message]"', action: 'Record a note to the system console' },
      { phrase: '"Alert me [message]"', action: 'Create a browser notification' },
    ],
  },
];

export function QuickActionsGuide() {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-bottom-0 pt-4">
        <Card.Title as="h5" className="d-flex align-items-center gap-2 fw-bold">
          <div className="p-2 bg-primary rounded-3">
            <Mic size={20} className="text-white" />
          </div>
          Voice Learning Commands
        </Card.Title>
        <p className="small text-muted mb-0 mt-2">
          VoiceEd Ally is listening! Try these commands to control your experience hands-free.
        </p>
      </Card.Header>

      <Card.Body>
        {voiceCommands.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div 
              key={category.category} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: categoryIndex * 0.1 }} 
              className="mb-4"
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <Icon size={18} className={`text-${category.variant}`} />
                <h4 className="mb-0 h6 fw-bold text-uppercase small tracking-wider">{category.category}</h4>
              </div>

              <div className="row g-2">
                {category.commands.map((command, commandIndex) => (
                  <div key={commandIndex} className="col-12 col-md-6">
                    <div className="p-2 rounded-3 border bg-light-subtle h-100">
                      <code className={`small fw-semibold text-${category.variant}`}>
                        {command.phrase}
                      </code>
                      <p className="x-small text-muted mb-0 mt-1" style={{ fontSize: '0.75rem' }}>
                        {command.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        <div className="pt-3 border-top mt-2">
          <div className="d-flex align-items-start gap-3 p-3 bg-primary-subtle rounded-3 border border-primary-subtle">
            <HelpCircle className="text-primary flex-shrink-0" />
            <div>
              <h5 className="small fw-bold mb-1">Confused?</h5>
              <p className="small text-muted mb-0">
                Say <strong>"What can I say?"</strong> and Ally will describe the available tools for your current screen.
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}