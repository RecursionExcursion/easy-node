export const defaultIfUndefined = (value: any, defaultValue: any) => {
  return value === undefined ? defaultValue : value;
};

export const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let intervalId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (intervalId) clearTimeout(intervalId);
    intervalId = setTimeout(() => {
      return fn(...args);
    }, delay);
  };
};

export const throttle = (fn: (...args: any[]) => void, delay: number) => {
  let previousCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - previousCall < delay) return;
    previousCall = now;
    return fn(...args);
  };
};

export const pipe =
  (...fns: ((...args: any[]) => any)[]) =>
  (val: any): any =>
    fns.reduce((prev, fn) => fn(prev), val);
