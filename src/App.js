import React, { useState, useEffect} from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import TextAreaList from './TextAreaList';
import GenerationTriggerer from './GenerationTriggerer';
import Result from './Result';
import { DEFAULT_INTERVAL,areArrayEqual, randomInt, isJsonString, getJsObjectReducedHash, removeEmptyStrFromArray } from './utility'

import './App.css';
import './icon.css';


function App(){


  const getListsFromUrl = () => {
    let listsEncoded = new URLSearchParams(window.location.search).get("listsEncoded")
    let listsDecoded = window.atob(listsEncoded)
    return (isJsonString(listsDecoded) ?  JSON.parse(listsDecoded) : [""])
  }

  const [ lists, setLists ] = useState(getListsFromUrl());
  const [ result, setResult ] = useState("");
  const [ interval, setInterval ] = useState(localStorage.getItem("interval-"+getJsObjectReducedHash(lists)) || DEFAULT_INTERVAL);
  const [ isLooping, setIsLooping ] = useState(localStorage.getItem("isLooping-"+getJsObjectReducedHash(lists)) || false);
  const [ looperId, setLooperId ] = useState(null);


  useEffect(() => generateResult(),[])
  useEffect(() => updateWindowInterval(),[isLooping])
  useEffect(() => updateWindowInterval(),[lists])

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
    console.log("listabouttochange")
    console.log(JSON.stringify(lists))
    setLists((pervLists) => pervLists.map((prevListStr,id) => {
      return id === index ? listStr : prevListStr
    }))
  }

  const handleAddList = () => setLists(prevLists => [...prevLists,""])

  const handleDeleteList = (index) => setLists(prevLists => prevLists.filter((list,id) => index !== id))


  const updateWindowInterval= () => {
    console.log("winInterval IsLoop :"+isLooping)
    if(isLooping){
      stopLooper()
      handleLoopedGeneration()
      setLooperId(window.setInterval(() => {handleLoopedGeneration()},interval));
    }else{
      stopLooper()
    }
  }

  const stopLooper = () => {
    window.clearInterval(looperId)
    setLooperId(null);
  }


  const setLocalStorageLoop = (toggledLoopState) => {
    if(toggledLoopState){
      localStorage.setItem("loopState-"+getJsObjectReducedHash(lists), interval)
    }else{
      localStorage.removeItem("loopState-"+getJsObjectReducedHash(lists))
    }
  }

  const setLocalStorageInterval = () => {
    if(!interval === DEFAULT_INTERVAL){
      if(!areArrayEqual(lists, [""])) localStorage.setItem("interval-"+getJsObjectReducedHash(lists), interval)
    }else{
      localStorage.removeItem("interval-"+getJsObjectReducedHash(lists))
    }
  }


  const handleGenerationLocalStorage = () => {setLocalStorageInterval();}

  const handleGeneration = () => {
    //setLocalStorageInterval()
    console.log("gen")
    console.log(JSON.stringify(lists))
    redirectIfNeeded()
    generateResult()
  }

  const handleLoopedGeneration = () => {
    //setLocalStorageInterval()
    console.log("gen")
    console.log(JSON.stringify(lists))
    //redirectIfNeeded()
    generateResult()
  }


  const redirectIfNeeded = () => {console.log(urlCorrespondToState()); if(!urlCorrespondToState()) window.location.replace(stateToUrl())}


  const stateToUrl = () => {
    let listsToEncode = removeEmptyStrFromArray(lists)
    return window.location.href.split("?listsEncoded")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode)))
  }

  const urlCorrespondToState = () => areArrayEqual(getListsFromUrl(), lists)


  return (
    <Container maxW='1500px' h='100vh' >
        <Flex w='100%' h='100%' direction='column' p='1rem' gap='1rem'>
          <Header/>
          <TextAreaList 
            lists={lists} 
            onChangeList={handelChangeList} 
            onAddList={handleAddList} 
            onDeleteList={handleDeleteList} 
          />
          <GenerationTriggerer 
            onGenerate={handleGeneration} 
            interval={interval} setInterval={setInterval} 
            isLooping={isLooping} setIsLooping={setIsLooping} 
            updateWindowInterval={updateWindowInterval} 
            setLocalStorageLoop={setLocalStorageLoop} 
            handleGenerationLocalStorage={handleGenerationLocalStorage}
          />
          <Result result={result}/>
        </Flex>
    </Container>
  );
}

export default App;