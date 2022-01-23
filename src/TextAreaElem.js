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
        return (
            <Box position='relative' w='20rem' minW='15rem' h='100%' >
                <Textarea value={this.props.text} onChange={this.handelChangeList} resize={"none"} position="absolute" zIndex="0" h={"100%"} z></Textarea>
                <IconButton onClick={this.handleDeleteList} className="deleteButton" position="absolute" top="1px" right="1px" zIndex="1" p="0" icon={<BinIcon boxSize="2rem"/>}/>
            </Box>
        );
    }
}


 
export default TextAreaElem;