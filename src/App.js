import React, { useState, useEffect} from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Header from './Header';
import TextAreaList from './TextAreaList';
import GenerationTriggerer from './GenerationTriggerer';
import Result from './Result';
import { DEFAULT_INTERVAL, areArrayEqual, randomInt, isJsonString, getJsObjectReducedHash, removeEmptyStrFromArray } from './utility'

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
  const [ isLooping, setIsLooping ] = useState(() => {console.log(localStorage.getItem("isLooping-"+getJsObjectReducedHash(lists)) || false);return localStorage.getItem("isLooping-"+getJsObjectReducedHash(lists)) || false});
  const [ looperId, setLooperId ] = useState(null);
  const [ showProgress, setShowProgress ] = useState(true);


  useEffect(() => {generateResult()},[])
  useEffect(() => {updateWindowInterval()},[isLooping,lists,interval])
  useEffect(() => {setShowProgress(true)},[lists,interval])

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
    //console.log("listabouttochange")
    //console.log(JSON.stringify(lists))
    setShowProgress(false)
    setLists((pervLists) => pervLists.map((prevListStr,id) => {
      return id === index ? listStr : prevListStr
    }))
  }

  const handleAddList = () => setLists(prevLists => [...prevLists,""])

  const handleDeleteList = (index) => setLists(prevLists => prevLists.filter((list,id) => index !== id))


  const updateWindowInterval= () => {
    //console.trace("winInterval IsLoop :"+isLooping+' currentLoopid : '+looperId)
    if(isLooping){
      stopLooper()
      handleLoopedGeneration()
      setLooperId(window.setInterval(() => {handleLoopedGeneration()},interval));
    }else{
      stopLooper()
    }
  }

  const stopLooper = () => {
    //console.log("stopLooper="+looperId)
    window.clearInterval(looperId)
    setLooperId(null);
  }


  const setLocalStorageLoop = (currentIsLooping) => {
    if(currentIsLooping){
      localStorage.setItem("isLooping-"+getJsObjectReducedHash(lists), currentIsLooping)
    }else{
      localStorage.removeItem("isLooping-"+getJsObjectReducedHash(lists))
    }
  }

  const setLocalStorageInterval = (currentInterval) => {
    //console.trace("LSInterval :"+interval+"DEFAULT_INTERVAL :"+DEFAULT_INTERVAL+' LSCondition : '+(!(currentInterval == DEFAULT_INTERVAL)))
    if(!(currentInterval === DEFAULT_INTERVAL)){
      if(!areArrayEqual(lists, [""])) localStorage.setItem("interval-"+getJsObjectReducedHash(lists), currentInterval)
    }else{
      localStorage.removeItem("interval-"+getJsObjectReducedHash(lists))
    }
  }

  const handleChangeInterval = (event) => {setLocalStorageInterval(event.target.value * 1000); setInterval(event.target.value * 1000); setShowProgress(false)}


  const handleGeneration = () => {
    setLocalStorageInterval(interval);
    //console.log("gen")
    //console.log(JSON.stringify(lists))
    redirectIfNeeded()
    generateResult()
  }

  const handleLoopedGeneration = () => {
    //console.log("loopid = "+looperId)
    //console.log(JSON.stringify(lists))
    //redirectIfNeeded()
    generateResult()
  }


  const redirectIfNeeded = () => {if(!urlCorrespondToState()) window.location.replace(stateToUrl())}


  const stateToUrl = () => {
    let listsToEncode = removeEmptyStrFromArray(lists)
    return window.location.href.split("?listsEncoded")[0] + "?listsEncoded=" + window.btoa(JSON.stringify((listsToEncode.length === 0 ? [""] : listsToEncode)))
  }

  const urlCorrespondToState = () => areArrayEqual(getListsFromUrl(), lists)


  const handleToggleLoop = () => {setLocalStorageLoop(!isLooping); setLocalStorageInterval(interval); redirectIfNeeded(); setIsLooping(prevIsLooping => !prevIsLooping)}

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
            interval={interval} handleChangeInterval={handleChangeInterval} 
            isLooping={isLooping} handleToggleLoop={handleToggleLoop}
            showProgress={showProgress} setShowProgress={setShowProgress}
          />
          <Result result={result}/>
        </Flex>
    </Container>
  );
}

export default App;