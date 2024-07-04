import React, { useState, useEffect } from 'react';

const TimeCounter: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-white'>
      <p className='text-white' >Elapsed Time: {seconds} seconds</p>
    </div>
  );
};

export default TimeCounter;