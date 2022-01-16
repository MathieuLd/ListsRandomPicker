import React from "react";

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
            <div className="TextAreaElem">
                <textarea value={this.props.text} onChange={this.handelChangeList}></textarea>
                <button onClick={this.handleDeleteList}>Delete list</button>
            </div>
        );
    }
}
 
export default TextAreaElem;