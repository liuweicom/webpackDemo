import React, {Component} from 'react';
import {App as LwApp} from 'lw-app';

class WrapView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LwApp />
        );
    }
}

export default WrapView;