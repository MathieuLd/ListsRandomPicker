// Global constants
export const DEFAULT_INTERVAL = 5000

// Utility functions
export const areArrayEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);

export const isJsonString = (str) => {
  try {JSON.parse(str);} catch (e) {return false;}
  return true;
}

export const randomInt = (max) => Math.floor(Math.random() * max);