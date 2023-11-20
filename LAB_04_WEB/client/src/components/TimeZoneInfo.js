import React, { useState, useEffect } from 'react';

const TimeZoneInfo = () => {
  const [localTime, setLocalTime] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [userTimeZone, setUserTimeZone] = useState('');

 
  useEffect(() => {

    const getUserTimeZoneInfo = () => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimeZone(timeZone);
      };
      
    const updateTimes = () => {
      const now = new Date();

      const localTimeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      const localTimeString = now.toLocaleString(undefined, localTimeOptions);
      setLocalTime(localTimeString);

      const utcTimeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
      };
      const utcTimeString = now.toLocaleString(undefined, utcTimeOptions);
      setUtcTime(utcTimeString);

    

    };

    const intervalId = setInterval(updateTimes, 1000);
    updateTimes(); 
    getUserTimeZoneInfo();

    return () => clearInterval(intervalId);
  }, []);

  return (
  
    <div style={{ marginTop: '10px' }}>Тайм зона пользователя: {userTimeZone}
      <p>Локальное время: {localTime}</p>
      <p>Время в UTC: {utcTime}</p>
    </div>
  );
};

export default TimeZoneInfo;
