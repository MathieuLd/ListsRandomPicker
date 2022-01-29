import { useState, useEffect } from 'react'
import { InputGroup, InputLeftAddon, InputRightAddon, Input, IconButton } from '@chakra-ui/react';
import { LoopIcon } from "./assets/icons.js"
import InfiniteProgressBar from './InfiniteProgressBar'


function LoopGeneration(props){

  const iconStates = {
    default: "oneArrowLoop",
    running: "twoArrowLoop",
    stoping: "twoArrowOut"
  }

  const [isLooping, setIsLooping] = useState(false);
  const [interval, setInterval] = useState(2000);
  const [showProgress, setShowProgress] = useState(true);
  const [iconState, setIconState] = useState(iconStates.default);
  const [looperId, setLooperId] = useState(null);

  const handleToggleLoop = () => {setIsLooping(prevIsLooping => !prevIsLooping)}
  useEffect(() => updateLooper(),[isLooping])

  const handleChangeInterval = (event) => {setInterval(event.target.value * 1000); setShowProgress(false)}
  useEffect(() => {updateLooper(); setShowProgress(true)},[interval])
  
  const handleHoverLoop = () => setIconState((isLooping ? iconStates.stoping : iconStates.running))

  const handleUnhoverLoop = () => setIconState((isLooping ? iconStates.running : iconStates.default))
  

  const updateLooper = () => {
    if(isLooping){
      stopLooper()
      props.onGenerate()
      setLooperId(window.setInterval(() => {props.onGenerate()},interval));
      setIconState(iconStates.running);
    }else{
      stopLooper()
      setIconState(iconStates.default);
    }
  }

  const stopLooper = () => {
    window.clearInterval(looperId)
    setLooperId(null);
  }

  return ( 
    <>
      <InputGroup maxW='15rem'>
        <InputLeftAddon p='0'>
          <IconButton className='loopButton' onClick={handleToggleLoop} onMouseEnter={handleHoverLoop} onMouseLeave={handleUnhoverLoop} icon={<LoopIcon className={iconState} boxSize="1.5rem"/>}/>
        </InputLeftAddon>
        <Input type='number' step='0.1' value={interval===0 ? '' : interval/1000} onChange={handleChangeInterval}></Input>
        <InputRightAddon children='sec' bgColor='white'/>
      </InputGroup>
      {isLooping && (showProgress && <InfiniteProgressBar duration={interval}/>)}
    </>
  );
}


export default LoopGeneration;