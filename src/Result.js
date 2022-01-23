import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const loopContext = this.context
  }

  render() { 
    return ( 
      <Flex w='100%' h='100vh' direction='column' align='center' justify='center' mb='10vh'>
        <Text fontSize='6xl' fontWeight='semibold'>{this.props.result}</Text>
      </Flex>
    );
  }
}

export default Result;