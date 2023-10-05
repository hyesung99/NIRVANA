export const getItem = <T>(key: string, defaultValue?: T): T => {
  const value = localStorage.getItem(key);
  if (!value && !defaultValue) {
    throw new Error('No value found');
  }
  return value ? JSON.parse(value) : defaultValue;
};

export const setItem = (key: string, value: unknown) => {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};
