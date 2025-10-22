import { useEffect, useState } from 'react';

const useTimer = (duration: number, onTimeUp: () => void)  => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return { timeLeft, startTimer, resetTimer };
};

export default useTimer;