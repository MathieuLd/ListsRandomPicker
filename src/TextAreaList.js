import { Flex, IconButton } from '@chakra-ui/react';
import { AddIcon } from "./assets/icons.js"
import TextAreaElem from "./TextAreaElem";
import './icon.css'


function TextAreaList(props){
  
  const handelChangeList = (index,listStr) => props.onChangeList(index,listStr)
  const handleDeleteList = (index) => props.onDeleteList(index)
  
  return ( 
    <Flex direction='row' minH='15rem' overflowX='auto' gap='0.5rem' p='3px'>
      {props.lists.map((listStr,index) => <TextAreaElem key={index} index={index} listsNum={props.lists.length} text={listStr} onChangeList={handelChangeList} onDeleteList={handleDeleteList} />)}
      <IconButton className="addButton" onClick={props.onAddList} h="100%" icon={<AddIcon boxSize="1.5rem"/>}></IconButton>
    </Flex>
  );
}
 

export default TextAreaList;