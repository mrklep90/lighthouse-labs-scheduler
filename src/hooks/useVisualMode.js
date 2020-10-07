
import { useState } from 'react';

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => {
      let newHistory = [...prev];
      if (replace) {
        newHistory = newHistory.slice(0, -1);
      }
      return newHistory = [...newHistory, newMode];
    });
  }

  function back() {
    setHistory(prev => {
      let newHistory = [...prev];
      if (newHistory.length > 1) {
        newHistory = newHistory.slice(0, -1);
      }
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    })
  };
  
  return { mode, history, transition, back };

}



