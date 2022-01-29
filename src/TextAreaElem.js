import { Box, IconButton, Textarea } from '@chakra-ui/react';
import { BinIcon } from './assets/icons.js';


function TextAreaElem(props) {

  const handelChangeList = (event) => props.onChangeList(props.index, event.target.value);
  const handleDeleteList = () => props.onDeleteList(props.index);

  const lineNum = props.text.split("\n").length; 
  const textAreaFontSize = (lineNum < 10) ? 'md' : (lineNum < 11 ? 'sm' : 'xs')
  return (
    <Box position='relative' w='20rem' minW='15rem' h='100%' overflowY='auto' >
        <Textarea value={props.text} fontSize={textAreaFontSize} onChange={handelChangeList} resize='none' position="absolute" zIndex="0" h={"100%"} ></Textarea>
        {props.listsNum > 1 && <IconButton onClick={handleDeleteList} className="deleteButton" position="absolute" top="1px" right='1px' zIndex="1" p="0" icon={<BinIcon boxSize="2rem"/>}/>}
    </Box>
  );
}
 
export default TextAreaElem;