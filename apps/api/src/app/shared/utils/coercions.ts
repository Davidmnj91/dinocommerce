export const coerceArray = <T>(value: T | T[]) => (Array.isArray(value) ? value : [value]);
