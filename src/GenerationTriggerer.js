import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import LoopGeneration from './LoopGeneration';


function GenerationTriggerer(props){

  const handleGeneration = () => props.onGenerate()

  return ( 
    <Flex gap="2">
      <Button onClick={handleGeneration}>Generate</Button>
      <LoopGeneration onGenerate={handleGeneration}/>
    </Flex>
  );
}
 
export default GenerationTriggerer;