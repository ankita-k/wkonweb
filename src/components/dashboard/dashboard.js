import React, { Component } from 'react';
import { Layout, Menu, Button, Icon } from 'antd';
import ClientComponent from '../ClientComponent/ClientComponent';
import NewProject from '../NewProject/NewProject';
import './dashboard.css';
import ProjectlistView from '../ProjectlistView/ProjectlistView';
import DashboardView from '../DashboardView/DashboardView';
import ClientList from '../ClientList/ClientList';
import ChangePassword from '../passwordChange/passwordChange';
import UserManagement from '../UserManagement/UserManagement';

import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>

        <Layout>
          <Header className="header">
            {/* <div className="logo" /> */}
            <p style={{ color: '#fff' }}> Hello, John Doe {sessionStorage.getItem('name')} <Button className="wkonlogout"onClick={()=>{ sessionStorage.clear();
    this.props.history.push('/login')}}>Log Out</Button></p>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" title={<span><NavLink to="../dashboard"><Icon type="home" />Home</NavLink></span>}>
                  <Menu.Item key="1">Clients<NavLink to="../dashboard/clientlist" activeClassName="active">Clients</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="../dashboard/projectlist">Projects</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="../dashboard/usermanagement">User Management</NavLink></Menu.Item>
                  {/* <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item> */}
                </SubMenu>
                {/* <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu> */}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 0px 0px' }}>
              <Content style={{ background: '#f0f4f5', padding: 24, margin: 0 }}>
                <Route exact path={`${this.props.match.url}`} component={DashboardView} />
                <Route exact  path={`${this.props.match.url}/dashboardview`} component={DashboardView} />
                <Route exact path={`${this.props.match.url}/clientcreate`} component={ClientComponent} />
                <Route exact path={`${this.props.match.url}/newproject`} component={NewProject} />
                <Route exact path={`${this.props.match.url}/projectlist`} component={ProjectlistView} />     
                <Route exact path={`${this.props.match.url}/clientlist`} component={ClientList} />   
                <Route exact path={`${this.props.match.url}/usermanagement`} component={UserManagement} />                       
                {/* <DashboardView></DashboardView> */}
                {/* <NewInformation></NewInformation> */}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;