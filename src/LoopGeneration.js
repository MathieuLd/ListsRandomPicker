import React from 'react'
import { InputGroup, InputLeftAddon, InputRightAddon, Button, Input } from '@chakra-ui/react';
import InfiniteProgressBar from './InfiniteProgressBar'

class LoopGeneration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeInterval = this.handleChangeInterval.bind(this)
        this.handleToggleLoop = this.handleToggleLoop.bind(this)
        this.looper = null
        this.state = { 
            interval: 2000,
            loop: false,
            showProgress: true
        }
    }

    handleChangeInterval(event){
        this.setState((state) => {
            return {
                interval: event.target.value*1000, 
                showProgress: false
            }
        }, () => {this.updateLooper(); this.setState((state) => {return {showProgress: true}})})
    }

    handleToggleLoop(){
        this.setState((state) => {
            return {loop: !state.loop}
        }, () => {this.updateLooper()})
    }

    updateLooper(){
        if(this.state.loop){
            this.stopLooper()
            this.props.onGenerate()
            this.looper = window.setInterval(() => {this.props.onGenerate()},this.state.interval);
        }else{
            this.stopLooper()
        }
    }

    stopLooper(){
        window.clearInterval(this.looper)
        this.looper = null;
    }

    render() { 
        return ( 
            <>
              <InputGroup maxW='15rem'>
                <InputLeftAddon p='0'>
                  <Button onClick={this.handleToggleLoop}>{this.state.loop ? "Stop loop" : "Star loop"}</Button>
                </InputLeftAddon>
                <Input type='number' step='0.1' value={this.state.interval===0 ? '' : this.state.interval/1000} onChange={this.handleChangeInterval}></Input>
                <InputRightAddon children='sec' bgColor='white'/>
              </InputGroup>
              {this.state.loop && (this.state.showProgress && <InfiniteProgressBar duration={this.state.interval}/>)}
            </>
        );
    }
}
 
export default LoopGeneration;