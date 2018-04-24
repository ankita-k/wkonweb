import React from 'react';
import { withRouter } from 'react-router';
import App from './App';
export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
        debugger;
      if ( ! sessionStorage.getItem('id') && !localStorage.getItem('id')) {
        const location = this.props.location;

        this.props.router.push('/login');
      }
    }

    render() {
      return sessionStorage.getItem('id') || localStorage.getItem('id')
        ? <Component  { ...this.props } />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}