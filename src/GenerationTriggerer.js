import { useContext } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import LoopGeneration from './LoopGeneration';
import { HandleGenerationLocalStorageContext } from './ContextProvider'


function GenerationTriggerer(props){

  const handleGenerationLocalStorage = useContext(HandleGenerationLocalStorageContext);

  const handleGeneration = () => { handleGenerationLocalStorage(); props.onGenerate() }

  return ( 
    <Flex gap="2">
      <Button onClick={handleGeneration}>Generate</Button>
      <LoopGeneration onGenerate={handleGeneration} onIntervalChange={props.onIntervalChange} defaultInterval={props.defaultInterval}/>
    </Flex>
  );
}
 
export default GenerationTriggerer;