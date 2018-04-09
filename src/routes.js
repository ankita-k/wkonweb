import React from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import DashboardView from './components/DashboardView/DashboardView';
import ChangePassword from './components/passwordChange/passwordChange';
// import UserSubscription from './Components/UserSubscription/UserSubscription';
// import BankDetails from './Components/BankDetails/BankDetails';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/passwordchange' component={ChangePassword} />
            <Route path='/dashboardView' component={DashboardView} />
            {/* <Route path='/UserSubscription' component={UserSubscription} />
            <Route path='/BankDetails' component={BankDetails} /> */}
        </Switch>
    </BrowserRouter>
);
export default Routes;