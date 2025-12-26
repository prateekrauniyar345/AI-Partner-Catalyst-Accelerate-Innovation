const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const CURRENT_LEVEL = import.meta.env.DEV
  ? LOG_LEVELS.debug
  : LOG_LEVELS.info;


console.log("current log level is : ", CURRENT_LEVEL);

function log(level, message, meta = {}) {
  if (LOG_LEVELS[level] < CURRENT_LEVEL) return;

  const payload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
    env: import.meta.env.MODE,
  };

  // Dev: console
  if (import.meta.env.DEV) {
    console[level]?.(payload) || console.log(payload);
  }

  // Prod: send to backend or log service
  if (import.meta.env.PROD) {
    try {
      const body = JSON.stringify(payload);
      const maxBytes = Number(import.meta.env.VITE_FRONTEND_LOG_MAX_BYTES) || 10000;
      if (body.length > maxBytes) return;

      const endpoint = "/v1/logs"; // backend OpenAPI prefix + logs blueprint

      // prefer sendBeacon for unload-safe logging, fallback to fetch
      if (navigator && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch (e) {
      // silence logging errors in production
    }
  }
}

export const logger = {
  debug: (msg, meta) => log("debug", msg, meta),
  info: (msg, meta) => log("info", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  error: (msg, meta) => log("error", msg, meta),
};
