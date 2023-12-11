import React, { useState, useEffect } from 'react';
import './style.css'
export default function Timer({ timeout, start }) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (timeElapsed >= timeout) return;

    const intervalId = setInterval(() => {
      setTimeElapsed(timeElapsed + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeElapsed, timeout]);

  const minutes = Math.floor(timeElapsed / 60000);
  const seconds = ((timeElapsed % 60000) / 1000).toFixed(0);

  return (
    <div className='timer-container' style={{display:`${start?'block':'none'}`}}>
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </div>
  );
};
