import React ,{ useEffect, useState } from 'react'
import uuid from 'react-uuid';
import classes from './Timer.module.css'

const Timer = ({contractions,setContractions}) => {
  const DisplayTimeTemp = {
    hour: '00',
    min: '00',
    sec: '00'
  };
  const TimerTemp = {
    id: '',
    start: 0,
    end: 0
  };

  const [starting,setStarting] = useState(false);
  const [sinceLast, setSinceLast] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [resetTimeout, setResetTimeout] = useState(0);
  const [displayTime,setDisplayTime] = useState(DisplayTimeTemp)
  const [timer, setTimer] = useState(TimerTemp)

  function getTimeStringObject(time) {
    return {
      hr : time.getUTCHours().toString(),
      min : time.getUTCMinutes().toString(),
      sec : time.getUTCSeconds().toString()
    }
  }

  useEffect(()=> {
    let Interval = setInterval(()=> {
      let since = new Date(Date.now() - ((contractions[0]||[]).end || 0));
      let {hr, min ,sec} = getTimeStringObject(since);
      let newSinceLast = (hr ? hr + 'hr' : '' )+(min ? min + 'min' : '')+(sec ? sec + 'sec' : '');
      setSinceLast(newSinceLast);
    });
    return () => {
      clearInterval(Interval);
    };
  });

  function handelClick() {
    !starting ? handelStart() : handelEnd();
    setStarting(!starting);
  }

  function handelStart() {
    // 停止自動重置計時器
    clearTimeout(resetTimeout);
    // 重置顯示時間
    resetDisplayTime();

    let newTimer = {...timer,id: uuid(),start: Date.now()};
    setTimer(newTimer);

    // 設定循環計時器
    const newInterval = setInterval(()=> {
      // 計算顯示時間
      calculateTimeing(newTimer.start);
    },1000);
    setIntervalId(newInterval);
  }

  function handelEnd() {
    // 停止循環計時器
    clearInterval(intervalId);
    setIntervalId(0);

    let newTimer = {...timer,end: Date.now()};
    setTimer(newTimer);
    sendContractions(newTimer);

    let newResetTimeout = setTimeout(()=> {
      resetDisplayTime();
    },3000);
    setResetTimeout(newResetTimeout);
  }

  function calculateTimeing(start) {
    let apart = new Date(Date.now() - start);

    let {hr, min, sec} = getTimeStringObject(apart);

    setDisplayTime({
      hour: hr.padStart(2,'00'),
      min: min.padStart(2,'00'),
      sec: sec.padStart(2,'00')
    })
  }

  function sendContractions(newTimer) {
    setContractions([newTimer,...contractions]);
    resetTimer();
  }

  function resetTimer() {
    setTimer(TimerTemp);
  }

  function resetDisplayTime() {
    setDisplayTime(DisplayTimeTemp);
  }
  return (
    <div>
      <div className={classes.clock}>
        {displayTime.hour}:{displayTime.min}:{displayTime.sec}
      </div>
      <div>
        {
          contractions.length > 0 ? (
            <div>
              <div>Timer since last contractions</div>
              <b>{sinceLast}</b>
            </div>
          )  : (
            <div>
              <div>Start recording your contractions</div>
            </div>
          )
        }
        <button className={classes.startBtn} onClick={() => handelClick()}>{starting ? 'End Timing' : 'Start Timing'}</button>
      </div>
    </div>
  )
}

export default Timer