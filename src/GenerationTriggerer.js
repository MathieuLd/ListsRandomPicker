import { Flex, Button } from '@chakra-ui/react';
import LoopGeneration from './LoopGeneration';


function GenerationTriggerer(props){

  const handleGeneration = () => { props.handleGenerationLocalStorage(); props.onGenerate() }

  return ( 
    <Flex gap="2">
      <Button onClick={handleGeneration}>Generate</Button>
      <LoopGeneration 
        onIntervalChange={props.onIntervalChange} 
        interval={props.interval} setInterval={props.setInterval} 
        isLooping={props.isLooping} setIsLooping={props.setIsLooping} 
        updateWindowInterval={props.updateWindowInterval} 
        setLocalStorageLoop={props.setLocalStorageLoop}
      />
    </Flex>
  );
}
 
export default GenerationTriggerer;