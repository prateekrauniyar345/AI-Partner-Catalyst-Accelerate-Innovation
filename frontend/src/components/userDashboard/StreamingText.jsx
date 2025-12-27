import { useState, useEffect } from 'react';

export function StreamingText({ fullText, animate = false, speed = 20 }) {
  const [displayedText, setDisplayedText] = useState(animate ? '' : fullText);

  // If animate prop changes from true to false, we need to show the full text.
  // Also if the text content changes for a non-animating bubble.
  useEffect(() => {
    if (!animate) {
      setDisplayedText(fullText);
    }
  }, [animate, fullText]);

  // When a new message comes in with animate=true, reset the text to start the effect
  useEffect(() => {
    if (animate) {
      setDisplayedText('');
    }
  }, [animate, fullText]);


  useEffect(() => {
    if (animate && displayedText.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, fullText, animate, speed]);

  return <p className="mb-1 small" style={{ lineHeight: 1.4 }}>{displayedText}</p>;
}
