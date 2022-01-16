import React from 'react';
import LoopGeneration from './LoopGeneration';

class ResultContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoopStart = this.handleLoopStart.bind(this)
        this.handleLoopStop = this.handleLoopStop.bind(this)
        this.handleGeneration = this.handleGeneration.bind(this)
        this.handleIntervalUnfocus = this.handleIntervalUnfocus.bind(this)
    }

    handleGeneration(){
        this.props.onGenerate()
    }

    handleLoopStart(intervalMs){
        this.props.onLoopStart(intervalMs)
    }

    handleLoopStop(){
        this.props.onLoopStop()
    }

    handleIntervalUnfocus(intervalMs){
        this.props.onIntervalUnfocus(intervalMs)
    }

    render() { 
        return ( 
            <div className='ResultContainer'>
                <button onClick={this.handleGeneration}>Generate</button>
                <LoopGeneration onGenerate={this.handleGeneration} />
                <span>{this.props.result}</span>
            </div>
        );
    }
}
 
export default ResultContainer;