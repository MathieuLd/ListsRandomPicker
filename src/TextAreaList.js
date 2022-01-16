import React from "react";
import TextAreaElem from "./TextAreaElem";

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
        const textAreaElems = this.props.list.map((listText, index) => {return(<TextAreaElem key={index} index={index} text={listText} onDeleteList={this.handleDeleteList} onChangeList={this.handelChangeList} />)})

        return ( 
            <div className="TextAreaListe">
                {textAreaElems}
                <button onClick={this.handleAddList}>Add list</button>
            </div>
        );
    }
}
 
export default TextAreaList;