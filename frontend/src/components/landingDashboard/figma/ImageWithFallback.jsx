import React, { useState } from 'react';

export function ImageWithFallback({ src, alt = '', className = '', fallbackSrc = null, style = {} }) {
  const [errored, setErrored] = useState(false);

  const handleError = () => setErrored(true);

  if (!src || errored) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} style={style} />;
    }

    return (
      <div 
        className={`bg-light d-flex align-items-center justify-content-center rounded-circle overflow-hidden ${className}`} 
        aria-hidden
        style={style}
      >
        <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} style={style} onError={handleError} />;
}

export default ImageWithFallback;
