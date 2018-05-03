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
      data: [],
      userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
    }
  }

  componentDidMount() {

    this.props.actions.clientlist(this.state.userId);
    this.props.actions.billlist(this.state.userId);
    this.props.actions.projectList(this.state.userId);
    this.props.actions.userList();
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
