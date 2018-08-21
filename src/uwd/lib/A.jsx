import React from 'react';
import B from './B.jsx';
class A extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button type="button">good</button>
                hello world
                <B></B>
            </div>
        );
    }
}
export default A;
