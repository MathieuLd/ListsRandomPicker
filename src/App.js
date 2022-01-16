import React from 'react';
import './App.css';
import ResultContainer from './ResultContainer';
import TextAreaList from './TextAreaList';


class App extends React.Component{
  constructor(props){
    super(props)
    this.handleGeneration = this.handleGeneration.bind(this)
    this.handelChangeList = this.handelChangeList.bind(this)
    this.handleAddList = this.handleAddList.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleLoopStart = this.handleLoopStart.bind(this)
    this.handleLoopStop = this.handleLoopStop.bind(this)
    this.handleIntervalUnfocus = this.handleIntervalUnfocus.bind(this)
    let intervalUrl = this.getIntervalFromUrl()
    this.state = {
      lists: this.getListsFromUrl(),
      result: "",
      loop: !(intervalUrl == null),
      interval: (intervalUrl == null ? 2000 : intervalUrl)
    }
  }

  componentDidMount() {
    this.generateResult()
    console.log(this.state)
    if(this.state.loop){window.setInterval(() => {this.generateResult()},this.state.interval)}
  }

  getListsFromUrl(){
    let listsEncoded = new URLSearchParams(window.location.search).get("listsEncoded")
    let listsDecoded = window.atob(listsEncoded)
    return (this.IsJsonString(listsDecoded) ?  JSON.parse(listsDecoded) : [""])
  }

  getIntervalFromUrl(){
    return new URLSearchParams(window.location.search).get("interval");
  }

  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  removeEmptyLists(array){
    return(array.filter(elem => elem !== ""))
  }

  generateResult(){
    console.log('this.generateResult')
    this.setState((state) => {
      return {result: state.lists.map((list) => {
        let elems = list.split("\n")
        return elems[this.randomInt(elems.length)]
      }).join("-")}
    }, () => {console.log(this.state)})
  }


  handelChangeList(index, listText){
    this.setState((state) => {
      return {lists: state.lists.map((list,id) => {
        return (id === index ? listText : list)
      })}
    })
  }

  handleAddList(){
    this.setState((state) => {
      return {lists:[ ...state.lists,""]}
    })
  }

  handleDeleteList(index){
    this.setState((state) => {
      return {lists: state.lists.filter((list,id) => {return index !== id})}
    })
  }

  areArrayEqual(a,b){
    return JSON.stringify(a) === JSON.stringify(b)
  }

  handleGeneration(){
    this.redirectIfNeeded()
    this.generateResult()
  }

  redirectIfNeeded(){
    if(!this.urlCorrespondToState()){window.location.replace(this.stateToUrl())}
  }

  handleLoopStart(intervalMs){
    this.setState((state) => {
      return {
        loop: true,
        interval: intervalMs
      }
    }, () => {this.redirectIfNeeded()})
  }

  handleLoopStop(){
    this.setState((state) => {
      return {
        loop: false,
        interval: null
      }
    }, () => {this.redirectIfNeeded()})
  }

  handleIntervalUnfocus(intervalMs){
    this.setState((state) => {
      return {interval: intervalMs}
    },() => {if(this.state.loop) this.handleGeneration()})
  }

  stateToUrl(){
    //TODO remove condition list == 0 by making sure deleting last list only delete its content
    console.log("stateToUrl / state.loop ",this.state.loop)
    let listsToEncode = this.removeEmptyLists(this.state.lists)
    return window.location.href.split("/?")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode))) + (this.state.loop ? ("&interval=" + this.state.interval) : "")
  }

  urlCorrespondToState(){
    let listsEquality = this.areArrayEqual(this.getListsFromUrl(), this.state.lists)
    let intervalEquality = (this.getIntervalFromUrl() === null && this.state.loop === false) || (this.state.loop === true && this.getIntervalFromUrl() === this.state.interval)
    return listsEquality && intervalEquality
  }


  render(){
    return (
      <div className="App">
        <h1>Lists random picker</h1>
        <TextAreaList list={this.state.lists} onChangeList={this.handelChangeList} onAddList={this.handleAddList} onDeleteList={this.handleDeleteList} />
        <ResultContainer result={this.state.result} onGenerate={this.handleGeneration} onLoopStart={this.handleLoopStart} onLoopStop={this.handleLoopStop} onIntervalUnfocus={this.handleIntervalUnfocus} loop={this.state.loop} interval={this.state.interval}/>
      </div>
    );
  }

}

export default App;