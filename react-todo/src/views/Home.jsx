import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import _ from "lodash";

function User () {
  const [userName, setUserName] = useState('张三');
  const [count, setCount] = useState(0);

  function handleNameChange() {
    setUserName('张三aaaaaaaaaa');
  }
  

  const inc = useCallback( () => setCount(count + 1), [count]);

  return (
    <div>
      <div>{userName}</div>
      <button onClick={handleNameChange}>change name</button>
      <button onClick={inc}>{count}</button>
      <Test />
      <TextInputWithFocusButton />
      <Test2 />
      <IntervalTest />
    </div>
  );
}

function useThrottle (fuc, time) {
  const ref = useRef()
  ref.current = fuc
  console.log('2222')
  return useMemo(() => {
    return _.throttle(function (...params) {
      return ref.current(...params)
    }, time)
  }, [time])
}

function Test () {
  const [c, setc] = useState(1)
  
  const f = useThrottle(function () {
    setc(c + 1) 
  }, 2000)
  

  return (
    <div onMouseMove={f} style={{width: '100px', height: '100px', border: '1px solid'}}>
      {c}
    </div>
  );
}

function useThrottle1(fuc, time) {
  const ref = useRef()
  const lastTime = useRef(0)

  ref.current = fuc

  return useCallback(function(...args) {
    const now = Date.now()
    if (now - lastTime.current > time) {
      lastTime.current = now
      return ref.current(...args)
    }
  }, [time])
}

function Test2 () {
  const [c, setc] = useState(1)
  
  const f = useThrottle1(function () {
    setc(c + 1) 
  }, 2000)
  

  return (
    <div onMouseMove={f} style={{width: '100px', height: '100px', border: '1px solid'}}>
      {c}
    </div>
  );
}

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

function useInterval(fuc, time) {
  const ref = useRef()
  ref.current = fuc

  useEffect(() => {
    let id = setInterval(() => ref.current(), time)
    return () => {
      clearInterval(id)
    }
  }, [time])
}

function IntervalTest() {
  const [time, setTime] = useState(1000)
  const [c, setc] = useState(0)

  useInterval(()=> {
    setc(c + 1)
  }, time)

  function handleTimeChange(e) {
    setTime(Number(e.target.value))
  }

  return (
    <div>
      <span>{c}</span>
      <input type="text" value={time} onChange={handleTimeChange} />
    </div>
  )
}

export { User as Home};
