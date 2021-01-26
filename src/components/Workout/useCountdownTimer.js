import { useState , useRef } from 'react';

const useCountdownTimer = (finalTime) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  
  const handle = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime((t) => {
        const newTime = t + 1;
        if (newTime === finalTime) {
          clearInterval(countRef.current)
          setIsActive(false);
          setIsPaused(false);
        }
        return newTime;
      });
    }, 1000);
  };

  const handleStart = () => {
    setIsActive(true);
    handle();
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    handle();
  };

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  return { time, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
};

export default useCountdownTimer;