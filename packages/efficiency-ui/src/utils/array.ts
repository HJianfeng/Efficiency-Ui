export type Arrayable<T> = T | T[];

export const ensureArray = (arr) => {
  if (!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr) ? arr : [arr];
};
