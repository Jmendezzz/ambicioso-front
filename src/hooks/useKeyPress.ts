import { useEffect } from "react";

export const useKeyPress = (trigger: () => void, eventCode: string) => {
    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.code === eventCode) {
          trigger();
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  };