export function getStorageData(key: string) {
    return sessionStorage.getItem(key);
  }
  
  export function setStorageData(key: string, value: any) {
    return sessionStorage.setItem(key, value);
  }
  
  export function removeStorageData(key: string) {
    return sessionStorage.removeItem(key);
  }
  