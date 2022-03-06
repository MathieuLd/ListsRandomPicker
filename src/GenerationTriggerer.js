import { Flex, Button } from '@chakra-ui/react';
import LoopGeneration from './LoopGeneration';


function GenerationTriggerer(props){

  return ( 
    <Flex gap="2">
      <Button onClick={props.onGenerate}>Generate</Button>
      <LoopGeneration 
        onIntervalChange={props.onIntervalChange} 
        interval={props.interval} handleChangeInterval={props.handleChangeInterval}
        isLooping={props.isLooping} handleToggleLoop={props.handleToggleLoop}
        showProgress={props.showProgress}
      />
    </Flex>
  );
}
 
export default GenerationTriggerer;