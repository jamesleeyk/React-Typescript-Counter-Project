import React, { useEffect, useState } from 'react';
import './App.css';
import { useReadyTimer } from './useReadyTimer';

const App: React.FC = () => {
  
  const [count, setCount] = useState(0);
  const [clearCount, setClearCount] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const increment = () => {
    setCount(count + 1);
  }

  const clear = () => {
    setCount(0);
    setClearCount(clearCount + 1);
  }

  const {secondsPassed} = useReadyTimer();

  useEffect(() => {
    if(secondsPassed >= 5) {
      setBtnDisabled(false);
    }
    }, [secondsPassed]);

  return (
    <div className="App">
      <span className="heading">James' Counter</span>
      <br />
      <br />
      <div className="counter">
        secondspassed: {secondsPassed}
        <br />
        <br />
        Count: {count}
        <br />
        <br />
        <button className="counter__inc-btn" onClick={increment} disabled={btnDisabled}>Increment</button>
        <button className="counter__clear-btn" onClick={clear} disabled={btnDisabled}>Clear</button>
        <br />
        <br />
        Number of times you clicked clear: {clearCount}
      </div>
    </div>
  );
}

export default App;
