import { motion } from 'framer-motion';
import { Mic, BookOpen, Target, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../UI/card';

const voiceCommands = [
  {
    category: 'Learning',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
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
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
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
    color: 'text-green-600',
    bgColor: 'bg-green-100',
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
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
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
    <Card className="border">
      <CardHeader>
        <CardTitle className="d-flex align-items-center gap-2">
          <Mic className="text-primary" />
          Voice Commands Guide
        </CardTitle>
      </CardHeader>

      <CardContent>
        {voiceCommands.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: categoryIndex * 0.1 }} className="mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="d-inline-flex align-items-center justify-content-center rounded" style={{width:32,height:32, background: category.bgColor==='bg-purple-100'?'#f3e8ff': category.bgColor==='bg-blue-100'?'#e6f0ff': category.bgColor==='bg-green-100'?'#ecfdf5':'#fff4e6'}}>
                  <Icon className={category.color==='text-purple-600'?'text-primary':''} />
                </div>
                <h4 className="mb-0">{category.category}</h4>
              </div>

              <div className="ms-3">
                {category.commands.map((command, commandIndex) => (
                  <motion.div key={commandIndex} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: categoryIndex * 0.1 + commandIndex * 0.05 }} className="mb-2">
                    <div className="d-flex align-items-start gap-3 p-2 rounded" style={{cursor:'default'}}>
                      <div style={{width:8,height:8, background:'#a78bfa', borderRadius:999, marginTop:6}} />
                      <div className="flex-grow-1">
                        <code className="small fw-medium text-primary bg-light px-2 py-1 rounded">{command.phrase}</code>
                        <p className="small text-muted mt-1 mb-0">{command.action}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Help footer */}
        <div className="pt-3 border-top">
          <div className="d-flex align-items-start gap-3 p-3" style={{background:'#e8f4ff', borderRadius:8}}>
            <HelpCircle className="text-primary" />
            <div className="flex-grow-1">
              <h5 className="small fw-semibold mb-1">Need Help?</h5>
              <p className="small text-muted mb-0">Say <strong>"Help"</strong> or <strong>"What can you do?"</strong> anytime to get personalized assistance with voice commands.</p>
            </div>
          </div>
        </div>

        {/* Accessibility note */}
        <div className="pt-3 border-top text-center">
          <p className="small text-muted mb-0">💡 <strong>Accessibility Tip:</strong> All visual elements have spoken descriptions. You can navigate this entire dashboard using only your voice.</p>
        </div>
      </CardContent>
    </Card>
  );
}
