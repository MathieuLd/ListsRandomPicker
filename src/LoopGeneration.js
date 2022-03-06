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

  const [ iconState, setIconState ] = useState(iconStates.default);
  const { colorMode } = useColorMode();

  useEffect(() => {updateLooperIcon(true)},[props.interval])

  
  
  const handleHoverLoop = () => setIconState((props.isLooping ? iconStates.stoping : iconStates.defaultRotate))

  const handleUnhoverLoop = () => setIconState((props.isLooping ? iconStates.running : iconStates.default))
  
  const updateLooperIcon = () => {
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
          <IconButton className='loopButton' borderRightRadius='0' sx={props.isLooping ? (colorMode === 'dark' ? {backgroundColor:'teal.600', '&:hover': {backgroundColor: 'teal.700'}} : {backgroundColor:'teal.200', '&:hover': {backgroundColor: 'teal.300'}} ) : {}} onClick={props.handleToggleLoop} onMouseEnter={handleHoverLoop} onMouseLeave={handleUnhoverLoop} icon={<LoopIcon className={iconState} boxSize="1.5rem"/>}/>
        </InputLeftAddon>
        <Input type='number' step='0.1' value={props.interval===0 ? '' : props.interval/1000} onChange={props.handleChangeInterval}></Input>
        <InputRightAddon children='sec' bgColor='inherit' borderColor='inherit' />
      </InputGroup>
      {props.isLooping && (props.showProgress && <InfiniteProgressBar duration={props.interval}/>)}
    </>
  );
}


export default LoopGeneration;