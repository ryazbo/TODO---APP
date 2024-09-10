export const storage = {
    getItem(key: string, fallbackValue: any) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return fallbackValue;
      }
    },
    setItem(key: string, value: string) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        //
      }
    },
    removeItem(key: string) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        //
      }
    },
  };
  