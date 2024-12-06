import { useEffect, useState } from 'react';

export const useCountdown = (initialCount: number, trigger: () => void) => {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => trigger(), 2000);
    }
  }, [countdown]);

  return countdown;
};
