import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Pause, SkipForward, Volume1, Volume2, Gauge } from 'lucide-react';
import { Button } from '../../UI/button';
import { Slider } from '../../UI/slider';

export function ActionStrip({ onAction }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([1.0]);
  const [volume, setVolume] = useState([80]);

  const handleAction = (action) => {
    onAction?.(action);
    announceAction(action);
  };

  const announceAction = (action) => {
    const messages = {
      rewind: 'Rewinding 10 seconds',
      play: 'Playback started',
      pause: 'Playback paused',
      skip: 'Skipped forward',
      speed: `Playback speed set to ${speed[0]}x`,
      volume: `Volume set to ${volume[0]}%`,
    };
    
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
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
            variant="outline"
            size="lg"
            onClick={() => handleAction('rewind')}
            className="btn btn-outline-secondary rounded-circle"
            aria-label="Rewind 10 seconds"
            title="Rewind (R)"
          >
            <RotateCcw className="" />
          </Button>

          <Button
            size="lg"
            onClick={() => {
              setIsPlaying(!isPlaying);
              handleAction(isPlaying ? 'pause' : 'play');
            }}
            className="btn btn-primary rounded-circle text-white"
            aria-label={isPlaying ? 'Pause playback' : 'Play or resume'}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <Pause className="" />
            ) : (
              <Play className="" />
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleAction('skip')}
            className="btn btn-outline-secondary rounded-circle"
            aria-label="Skip forward"
            title="Skip (S)"
          >
            <SkipForward className="" />
          </Button>
        </div>

        {/* Speed and Volume controls */}
        <div className="row g-3">
          {/* Speed control */}
          <div className="col-12 col-md-6">
            <div className="mb-2 d-flex align-items-center justify-content-between">
              <label htmlFor="speed-slider" className="d-flex align-items-center gap-2 small fw-medium text-secondary">
                <Gauge className="" />
                <span>Speed</span>
              </label>
              <span className="small fw-semibold text-primary" aria-live="polite">
                {speed[0].toFixed(1)}x
              </span>
            </div>
            <Slider
              id="speed-slider"
              value={speed}
              onValueChange={(value) => {
                setSpeed(value);
                handleAction('speed');
              }}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-100"
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
              <label htmlFor="volume-slider" className="d-flex align-items-center gap-2 small fw-medium text-secondary">
                {volume[0] > 50 ? (
                  <Volume2 className="" />
                ) : (
                  <Volume1 className="" />
                )}
                <span>Volume</span>
              </label>
              <span className="small fw-semibold text-primary" aria-live="polite">
                {volume[0]}%
              </span>
            </div>
            <Slider
              id="volume-slider"
              value={volume}
              onValueChange={(value) => {
                setVolume(value);
                handleAction('volume');
              }}
              min={0}
              max={100}
              step={5}
              className="w-100"
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
              <motion.span animate={{ rotate: 0 }}>▼</motion.span>
            </summary>
            <div className="mt-2 small text-secondary bg-light rounded p-3">
              <div className="d-flex justify-content-between">
                <span>Play/Pause:</span>
                <kbd className="px-2 py-1 bg-white border rounded">Space</kbd>
              </div>
              <div className="d-flex justify-content-between">
                <span>Rewind:</span>
                <kbd className="px-2 py-1 bg-white border rounded">R</kbd>
              </div>
              <div className="d-flex justify-content-between">
                <span>Skip:</span>
                <kbd className="px-2 py-1 bg-white border rounded">S</kbd>
              </div>
              <div className="d-flex justify-content-between">
                <span>Speed up/down:</span>
                <kbd className="px-2 py-1 bg-white border rounded">+ / -</kbd>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
