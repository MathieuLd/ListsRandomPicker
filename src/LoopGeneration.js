import { useState, useEffect, useContext } from 'react'
import { InputGroup, InputLeftAddon, InputRightAddon, Input, IconButton,useColorMode } from '@chakra-ui/react';
import { LoopIcon } from "./assets/icons.js"
import InfiniteProgressBar from './InfiniteProgressBar'
import { IntervalContext, SetIntervalContext } from './ContextProvider'


function LoopGeneration(props){

  const iconStates = {
    default: "oneArrowLoop",
    defaultRotate: "oneArrowLoop360",
    running: "twoArrowLoop",
    stoping: "twoArrowOut"
  }

  const [ isLooping, setIsLooping ] = useState(false);
  const [ showProgress, setShowProgress ] = useState(true);
  const [ iconState, setIconState ] = useState(iconStates.default);
  const [ looperId, setLooperId ] = useState(null);
  const { colorMode } = useColorMode();

  const interval = useContext(IntervalContext)
  const setInterval = useContext(SetIntervalContext)

  const handleToggleLoop = () => {setIsLooping(prevIsLooping => !prevIsLooping)}
  useEffect(() => updateLooper(),[isLooping])

  const handleChangeInterval = (event) => {setInterval(event.target.value * 1000); setShowProgress(false)}
  useEffect(() => {updateLooper(); setShowProgress(true)},[interval])
  
  const handleHoverLoop = () => setIconState((isLooping ? iconStates.stoping : iconStates.defaultRotate))

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
        <InputLeftAddon p='0' bgColor='inherit'>
          <IconButton className='loopButton' borderRightRadius='0' sx={isLooping ? (colorMode === 'dark' ? {backgroundColor:'teal.600', '&:hover': {backgroundColor: 'teal.700'}} : {backgroundColor:'teal.200', '&:hover': {backgroundColor: 'teal.300'}} ) : {}} onClick={handleToggleLoop} onMouseEnter={handleHoverLoop} onMouseLeave={handleUnhoverLoop} icon={<LoopIcon className={iconState} boxSize="1.5rem"/>}/>
        </InputLeftAddon>
        <Input type='number' step='0.1' value={interval===0 ? '' : interval/1000} onChange={handleChangeInterval}></Input>
        <InputRightAddon children='sec' bgColor='inherit' borderColor='inherit' />
      </InputGroup>
      {isLooping && (showProgress && <InfiniteProgressBar duration={interval}/>)}
    </>
  );
}


export default LoopGeneration;