import React from 'react'

class InfiniteProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div>
                <div className='progressbar'>
                    <div className='inner' style={{animation: 'progress '+this.props.duration/1000+'s infinite linear'}}></div>
                </div>
            </div>
        );
    }
}
 
export default InfiniteProgressBar;