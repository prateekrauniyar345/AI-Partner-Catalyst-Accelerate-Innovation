import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Pause, SkipForward, Volume1, Volume2, Gauge } from 'lucide-react';
import { Button, Form } from 'react-bootstrap';

export function ActionStrip({ onAction }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(80);

  const handleAction = (action, value) => {
    onAction?.(action, value);
    announceAction(action, value);
  };

  const announceAction = (action, value) => {
    const messages = {
      rewind: 'Rewinding 10 seconds',
      play: 'Playback started',
      pause: 'Playback paused',
      skip: 'Skipped forward',
      speed: `Playback speed set to ${value}x`,
      volume: `Volume set to ${value}%`,
    };
    
    const announcement = document.createElement('div');
    announcement.className = 'visually-hidden';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = messages[action] || action;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <div className="w-100 bg-white rounded border p-3 shadow-sm">
      <div className="d-flex flex-column gap-3">
        {/* Main controls */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => handleAction('rewind')}
            className="rounded-circle p-3"
            aria-label="Rewind 10 seconds"
            title="Rewind (R)"
          >
            <RotateCcw size={20} />
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              const newIsPlaying = !isPlaying;
              setIsPlaying(newIsPlaying);
              handleAction(newIsPlaying ? 'play' : 'pause');
            }}
            className="rounded-circle p-3"
            aria-label={isPlaying ? 'Pause playback' : 'Play or resume'}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white" />
            )}
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => handleAction('skip')}
            className="rounded-circle p-3"
            aria-label="Skip forward"
            title="Skip (S)"
          >
            <SkipForward size={20} />
          </Button>
        </div>

        {/* Speed and Volume controls */}
        <div className="row g-3">
          {/* Speed control */}
          <div className="col-12 col-md-6">
            <div className="mb-2 d-flex align-items-center justify-content-between">
              <label htmlFor="speed-slider" className="d-flex align-items-center gap-2 small fw-normal text-secondary">
                <Gauge size={16} />
                <span>Speed</span>
              </label>
              <span className="small fw-semibold text-primary" aria-live="polite">
                {speed.toFixed(1)}x
              </span>
            </div>
            <Form.Range
              id="speed-slider"
              value={speed}
              onChange={(e) => {
                const newSpeed = parseFloat(e.target.value);
                setSpeed(newSpeed);
                handleAction('speed', newSpeed);
              }}
              min={0.5}
              max={2.0}
              step={0.1}
              aria-label="Playback speed"
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>2.0x</span>
            </div>
          </div>

          {/* Volume control */}
          <div className="col-12 col-md-6">
            <div className="mb-2 d-flex align-items-center justify-content-between">
              <label htmlFor="volume-slider" className="d-flex align-items-center gap-2 small fw-normal text-secondary">
                {volume > 50 ? (
                  <Volume2 size={16} />
                ) : (
                  <Volume1 size={16} />
                )}
                <span>Volume</span>
              </label>
              <span className="small fw-semibold text-primary" aria-live="polite">
                {volume}%
              </span>
            </div>
            <Form.Range
              id="volume-slider"
              value={volume}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value, 10);
                setVolume(newVolume);
                handleAction('volume', newVolume);
              }}
              min={0}
              max={100}
              step={5}
              aria-label="Volume level"
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>Mute</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="pt-2 border-top mt-2">
          <details>
            <summary className="small text-muted d-flex align-items-center justify-content-center gap-1 p-1" style={{cursor:'pointer'}}>
              <span>Keyboard shortcuts</span>
            </summary>
            <div className="mt-2 small text-secondary bg-light rounded p-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Play/Pause:</span>
                <kbd className="px-2 py-1 bg-white border rounded">Space</kbd>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>Rewind:</span>
                <kbd className="px-2 py-1 bg-white border rounded">R</kbd>
              </div>
              <div className="d-flex justify-content-between">
                <span>Skip:</span>
                <kbd className="px-2 py-1 bg-white border rounded">S</kbd>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
