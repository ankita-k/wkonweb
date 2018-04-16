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

// const { SubMenu } = Menu;
const SubMenu = Menu.SubMenu;
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
            <p style={{ color: '#fff' }}> Hello {sessionStorage.getItem('id')} <Button className="wkonlogout"onClick={()=>{ sessionStorage.clear();
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
                <Menu.Item key="1">
                  <Icon type="home" />
                  <span>Home</span>
                  <NavLink to="../dashboard" activeClassName="active"></NavLink>
                </Menu.Item>
                <SubMenu key="sub1" title={<span>Clients</span>}>
                  <Menu.Item key="3">
                    <span>Client Create</span>
                    <NavLink to="../dashboard/clientcreate" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <span>Client List</span>
                    <NavLink to="../dashboard/clientlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span>Projects</span>}>
                  <Menu.Item key="5">
                    <span>Project Create</span>
                    <NavLink to="../dashboard/newproject" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <span>Project List</span>
                    <NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>
              <Menu.Item key="8"><NavLink to="../dashboard/usermanagement">User Management</NavLink></Menu.Item>
                
                {/* <SubMenu key="sub1" title={<span><Icon type="home" />Home</span>}> */}
                {/* <Menu.Item key="1">Clients<NavLink to="../dashboard/clientlist" activeClassName="active">Clients</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="../dashboard/projectlist">Projects</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="../dashboard/usermanagement">User Management</NavLink></Menu.Item> */}
            
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 0px 0px' }}>
              <Content style={{ background: '#f0f4f5', padding: 24, margin: 0 }}>
                <Route exact path={`${this.props.match.url}`} component={DashboardView} />
                <Route exact path={`${this.props.match.url}/dashboardview`} component={DashboardView} />
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