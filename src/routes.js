import React from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import DashboardView from './components/DashboardView/DashboardView';
// import NewInformation from './components/NewInformation/NewInformation';
import UserManagement from './components/UserManagement/UserManagement';
import ChangePassword from './components/passwordChange/passwordChange';
// import UserSubscription from './Components/UserSubscription/UserSubscription';
// import BankDetails from './Components/BankDetails/BankDetails';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/usermanagement' component={UserManagement} />
            <Route path='/passwordchange' component={ChangePassword} />
            {/* <Route path='/NewInformation' component={NewInformation} /> */}
            {/* <Route path='/dashboardView' component={DashboardView} />*/}
            {/* <Route path='/dashboardView' component={DashboardView} /> */}
            {/* <Route path='/UserSubscription' component={UserSubscription} />
            <Route path='/BankDetails' component={BankDetails} /> */}
        </Switch>
    </BrowserRouter>
);
export default Routes;