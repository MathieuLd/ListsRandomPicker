import React from "react";
import { Box, IconButton, Button, Icon, Textarea } from '@chakra-ui/react';
import './icon.css';
import { ReactComponent as Bin } from './assets/bin.svg';
import { BinIcon } from './assets/icons.js';

class TextAreaElem extends React.Component {
    constructor(props){
        super(props)
        this.handelChangeList = this.handelChangeList.bind(this)
        this.handleDeleteList = this.handleDeleteList.bind(this)
    }

    handelChangeList(event){
        this.props.onChangeList(this.props.index, event.target.value)
    }

    handleDeleteList(){
        this.props.onDeleteList(this.props.index)
    }

    render() {
      const lineNum = this.props.text.split("\n").length; 
      const textAreaFontSize = (lineNum < 10) ? 'md' : (lineNum < 11 ? 'sm' : 'xs')
     
        return (
            <Box position='relative' w='20rem' minW='15rem' h='100%' overflowY='auto' >
                <Textarea value={this.props.text} fontSize={textAreaFontSize} onChange={this.handelChangeList} resize='none' position="absolute" zIndex="0" h={"100%"} 
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '50px',
                      borderRadius: '8px',
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                  }}
                ></Textarea>
                {this.props.listNumber > 1 && <IconButton onClick={this.handleDeleteList} className="deleteButton" position="absolute" top="1px" right='1px' zIndex="1" p="0" icon={<BinIcon boxSize="2rem"/>}/>}
            </Box>
        );
    }
}


 
export default TextAreaElem;