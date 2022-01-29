import React from "react";
import { Flex, Heading, IconButton, Spacer, useColorMode} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function Header(props){
  return (
    <Flex direction='row'>
      <Heading mb='0.5rem'>Lists random picker</Heading>
      <Spacer/>
      <IconButton icon={<MoonIcon />}/>
    </Flex>
  );
}

export default Header;