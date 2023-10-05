export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    throw new Error('No such key in localStorage');
  }
};

export const setItem = (key: string, value: unknown) => {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};
