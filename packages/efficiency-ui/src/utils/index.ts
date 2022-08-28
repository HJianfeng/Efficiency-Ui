export const isNumber = (data) => {
  return typeof data === 'number';
};

export const isObject = (data) => {
  return typeof data === 'object' && !Array.isArray(data);
};
