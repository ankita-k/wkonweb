import React, { Component } from 'react';
import { Layout, Menu, Button, Icon, Row, Col, Modal } from 'antd';
import ClientComponent from '../ClientComponent/ClientComponent';
import NewProject from '../NewProject/NewProject';
import './dashboard.css';
import ProjectlistView from '../ProjectlistView/ProjectlistView';
import DashboardView from '../DashboardView/DashboardView';
import ClientList from '../ClientList/ClientList';
import ChangePassword from '../passwordChange/passwordChange';
import UserManagement from '../UserManagement/UserManagement';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import brandlogo from '../../Images/wkonlogo.png';
import BillForm from '../billForm/billForm';
import BillList from '../billList/billList';
import Userlist from '../Userlist/Userlist';
import Files from '../files/files';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';



// const { SubMenu } = Menu;
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      selectedKey: ['home'],
      userrole: ''
    }
    if (!sessionStorage.getItem('id') && !localStorage.getItem('id')) {
      this.props.history.push('/login');
      return;
    }
    this.showConfirm = this.showConfirm.bind(this);

  }
  showConfirm() {
    let _base = this;
    confirm({
      title: 'Do you want to Logout?',

      onOk() {
        console.log('OK');
        sessionStorage.clear();
        localStorage.clear();

        _base.props.history.push('/login')
      },
      onCancel() {
        console.log('Cancel');
      },

    })
  }

  gotoDashboard = () => {
    this.setState({
      selectedKey: ['home']
    });
  }

  handleClick = (nav) => {
    let navArr = [];
    navArr.push(nav.key);
    this.setState({
      selectedKey: navArr
    });
  }

  renderSidemenuSelection = () => {
    this.setState({
      selectedKey: ['client_list']
    });
    if (this.props.location.pathname != '/dashboard') {
      this.props.history.push('/dashboard');
    }
  }

  //GET USER NAME
  componentDidMount() {

    console.log(this.props);
    if (sessionStorage.getItem("id")) {
      console.log('data')

      this.props.username(sessionStorage.getItem('id')).then((data) => {
        console.log(data);
        if (!data.error) {
          this.setState({ username: data.result.name });
          this.setState({ userrole: data.result.role })
          console.log(this.state.username);
        }

      }, err => {

      })
    }
    else if (localStorage.getItem('id')) {

      this.props.username(localStorage.getItem('id')).then((data) => {
        console.log('data')
        console.log(data);
        if (!data.error) {
          this.setState({ username: data.result.name });
          this.setState({ userrole: data.result.role })
          console.log(this.state.username);
        }

      }, err => {

      })
    }
    this.renderSidemenuSelection();
  }



  render() {

    return (
      <div>
        <Layout>
          <Header className="header">
            <Row>
              <Col lg={3}><NavLink to="../dashboard" activeClassName="active">
                <img src={brandlogo} onClick={() => { this.gotoDashboard() }} /></NavLink> </Col>
              <p className="username" style={{ color: '#fff' }}> {this.state.username ? this.state.username : ''} <Button className="wkonlogout" onClick={() => {
                this.showConfirm();

              }}>Log Out</Button></p>
            </Row>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                onClick={this.handleClick}
                mode="inline"
                // selectedKeys={this.state.selectedKey}
                defaultSelectedKeys={this.state.selectedKey}
                defaultOpenKeys={this.state.selectedKey}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="home">
                  <Icon type="home" />
                  <span>Home</span>
                  <NavLink to="../dashboard" activeClassName="active"></NavLink>
                </Menu.Item>
                {this.state.userrole ? this.state.userrole == "admin" || "Sales" ?
                  <SubMenu key="client" title={<span><Icon type="usergroup-add" />Clients</span>} subMenuCloseDelay={0.1}>
                    <Menu.Item key="create_client">
                      <span>Client Create</span>
                      <NavLink to="../dashboard/clientcreate" activeClassName="active"></NavLink>
                    </Menu.Item>
                    <Menu.Item key="client_list">
                      <span>Client List</span>
                      <NavLink to="../dashboard/clientlist" activeClassName="active"></NavLink>
                    </Menu.Item>
                  </SubMenu> : '' : ''}
                {this.state.userrole ? this.state.userrole == "Developer" || "admin" ?
                  <SubMenu key="projects" title={<span><Icon type="file-text" /> Projects</span>} subMenuCloseDelay={0.1}>
                    <Menu.Item key="create_project">
                      <span>Project Create</span>
                      <NavLink to="../dashboard/newproject" activeClassName="active"></NavLink>
                    </Menu.Item>
                    <Menu.Item key="project_list">
                      <span>Project List</span>
                      <NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>
                    </Menu.Item>
                  </SubMenu> : '' : ''}
                {this.state.userrole ? this.state.userrole == "admin" ?
                  <SubMenu key="user" title={<span>User Management</span>} subMenuCloseDelay={0.1}>
                    <Menu.Item key="create_user">
                      <span>Create User</span>
                      <NavLink to="../dashboard/createuser" activeClassName="active"></NavLink>
                    </Menu.Item>
                    <Menu.Item key="user_list">
                      <span>User List</span>
                      <NavLink to="../dashboard/userlist" activeClassName="active"></NavLink>
                    </Menu.Item>
                  </SubMenu> : '' : ''}

                {/* {this.state.userrole?this.state.userrole== "admin" ?  to be uncommented */}
                <SubMenu key="bill" title={<span>Bill Management</span>} subMenuCloseDelay={0.1}>
                  <Menu.Item key="create_bill">
                    <span>Create Bill</span>
                    <NavLink to="../dashboard/bill" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="bill_list">
                    <span>Bill List</span>
                    <NavLink to="../dashboard/billlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>
                {/* : '':''}  to be uncommented */}
                {/* <Menu.Item key="8"><NavLink to="../dashboard/usermanagement">User Management</NavLink></Menu.Item>
                <Menu.Item key="9"><NavLink to="../dashboard/userlist">User List</NavLink></Menu.Item> */}


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
                <Route exact path={`${this.props.match.url}/editclient`} component={ClientComponent} />
                <Route exact path={`${this.props.match.url}/newproject`} component={NewProject} />
                <Route exact path={`${this.props.match.url}/editProject`} component={NewProject} />
                <Route exact path={`${this.props.match.url}/projectlist`} component={ProjectlistView} />
                <Route exact path={`${this.props.match.url}/clientlist`} component={ClientList} />
                <Route exact path={`${this.props.match.url}/edituser`} component={UserManagement} />
                <Route exact path={`${this.props.match.url}/createuser`} component={UserManagement} />
                <Route exact path={`${this.props.match.url}/userlist`} component={Userlist} />
                <Route exact path={`${this.props.match.url}/bill`} component={BillForm} />
                <Route exact path={`${this.props.match.url}/editbill`} component={BillForm} />
                <Route exact path={`${this.props.match.url}/billlist`} component={BillList} />
                <Route exact path={`${this.props.match.url}/:projectname`} component={Files} />
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
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, actioncreators)(Dashboard);

//export default Dashboard;