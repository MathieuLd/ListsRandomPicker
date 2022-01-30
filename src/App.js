import React, { useState, useEffect} from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import TextAreaList from './TextAreaList';
import GenerationTriggerer from './GenerationTriggerer';
import Result from './Result';
import './App.css';
import './icon.css';


function App(){

  const isJsonString = (str) => {
    try {JSON.parse(str);} catch (e) {return false;}
    return true;
  }

  const getListsFromUrl = () => {
    let listsEncoded = new URLSearchParams(window.location.search).get("listsEncoded")
    let listsDecoded = window.atob(listsEncoded)
    return (isJsonString(listsDecoded) ?  JSON.parse(listsDecoded) : [""])
  }

  const [lists, setLists] = useState(getListsFromUrl());
  const [result, setResult] = useState("");

  useEffect(() => generateResult(),[])

  const randomInt = (max) => Math.floor(Math.random() * max);

  const removeEmptyLists = (array) => array.filter(elem => elem !== "")

  const generateResult = () => {
    setResult(
      lists.map((list) => {
        let elems = list.split("\n")
        elems = elems.map((elem) => {let elemSplit = elem.split("/"); return elemSplit[randomInt(elemSplit.length)]})
        return elems[randomInt(elems.length)]
      }).join(" - ")
    )
  }

  const handelChangeList = (index, listStr) => {
    setLists((pervLists) => pervLists.map((prevListStr,id) => {
      return id === index ? listStr : prevListStr
    }))
  }

  const handleAddList = () => setLists(prevLists => [...prevLists,""])

  const handleDeleteList = (index) => setLists(prevLists => prevLists.filter((list,id) => index !== id))

  const areArrayEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);

  const handleGeneration = () => {
    redirectIfNeeded()
    generateResult()
  }

  const redirectIfNeeded = () => {if(!urlCorrespondToState()) window.location.replace(stateToUrl())}

  const stateToUrl = () => {
    let listsToEncode = removeEmptyLists(lists)
    return window.location.href.split("?listsEncoded")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode)))
  }

  const urlCorrespondToState = () => areArrayEqual(getListsFromUrl(), lists)

  return (
      <Container maxW='1500px' h='100vh' >
          <Flex w='100%' h='100%' direction='column' p='1rem' gap='1rem'>
            <Header/>
            <TextAreaList lists={lists} onChangeList={handelChangeList} onAddList={handleAddList} onDeleteList={handleDeleteList} />
            <GenerationTriggerer onGenerate={handleGeneration}/>
            <Result result={result}/>
          </Flex>
      </Container>
  );
}

export default App;