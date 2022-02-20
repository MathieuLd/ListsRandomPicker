import React, { useState, useEffect} from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import TextAreaList from './TextAreaList';
import GenerationTriggerer from './GenerationTriggerer';
import ContextProvider from './ContextProvider'
import Result from './Result';
import { areArrayEqual, randomInt, isJsonString } from './utility'
import CryptoJS from 'crypto-js'
import './App.css';
import './icon.css';


function App(){


  const getListsFromUrl = () => {
    let listsEncoded = new URLSearchParams(window.location.search).get("listsEncoded")
    let listsDecoded = window.atob(listsEncoded)
    return (isJsonString(listsDecoded) ?  JSON.parse(listsDecoded) : [""])
  }

  
  const [lists, setLists] = useState(getListsFromUrl());
  const [result, setResult] = useState("");

  const getListsReducedHash = () => CryptoJS.SHA256(JSON.stringify(lists)).toString().slice(0,10)


  useEffect(() => generateResult(),[])


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



  const handleGeneration = () => {
    //setLocalStorageInterval()
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
    <ContextProvider lists={lists} listsHash={getListsReducedHash()}>
      <Container maxW='1500px' h='100vh' >
          <Flex w='100%' h='100%' direction='column' p='1rem' gap='1rem'>
            <Header/>
            <TextAreaList lists={lists} onChangeList={handelChangeList} onAddList={handleAddList} onDeleteList={handleDeleteList} />
            <GenerationTriggerer onGenerate={handleGeneration}/>
            <Result result={result}/>
          </Flex>
      </Container>
    </ContextProvider>
  );
}

export default App;