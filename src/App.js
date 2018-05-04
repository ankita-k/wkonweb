import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import * as listActions from './redux/action';
import { bindActionCreators } from 'redux';
import Routes from './routes';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
 }
    
}

render() {
    return (
      <div className="App">
        <Routes></Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}
function mapDispatchToProps(dispatch, state) {
  return ({
    actions: bindActionCreators(listActions, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
