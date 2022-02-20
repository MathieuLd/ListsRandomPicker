import { createContext, useState, useEffect } from 'react';
import { DEFAULT_INTERVAL, areArrayEqual } from './utility'

export const IntervalContext = createContext();
export const SetIntervalContext = createContext();


function ContextProvider(props){

  const calculateDefaultInterval = () => localStorage.getItem("interval-"+props.listsHash) || DEFAULT_INTERVAL

  const [interval, setInterval] = useState(calculateDefaultInterval());
  
  const setLocalStorageInterval = () => {
    if(interval === DEFAULT_INTERVAL){
      localStorage.removeItem("interval-"+props.listsHash)
    }else{
      if(!areArrayEqual(props.lists, [""])) localStorage.setItem("interval-" + props.listsHash, interval)
    }
  }

  useEffect(() => setLocalStorageInterval(),[interval])
  
  return(
    <IntervalContext.Provider value={interval}>
      <SetIntervalContext.Provider value={setInterval}>
        {props.children}
      </SetIntervalContext.Provider>
    </IntervalContext.Provider>
  )
}

export default ContextProvider;