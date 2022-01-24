import React from 'react';
import { Container, Flex, Heading } from '@chakra-ui/react';
import './App.css';
import TextAreaList from './TextAreaList';
import GenerationTriggerer from './GenerationTriggerer';
import Result from './Result';



class App extends React.Component{
  constructor(props){
    super(props)
    this.handleGeneration = this.handleGeneration.bind(this)
    this.handelChangeList = this.handelChangeList.bind(this)
    this.handleAddList = this.handleAddList.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.state = {
      lists: this.getListsFromUrl(),
      result: "",
    }
  }

  componentDidMount() {
    this.generateResult()
    //console.log(this.state)
    if(this.state.loop){window.setInterval(() => {this.generateResult()},this.state.interval)}
  }

  getListsFromUrl(){
    let listsEncoded = new URLSearchParams(window.location.search).get("listsEncoded")
    let listsDecoded = window.atob(listsEncoded)
    return (this.IsJsonString(listsDecoded) ?  JSON.parse(listsDecoded) : [""])
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
   // console.log('this.generateResult')
    this.setState((state) => {
      return {result: state.lists.map((list) => {
        let elems = list.split("\n")
        return elems[this.randomInt(elems.length)]
      }).join("-")}
    }, () => {/*console.log(this.state)*/})
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


  stateToUrl(){
    //TODO remove condition list == 0 by making sure deleting last list only delete its content
    console.log("stateToUrl / state.loop ",this.state.loop)
    let listsToEncode = this.removeEmptyLists(this.state.lists)
    //console.log(window.location.href.split("/?")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode))) + (this.state.loop ? ("&interval=" + this.state.interval) : ""))
    return window.location.href.split("?listsEncoded")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode))) + (this.state.loop ? ("&interval=" + this.state.interval) : "")
  }

  urlCorrespondToState(){
    let listsEquality = this.areArrayEqual(this.getListsFromUrl(), this.state.lists)
    return listsEquality
  }


  render(){
    return (
        <Container maxW='1500px' h='100vh' >
            <Flex w='100%' h='100%' direction='column' p='1rem' gap='1rem'>
              <Heading mb='0.5rem'>Lists random picker</Heading>
              <TextAreaList list={this.state.lists} onChangeList={this.handelChangeList} onAddList={this.handleAddList} onDeleteList={this.handleDeleteList} />
              <GenerationTriggerer onGenerate={this.handleGeneration}/>
              <Result result={this.state.result}/>
            </Flex>
        </Container>
    );
  }
}

export default App;