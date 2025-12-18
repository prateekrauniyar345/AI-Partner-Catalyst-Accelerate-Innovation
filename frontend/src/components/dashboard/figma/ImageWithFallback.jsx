import React, { useState } from 'react';

export function ImageWithFallback({ src, alt = '', className = '', fallbackSrc = null }) {
  const [errored, setErrored] = useState(false);

  const handleError = () => setErrored(true);

  if (!src || errored) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} />;
    }

    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-full overflow-hidden ${className}`} aria-hidden>
        <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={handleError} />;
}

export default ImageWithFallback;
