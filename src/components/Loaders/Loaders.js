import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Loader } from 'react-overlay-loader';
 
import 'react-overlay-loader/styles.css';
import './Loaders.css';


class Loaders extends Component {
  
    


  render() {
    return (
      <div className="loader">  
   
        <Loader className="ldr" fullPage loading />     
      </div>
    );
  }
}

export default Loaders;
