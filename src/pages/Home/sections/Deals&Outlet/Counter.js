import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import styles from "./Styles.module.scss";

const Counter = () => {
  const countDownDate = new Date("Jan 5, 2124 0:0:0").getTime();
  const [countDown, setCountDown] = useState({
    hour: 0,
    minute: 0,
    seconds: 0
  })
  const addZero = (number) => {
    return number <= 9? `0${number}`: number
  };
  useEffect(() => {
    const time = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      setCountDown({  
        hour: addZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minute: addZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: addZero(Math.floor((distance % (1000 * 60)) / 1000))
      })
    }, 1000);
    return () => {
      clearInterval(time)
    }
  }, [countDown])
  
  return (
    <div className={styles.body3}>
    <div className={styles.clock}>
      <div className={styles.clockItem}>
        <span className={styles.forAfter}>{countDown.hour}</span>
        <p>hours</p>
      </div>
      <div className={styles.clockItem}>
        <span className={styles.forAfter}>{countDown.minute}</span>
        <p>minutes</p>
      </div>
      <div className={styles.clockItem}>
        <span>{countDown.seconds}</span>
        <p>seconds</p>
      </div>
    </div>
  </div>
  );
}

export default memo(Counter);
