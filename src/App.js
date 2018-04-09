import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
// import MainLayout from './layout.js';
// import axios from 'axios';
// import { Table } from 'antd';
import Routes from './routes';

class App extends Component {
  constructor(props){  
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    // this.apiUrl = 'http://localhost:5020/transaction/list'
  }

  componentDidMount(){
    // Make HTTP reques with Axios
    // axios.get(this.apiUrl)
    //   .then((res) => {
    //     // Set state with result
    //     console.log(res);
    //     if(res)
    //     this.setState({data:res.data.result});
    //   });
  }
  
  render() {
    return (
      <div className="App">
          <Routes></Routes>
      </div>
    );
  }
}

export default App;
