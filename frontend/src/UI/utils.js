/**
 * Lightweight className helper.
 * Accepts strings, arrays, and objects: cn('a','b', ['c','d'], { 'e': true, 'f': false })
 */
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .map((item) => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      if (Array.isArray(item)) return cn(...item);
      if (typeof item === 'object') {
        return Object.keys(item).filter((k) => item[k]).join(' ');
      }
      return String(item);
    })
    .filter(Boolean)
    .join(' ');
}