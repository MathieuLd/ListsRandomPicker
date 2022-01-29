import { Flex, Text } from '@chakra-ui/react';

function Result(props){
  return ( 
    <Flex w='100%' h='100vh' direction='column' align='center' justify='center' mb='10vh'>
      <Text fontSize='6xl' fontWeight='semibold'>{props.result}</Text>
    </Flex>
  );
}

export default Result;