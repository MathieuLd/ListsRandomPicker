import CryptoJS from 'crypto-js'

// Global constants
export const DEFAULT_INTERVAL = 5000

// Utility functions
export const areArrayEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);

export const isJsonString = (str) => {
  try {JSON.parse(str);} catch (e) {return false;}
  return true;
}

export const randomInt = (max) => Math.floor(Math.random() * max);

export const getJsObjectReducedHash = (elem) => CryptoJS.SHA256(JSON.stringify(elem)).toString().slice(0,10)

export const removeEmptyStrFromArray = (array) => array.filter(elem => elem !== "")