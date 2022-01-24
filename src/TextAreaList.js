import React from "react";
import { Flex, IconButton } from '@chakra-ui/react';
import TextAreaElem from "./TextAreaElem";
import {AddIcon} from "./assets/icons.js"

class TextAreaList extends React.Component {
    constructor(props){
        super(props)
        this.handelChangeList = this.handelChangeList.bind(this)
        this.handleAddList = this.handleAddList.bind(this)
        this.handleDeleteList = this.handleDeleteList.bind(this)
        this.onAddList = props.onAddList
    }

    handelChangeList(index, listText){
        this.props.onChangeList(index, listText)
    }

    handleAddList() {
        this.props.onAddList()
    }

    handleDeleteList(index){
        this.props.onDeleteList(index)
    }


    render() { 
        const textAreaElems = this.props.list.map((listText, index) => {return(<TextAreaElem key={index} index={index} listNumber={this.props.list.length} text={listText} onDeleteList={this.handleDeleteList} onChangeList={this.handelChangeList} />)})

        return ( 
            <Flex direction='row' minH='15rem' overflowX='auto' gap='0.5rem' p='3px'>
                {textAreaElems}
                <IconButton className="addButton" onClick={this.handleAddList} h="100%" icon={<AddIcon boxSize="1.5rem"/>}></IconButton>
            </Flex>
        );
    }
}
 
export default TextAreaList;