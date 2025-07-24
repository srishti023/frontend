import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (isActive && seconds === 0) {
      const audio = new Audio("/beep.mp3");
      audio.play();

      setTimeout(() => {
        alert(isBreak ? "Break Over! Back to Study 🚀" : "Time to Take a Break ☕");
        setIsBreak(!isBreak);
        setSeconds(isBreak ? 1500 : 300); // 25 min or 5 min
      }, 500); // Wait 0.5s before alert so audio can play first
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">{isBreak ? "Break Time" : "Study Time"}</h2>
      <div className="pomodoro-time">{formatTime(seconds)}</div>
      <div className="pomodoro-buttons">
        <button
          onClick={() => setIsActive(!isActive)}
          className="pomodoro-btn start-btn"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setSeconds(isBreak ? 300 : 1500);
          }}
          className="pomodoro-btn reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;