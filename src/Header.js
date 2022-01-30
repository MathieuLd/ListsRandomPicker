import React from "react";
import { Flex, Heading, IconButton, Spacer, useColorMode} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function Header(props){

  const {colorMode, toggleColorMode} = useColorMode();


  return (
    <Flex direction='row'>
      <Heading mb='0.5rem'>Lists random picker</Heading>
      <Spacer/>
      <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}/>
    </Flex>
  );
}

export default Header;