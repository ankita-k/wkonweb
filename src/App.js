import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
// import MainLayout from './layout.js';
// import axios from 'axios';
// import { Table } from 'antd';
import Routes from './routes';
// import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';


class App extends Component {
  constructor(props){  
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      userId:''
    }
    console.log(props)
    
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
    // const id=sessionStorage.getItem('id')?sessionStorage.getItem('id'):localStorage.getItem('id');
    // console.log('userId')
    // if(id) {
    //   console.log(this.props)
    //   console.log('userId')
    //   // this.props.history.push('/dashboard');
    // }
    // else{
    //   return;
    // }
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
