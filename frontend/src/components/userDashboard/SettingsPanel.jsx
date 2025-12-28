import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, MessageSquare, Eye, Lock, X } from 'lucide-react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

export function SettingsPanel({ 
  isOpen, 
  onClose,
  voiceProfile = 'emily',
  setVoiceProfile,
  voiceSpeed = 1.0,
  setVoiceSpeed,
  voicePitch = 1.0,
  setVoicePitch,
  verbosity = 'normal',
  setVerbosity,
  supportiveMode = true,
  setSupportiveMode,
  highContrast = false,
  setHighContrast,
  reduceMotion = false,
  setReduceMotion,
  privateMode = false,
  setPrivateMode
}) {

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
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5">
          <Settings className="text-primary me-2" />
          Voice & Accessibility Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <p className="text-muted">Customize your learning experience</p>

        {/* Voice Settings */}
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center gap-2">
            <Volume2 className="text-primary" />
            <h6 className="mb-0 fw-semibold">Voice Profile</h6>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="voice-select">Voice</Form.Label>
              <Form.Select 
                id="voice-select" 
                value={voiceProfile} 
                onChange={e => { 
                  setVoiceProfile(e.target.value); 
                  announceChange('Voice', e.target.value); 
                }}
              >
                <option value="emily">Emily (Female, Calm)</option>
                <option value="michael">Michael (Male, Energetic)</option>
                <option value="sophia">Sophia (Female, Warm)</option>
                <option value="james">James (Male, Professional)</option>
              </Form.Select>
              <Form.Text>Select the voice that feels most comfortable for you.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label htmlFor="voice-speed">Speaking Speed</Form.Label>
                <span className="small fw-semibold text-primary">{voiceSpeed.toFixed(1)}x</span>
              </div>
              <Form.Range id="voice-speed" value={voiceSpeed} onChange={e => { setVoiceSpeed(parseFloat(e.target.value)); announceChange('Speaking speed', `${parseFloat(e.target.value).toFixed(1)}x`); }} min={0.5} max={2.0} step={0.1} />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label htmlFor="voice-pitch">Pitch</Form.Label>
                <span className="small fw-semibold text-primary">{voicePitch.toFixed(1)}x</span>
              </div>
              <Form.Range id="voice-pitch" value={voicePitch} onChange={e => { setVoicePitch(parseFloat(e.target.value)); announceChange('Pitch', `${parseFloat(e.target.value).toFixed(1)}x`); }} min={0.5} max={1.5} step={0.1} />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Response Style */}
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center gap-2">
            <MessageSquare className="text-primary" />
            <h6 className="mb-0 fw-semibold">Response Style</h6>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="verbosity-select">Detail Level</Form.Label>
              <Form.Select id="verbosity-select" value={verbosity} onChange={e => { setVerbosity(e.target.value); announceChange('Detail level', e.target.value); }}>
                <option value="brief">Brief - Short, concise answers</option>
                <option value="normal">Normal - Balanced explanations</option>
                <option value="detailed">Detailed - Comprehensive responses</option>
              </Form.Select>
            </Form.Group>
            <Form.Check type="switch" id="supportive-mode" label="Supportive Mode" checked={supportiveMode} onChange={e => { setSupportiveMode(e.target.checked); announceChange('Supportive mode', e.target.checked ? 'enabled' : 'disabled'); }} />
            <Form.Text>AI adapts tone and pace when detecting fatigue or frustration.</Form.Text>
          </Card.Body>
        </Card>

        {/* Accessibility */}
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center gap-2">
            <Eye className="text-primary" />
            <h6 className="mb-0 fw-semibold">Visual Accessibility</h6>
          </Card.Header>
          <Card.Body>
            <Form.Check type="switch" id="high-contrast" label="High Contrast Mode" checked={highContrast} onChange={e => { setHighContrast(e.target.checked); announceChange('High contrast', e.target.checked ? 'enabled' : 'disabled'); }} />
            <Form.Text>Increase contrast for better visibility.</Form.Text>
            <hr/>
            <Form.Check type="switch" id="reduce-motion" label="Reduce Motion" checked={reduceMotion} onChange={e => { setReduceMotion(e.target.checked); announceChange('Reduce motion', e.target.checked ? 'enabled' : 'disabled'); }} />
            <Form.Text>Minimize animations and transitions.</Form.Text>
          </Card.Body>
        </Card>
        
        {/* Privacy */}
        <Card>
          <Card.Header className="d-flex align-items-center gap-2">
            <Lock className="text-primary" />
            <h6 className="mb-0 fw-semibold">Privacy</h6>
          </Card.Header>
          <Card.Body>
            <Form.Check type="switch" id="private-mode" label="Local-Only Mode" checked={privateMode} onChange={e => { setPrivateMode(e.target.checked); announceChange('Private mode', e.target.checked ? 'enabled' : 'disabled'); }} />
            <Form.Text>Process all conversations locally without server logging.</Form.Text>
          </Card.Body>
        </Card>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={() => { announceChange('Settings', 'saved'); onClose(); }}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
