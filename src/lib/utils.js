/** Join class names, skipping falsy values. */
export const cn = (...parts) => parts.filter(Boolean).join(' ');

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
