import { useEffect } from "react";

export const useKeyPress = (trigger: () => void, eventCode: string) => {
    useEffect(() => {
      console.log('useKeyPress');
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.code === eventCode) {
          trigger();
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [trigger, eventCode]);
  };