import React from 'react'
import { Flex, Box, useColorMode } from '@chakra-ui/react'


function InfiniteProgressBar(props){

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Flex flexGrow='1' align='center' justify='center'>
        <Box width='90%' minWidth='3em' height='0.8em' borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200'} borderWidth='1px' borderStyle='solid' rounded='0.3em'>
            <Box height='100%' bg={colorMode === 'dark' ? 'teal.600' : 'teal.200'} rounded='0.3em' style={{animation: 'progress '+props.duration/1000+'s infinite linear'}}></Box>
        </Box>
    </Flex>
  );
}
 
export default InfiniteProgressBar;