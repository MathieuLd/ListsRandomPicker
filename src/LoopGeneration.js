import { useState, useEffect } from 'react'
import { InputGroup, InputLeftAddon, InputRightAddon, Input, IconButton,useColorMode } from '@chakra-ui/react';
import { LoopIcon } from "./assets/icons.js"
import InfiniteProgressBar from './InfiniteProgressBar'

function LoopGeneration(props){

  const iconStates = {
    default: "oneArrowLoop",
    defaultRotate: "oneArrowLoop360",
    running: "twoArrowLoop",
    stoping: "twoArrowOut"
  }

  const [ showProgress, setShowProgress ] = useState(true);
  const [ iconState, setIconState ] = useState(iconStates.default);
  const { colorMode } = useColorMode();

  const handleToggleLoop = () => {props.setLocalStorageLoop(!props.isLooping); props.setIsLooping(prevIsLooping => !prevIsLooping)}
  

  const handleChangeInterval = (event) => {props.setInterval(event.target.value * 1000); setShowProgress(false)}
  useEffect(() => {updateLooper(); setShowProgress(true)},[props.interval])
  
  const handleHoverLoop = () => setIconState((props.isLooping ? iconStates.stoping : iconStates.defaultRotate))

  const handleUnhoverLoop = () => setIconState((props.isLooping ? iconStates.running : iconStates.default))
  
 
  const updateLooper = () => {
    props.updateWindowInterval()
    if(props.isLooping){
      setIconState(iconStates.running);
    }else{
      setIconState(iconStates.default);
    }
  }

  return ( 
    <>
      <InputGroup maxW='15rem'>
        <InputLeftAddon p='0' bgColor='inherit'>
          <IconButton className='loopButton' borderRightRadius='0' sx={props.isLooping ? (colorMode === 'dark' ? {backgroundColor:'teal.600', '&:hover': {backgroundColor: 'teal.700'}} : {backgroundColor:'teal.200', '&:hover': {backgroundColor: 'teal.300'}} ) : {}} onClick={handleToggleLoop} onMouseEnter={handleHoverLoop} onMouseLeave={handleUnhoverLoop} icon={<LoopIcon className={iconState} boxSize="1.5rem"/>}/>
        </InputLeftAddon>
        <Input type='number' step='0.1' value={props.interval===0 ? '' : props.interval/1000} onChange={handleChangeInterval}></Input>
        <InputRightAddon children='sec' bgColor='inherit' borderColor='inherit' />
      </InputGroup>
      {props.isLooping && (showProgress && <InfiniteProgressBar duration={props.interval}/>)}
    </>
  );
}


export default LoopGeneration;