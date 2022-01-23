import React from 'react';
import { Flex, GridItem, Button } from '@chakra-ui/react';
import LoopGeneration from './LoopGeneration';

class GenerationTriggerer extends React.Component {
    constructor(props) {
        super(props);
        this.handleGeneration = this.handleGeneration.bind(this)
    }

    handleGeneration(){
        this.props.onGenerate()
    }

    render() { 
        return ( 
            <Flex templateColumns='repeat(5, 1fr)' gap="2">
              <Button onClick={this.handleGeneration}>Generate</Button>
              <LoopGeneration onGenerate={this.handleGeneration}/>
            </Flex>
        );
    }
}
 
export default GenerationTriggerer;