import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, Gauge, MessageSquare, Eye, Lock, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../UI/card';
import { Button } from '../../UI/button';
import { Slider } from '../../UI/slider';
import { Switch } from '../../UI/switch';
import { Label } from '../../UI/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/select';

export function SettingsPanel({ isOpen, onClose }) {
  const [voiceSpeed, setVoiceSpeed] = useState([1.0]);
  const [voicePitch, setVoicePitch] = useState([1.0]);
  const [verbosity, setVerbosity] = useState('normal');
  const [supportiveMode, setSupportiveMode] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  if (!isOpen) return null;

  const announceChange = (setting, value) => {
    const announcement = document.createElement('div');
    announcement.className = 'visually-hidden';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `${setting} changed to ${value}`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" onClick={onClose}>
      <motion.div initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:20 }} onClick={(e)=>e.stopPropagation()} className="w-100" style={{maxWidth: '960px', maxHeight: '90vh', overflowY: 'auto'}}>
        <Card className="border shadow-lg">
          <CardHeader className="border-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <CardTitle className="d-flex align-items-center gap-2">
                  <Settings className="text-primary" />
                  Voice & Accessibility Settings
                </CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}><X /></Button>
            </div>
          </CardHeader>

          <CardContent className="pt-3">
            {/* Voice Settings */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Volume2 className="text-primary" />
                <h3 className="mb-0">Voice Profile</h3>
              </div>

              <div className="mb-3">
                <Label htmlFor="voice-select">Voice</Label>
                <Select defaultValue="emily">
                  <SelectTrigger id="voice-select" className="w-100">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emily">Emily (Female, Calm)</SelectItem>
                    <SelectItem value="michael">Michael (Male, Energetic)</SelectItem>
                    <SelectItem value="sophia">Sophia (Female, Warm)</SelectItem>
                    <SelectItem value="james">James (Male, Professional)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="small text-muted">Select the voice that feels most comfortable for you</p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Label htmlFor="voice-speed">Speaking Speed</Label>
                  <span className="small fw-semibold text-primary">{voiceSpeed[0].toFixed(1)}x</span>
                </div>
                <Slider id="voice-speed" value={voiceSpeed} onValueChange={(value) => { setVoiceSpeed(value); announceChange('Speaking speed', `${value[0].toFixed(1)}x`); }} min={0.5} max={2.0} step={0.1} aria-label="Adjust speaking speed" />
                <div className="d-flex justify-content-between small text-muted"><span>Slower (0.5x)</span><span>Normal (1.0x)</span><span>Faster (2.0x)</span></div>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Label htmlFor="voice-pitch">Pitch</Label>
                  <span className="small fw-semibold text-primary">{voicePitch[0].toFixed(1)}x</span>
                </div>
                <Slider id="voice-pitch" value={voicePitch} onValueChange={(value) => { setVoicePitch(value); announceChange('Pitch', `${value[0].toFixed(1)}x`); }} min={0.5} max={1.5} step={0.1} aria-label="Adjust voice pitch" />
                <div className="d-flex justify-content-between small text-muted"><span>Lower</span><span>Normal</span><span>Higher</span></div>
              </div>
            </div>

            {/* Response Settings */}
            <div className="pt-3 border-top">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Response Style</h3>
              </div>

              {/* Verbosity */}
              <div className="mb-3">
                <Label htmlFor="verbosity-select">Detail Level</Label>
                <Select value={verbosity} onValueChange={(value) => { setVerbosity(value); announceChange('Detail level', value); }}>
                  <SelectTrigger id="verbosity-select" className="w-100"><SelectValue placeholder="Select detail level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brief">Brief - Short, concise answers</SelectItem>
                    <SelectItem value="normal">Normal - Balanced explanations</SelectItem>
                    <SelectItem value="detailed">Detailed - Comprehensive responses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Supportive mode */}
              <div className="d-flex align-items-center justify-content-between p-3 rounded" style={{background:'#f5f3ff'}}>
                <div className="flex-grow-1">
                  <Label htmlFor="supportive-mode" className="mb-0">Supportive Mode</Label>
                  <p className="small text-muted mb-0">AI adapts tone and pace when detecting fatigue or frustration</p>
                </div>
                <Switch id="supportive-mode" checked={supportiveMode} onCheckedChange={(checked)=>{ setSupportiveMode(checked); announceChange('Supportive mode', checked ? 'enabled' : 'disabled'); }} aria-label="Toggle supportive mode" />
              </div>
            </div>

            {/* Visual Accessibility */}
            <div className="pt-3 border-top">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Visual Accessibility</h3>
              </div>

              <div className="space-y-4">
                {/* High contrast */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <Label htmlFor="high-contrast" className="mb-0">High Contrast Mode</Label>
                    <p className="small text-muted mb-0">Increase contrast for better visibility</p>
                  </div>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={(checked)=>{ setHighContrast(checked); announceChange('High contrast', checked ? 'enabled' : 'disabled'); }} aria-label="Toggle high contrast mode" />
                </div>

                {/* Reduce motion */}
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <Label htmlFor="reduce-motion" className="mb-0">Reduce Motion</Label>
                    <p className="small text-muted mb-0">Minimize animations and transitions</p>
                  </div>
                  <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={(checked)=>{ setReduceMotion(checked); announceChange('Reduce motion', checked ? 'enabled' : 'disabled'); }} aria-label="Toggle reduce motion" />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="pt-3 border-top">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Privacy</h3>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 rounded" style={{background:'#e7f4ff'}}>
                <div className="flex-grow-1">
                  <Label htmlFor="private-mode" className="mb-0">Local-Only Mode</Label>
                  <p className="small text-muted mb-0">Process all conversations locally without server logging</p>
                </div>
                <Switch id="private-mode" checked={privateMode} onCheckedChange={(checked)=>{ setPrivateMode(checked); announceChange('Private mode', checked ? 'enabled' : 'disabled'); }} aria-label="Toggle private mode" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-3 pt-3 border-top">
              <Button className="flex-grow-1 btn btn-primary text-white" onClick={() => { announceChange('Settings','saved'); onClose(); }}>Save Changes</Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
