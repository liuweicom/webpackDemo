import React, {Component} from 'react';
import config from './config.json';
import style from './Greeter.css';
class Greeter extends Component{
  render() {
    return (
      <div className={style.root}>
        {config.greetText}
        helloworld
      </div>
    );
  }
}

export default Greeter

