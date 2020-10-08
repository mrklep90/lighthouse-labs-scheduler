import { useState } from 'react';

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //---------------------------------------------------------------------------------------
  // Transition - Advances to a new mode, adds mode to history state
  //---------------------------------------------------------------------------------------
  function transition(newMode, replace = false) {
    
    setMode(newMode);
    setHistory(prev => {
      let newHistory = [...prev];
      // Allows current mode to be replaced with new one
      if (replace) {
        newHistory = newHistory.slice(0, -1);
      }
      return newHistory = [...newHistory, newMode];
    });

  }
  //---------------------------------------------------------------------------------------
  // Back - Returns to previous mode in history state
  //---------------------------------------------------------------------------------------
  function back() {
    
    setHistory(prev => {
      let newHistory = [...prev];
      // Prevents being able to return past the initial mode
      if (newHistory.length > 1) {
        newHistory = newHistory.slice(0, -1);
      }
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    })

  }
  
  return { mode, history, transition, back };

}



