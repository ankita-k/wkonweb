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
import timesheetManagement from '../timesheetManagement/timesheetManagement';
import ProjectTab from '../ProjectTab/ProjectTab';
import * as basicActions from '../../redux/action';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import brandlogo from '../../Images/wkonlogo.png';
import userlogo from '../../Images/userprofile.png';
import BillForm from '../billForm/billForm';
import BillList from '../billList/billList';
import Userlist from '../Userlist/Userlist';
import Files from '../files/files';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Loading from 'react-loading-bar';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import ProjectManagement from '../projectManagement/projectManagement';
import ChatScreen from '../chatScreen/chatScreen'
import io from 'socket.io-client';
const socket = io('http://mitapi.memeinfotech.com:5088/');

// const { SubMenu } = Menu;
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;

class Dashboard extends Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      selectedKey: ['home'],
      userrole: '',
      openKeys: [],
      clientstyle: { display: 'none' },
      clientcreate_style: { display: 'none' },
      clientlist_style: { display: 'none' },
      projectstyle: { display: 'none' },
      projectcreate_style: { display: 'none' },
      projectlist_style: { display: 'none' },
      billstyle: { display: 'none' },
      billcreate_style: { display: 'none' },
      billlist_style: { display: 'none' },
      userstyle: { display: 'none' }
    }
    if (!sessionStorage.getItem('id') && !localStorage.getItem('id')) {
      this.props.history.push('/login');
      return;
    }

    this.showConfirm = this.showConfirm.bind(this);
  }

  disconnectSocket = () => {
    console.log('socket disconnected')
    socket.off('clientCreated', function () { });
    socket.off('projectCreated', function () { });
    socket.off('userCreated', function () { });
    socket.off('billCreated', function () { });



  }


  showConfirm() {
    let _base = this;
    confirm({
      title: 'Do you want to Logout?',

      onOk() {
        console.log('OK');
        sessionStorage.clear();
        localStorage.clear();
        _base.disconnectSocket()
        _base.props.history.push('/login');

      },
      onCancel() {
        console.log('Cancel');
      },

    })
  }

  gotoDashboard = () => {
    this.props.actions.menuKeys('home');
    this.props.actions.openkey('');

  }

  handleClick = (nav) => {
    console.log(nav);
    this.props.actions.menuKeys(nav.key);

    if (nav.key == 'home') {
      this.props.actions.openkey('')
    };

  }

  openChange = (nav) => {

    if (nav.length >= 1) {

      let key = nav[nav.length - 1];

      this.props.actions.openkey(key);

    } else {
      this.props.actions.openkey('')

    }
  }




  componentDidMount() {
    console.log('#############################', this.props);
    this.connectClientSocket();
    this.connectProjectSocket();
    this.connectUserSocket();
    this.connectBillSocket();
    /*GET PROJECT LIST,CLIENT LIST,DEVELOPER LIST,BILL LIST,LOGGEDIN USER DATA 
    */
    if (sessionStorage.getItem('id')) {
      this.props.actions.clientlist(sessionStorage.getItem('id'));
      this.props.actions.billlist(sessionStorage.getItem('id'));
      this.props.actions.projectList(sessionStorage.getItem('id'));
      this.props.actions.userList();
      this.props.actions.findByRole('Developer');
      this.props.actions.userdetails(sessionStorage.getItem('id'));
      this.props.actions.dashboardCustomer(sessionStorage.getItem('id'));
      this.props.actions.dashboardProject(sessionStorage.getItem('id'));
      this.props.actions.tagsList('VerticalLead');
      this.props.actions.countrylist();
    }
    else if (localStorage.getItem('id')) {
      this.props.actions.clientlist(localStorage.getItem('id'));
      this.props.actions.billlist(localStorage.getItem('id'));
      this.props.actions.projectList(localStorage.getItem('id'));
      this.props.actions.userList();
      this.props.actions.findByRole('Developer');
      this.props.actions.userdetails(localStorage.getItem('id'));
      this.props.actions.dashboardCustomer(localStorage.getItem('id'));
      this.props.actions.dashboardProject(localStorage.getItem('id'));
      this.props.actions.tagsList('VerticalLead');
      this.props.actions.countrylist();
    }
    /*GET PROJECT LIST,CLIENT LIST,DEVELOPER LIST,BILL LIST,LOGGEDIN USER DATA  ENDS */


    /*GET USER NAME AND ROLE*/
    this.commonFunction();


    /**  INITIALLY HOME MENU TO BE SELECTED  */
    this.props.actions.openkey('');
    this.props.actions.menuKeys('home');
    /**  INITIALLY HOME MENU TO BE SELECTED  ENDS */

    /** NAVIGATE TO DASHBOARD ON REFRESH */
    if (this.props.location.pathname != '/dashboard') {
      this.props.history.push('/dashboard');
    }
    /**NAVIGATE TO DASHBOARD ON REFRESH  ENDS*/
  }

  componentWillReceiveProps(props) {
    console.log('jjjjjjjjjjjjjjjjjj', props, this.props);

    /*CHANGE THE COLOR OF SELECTED MENU ITEM  AFTER RECEVING DATA FROM PROPS*/
    if (props.menuselectedkey.length != 0) {

      this.setState({ selectedKey: props.menuselectedkey })
    }
    else {
      this.setState({ selectedKey: ['home'] })
    }

    /**OPEN THE MENU ITEM  */
    if (props.openKey.length != 0) {

      this.setState({ openKeys: props.openKey })
    }
    else {
      this.setState({ openKeys: [] })
    }
    this.commonFunction();
  }

  // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
  commonFunction() {
    /* SHOWING LOGGEDIN USER NAME AFTER RECEIVING DATA FROM PROPS AND IMPLEMENTING ACL IN MENU ITEMS*/
    if (this.props.loggeduserDetails) {
      this.setState({ username: this.props.loggeduserDetails.name });
      // this.setState({ userrole: this.props.loggeduserDetails.role });
      if (this.props.loggeduserDetails.role == 'admin') {
        this.setState({ clientstyle: { display: 'block' } });
        this.setState({ clientcreate_style: { display: 'none' } });
        this.setState({ clientlist_style: { display: 'block' } });
        this.setState({ projectstyle: { display: 'block' } });
        this.setState({ projectcreate_style: { display: 'none' } });
        this.setState({ projectlist_style: { display: 'block' } });
        this.setState({ billstyle: { display: 'block' } });
        this.setState({ billcreate_style: { display: 'none' } });
        this.setState({ billlist_style: { display: 'block' } });
        this.setState({ userstyle: { display: 'block' } });
      }
      else if (this.props.loggeduserDetails.role == 'Sales') {
        this.setState({ clientstyle: { display: 'block' } });
        this.setState({ clientcreate_style: { display: 'block' } });
        this.setState({ clientlist_style: { display: 'block' } });
        this.setState({ projectstyle: { display: 'block' } });
        this.setState({ projectcreate_style: { display: 'block' } });
        this.setState({ projectlist_style: { display: 'block' } });
        this.setState({ billstyle: { display: 'block' } });
        this.setState({ billcreate_style: { display: 'block' } });
        this.setState({ billlist_style: { display: 'block' } });
        this.setState({ userstyle: { display: 'none' } });
      }
      else if (this.props.loggeduserDetails.role == 'Developer') {
        this.setState({ clientstyle: { display: 'none' } });
        this.setState({ clientcreate_style: { display: 'none' } });
        this.setState({ clientlist_style: { display: 'none' } });
        this.setState({ projectstyle: { display: 'block' } });
        this.setState({ projectcreate_style: { display: 'none' } });
        this.setState({ projectlist_style: { display: 'block' } });
        this.setState({ billstyle: { display: 'none' } });
        this.setState({ billcreate_style: { display: 'none' } });
        this.setState({ billlist_style: { display: 'none' } });
        this.setState({ userstyle: { display: 'none' } });
      }
    }

  }
  // CONNECT SOCKET FOR CLIENT CREATE
  connectClientSocket = () => {
    socket.on('clientCreated', (interval) => {
      console.log('......client created.......', interval)

      if (sessionStorage.getItem('id')) {
        console.log('......client created session.......', interval)

        this.props.actions.clientlist(sessionStorage.getItem('id'));
        this.props.actions.dashboardCustomer(sessionStorage.getItem('id'));
        this.props.actions.dashboardProject(sessionStorage.getItem('id'));
      }
      else if (localStorage.getItem('id')) {
        console.log('......client created local.......', interval)

        this.props.actions.clientlist(localStorage.getItem('id'));
        this.props.actions.dashboardCustomer(localStorage.getItem('id'));
        this.props.actions.dashboardProject(localStorage.getItem('id'));
      }
    });
  }
  // CONNECT SOCKET FOR PROJECT CREATE
  connectProjectSocket = () => {
    socket.on('projectCreated', (interval) => {
      console.log('......Project created.......', interval)

      if (sessionStorage.getItem('id')) {
        console.log('......Project created session.......', interval)

        this.props.actions.projectList(sessionStorage.getItem('id'));
        this.props.actions.dashboardCustomer(sessionStorage.getItem('id'));
        this.props.actions.dashboardProject(sessionStorage.getItem('id'));
      }
      else if (localStorage.getItem('id')) {
        console.log('......Project created local.......', interval)

        this.props.actions.projectList(localStorage.getItem('id'));
        this.props.actions.dashboardCustomer(localStorage.getItem('id'));
        this.props.actions.dashboardProject(localStorage.getItem('id'));
      }
    });
  }
  // CONNECT SOCKET FOR USER CREATE
  connectUserSocket = () => {
    socket.on('userCreated', (interval) => {
      console.log('......user created.......', interval)

      if (sessionStorage.getItem('id')) {
        console.log('......User created session.......', interval)

        this.props.actions.userList(sessionStorage.getItem('id'));
        this.props.actions.dashboardCustomer(sessionStorage.getItem('id'));
        this.props.actions.dashboardProject(sessionStorage.getItem('id'));
      }
      else if (localStorage.getItem('id')) {
        console.log('......User created local.......', interval)

        this.props.actions.userList(localStorage.getItem('id'));
        this.props.actions.dashboardCustomer(localStorage.getItem('id'));
        this.props.actions.dashboardProject(localStorage.getItem('id'));
      }
    });
  }
  // CONNECT SOCKET FOR Bill CREATE
  connectBillSocket = () => {
    socket.on('billCreated', (interval) => {
      console.log('......Bill created.......', interval)

      if (sessionStorage.getItem('id')) {
        console.log('......Bill created session.......', interval)

        this.props.actions.billlist(sessionStorage.getItem('id'));
        this.props.actions.dashboardCustomer(sessionStorage.getItem('id'));
        this.props.actions.dashboardProject(sessionStorage.getItem('id'));
      }
      else if (localStorage.getItem('id')) {
        console.log('......bill created local.......', interval)

        this.props.actions.billlist(localStorage.getItem('id'));
        this.props.actions.dashboardCustomer(localStorage.getItem('id'));
        this.props.actions.dashboardProject(localStorage.getItem('id'));
      }
    });
  }

  render() {
    console.log('(((((((((((((())))))))))))render dashboard')
    const { clientstyle, clientcreate_style, clientlist_style, projectcreate_style, projectstyle, projectlist_style, userstyle, billcreate_style, billlist_style, billstyle } = this.state;
    return (
      <div>
        <Layout>
          <Header className="header">
            <Row>
              <Col lg={3}><NavLink to="../dashboard" activeClassName="active">
                <img src={brandlogo} onClick={() => { this.gotoDashboard() }} /></NavLink> </Col>
              <p className="username" style={{ color: '#fff' }}> {this.state.username ? this.state.username : ''} <Button className="wkonlogout" onClick={() => {
                this.showConfirm();

              }}><Icon type="logout" />Log Out</Button></p>
            </Row>
          </Header>
          {this.props.fullloader == true ? <div className="loader">
            <Loader className="ldr" fullPage loading />
          </div> : ""}

          <Loading
            show={this.props.fullloader}
            color="red"
            showSpinner={false}
          />
          {/* Mobile navbar */}
          <div className="mobilenavbar" lg={0}>
            <div className="navbarHeader">
              <img className="logo" src={brandlogo} />
              <Button onClick={this.toggleCollapsed}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>
            </div>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}

              mode="inline"
              theme=""
              inlineCollapsed={this.state.collapsed}
            >
              <p className="welcomeUser"> <img className="logouser" src={userlogo} />Welcome User</p>
              <SubMenu key="client" title={<span><Icon type="usergroup-add" />Clients</span>} subMenuCloseDelay={0.1}>
                <Menu.Item key="create_client">
                  <span>Client Create</span>
                  <NavLink to="../dashboard/clientcreate" activeClassName="active"></NavLink>
                </Menu.Item>
                <Menu.Item key="client_list">
                  <span>Client List</span>
                  <NavLink to="../dashboard/clientlist" activeClassName="active"></NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="projects" title={<span><Icon type="file-text" /> Projects</span>} subMenuCloseDelay={0.1}>
                <Menu.Item key="create_project">
                  <span>Project Create</span>
                  <NavLink to="../dashboard/newproject" activeClassName="active"></NavLink>
                </Menu.Item>
                <Menu.Item key="project_list">
                  <span>Project List</span>
                  <NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="user" title={<span><Icon type="user" />User Management</span>} subMenuCloseDelay={0.1}>
                <Menu.Item key="create_user">
                  <span>Create User</span>
                  <NavLink to="../dashboard/createuser" activeClassName="active"></NavLink>
                </Menu.Item>
                <Menu.Item key="user_list">
                  <span>User List</span>
                  <NavLink to="../dashboard/userlist" activeClassName="active"></NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="bill" title={<span><Icon type="file-text" />Bill Managements</span>} subMenuCloseDelay={0.1}>
                <Menu.Item key="create_bill">
                  <span>Bill Create</span>
                  <NavLink to="../dashboard/bill" activeClassName="active"></NavLink>
                </Menu.Item>
                <Menu.Item key="bill_list">
                  <span>Bill List</span>
                  <NavLink to="../dashboard/billlist" activeClassName="active"></NavLink>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="bill_list">
                <span><Icon type="logout" /> Log Out</span>
              </Menu.Item>
              <SubMenu key="sheet" title={<span><Icon type="file-text" />Timesheet management</span>} subMenuCloseDelay={0.1}>

              </SubMenu>

            </Menu>
          </div>
          {/* Mobile navbar */}
          <Layout>
            <Sider width={200} style={{ background: '#fff' }} className="siderDisplay">
              <Menu
                onOpenChange={this.openChange}
                onClick={this.handleClick}
                mode="inline"
                selectedKeys={this.state.selectedKey}

                defaultOpenKeys={this.state.selectedKey}
                style={{ height: '100%', borderRight: 0 }}
                openKeys={this.state.openKeys}
              >
                <Menu.Item key="home">
                  <Icon type="home" />
                  <span>Home</span>
                  <NavLink to="../dashboard" activeClassName="active"></NavLink>
                </Menu.Item>

                <SubMenu style={clientstyle} key="client" title={<span><Icon type="usergroup-add" />Clients</span>} subMenuCloseDelay={0.1}>
                  <Menu.Item key="create_client" style={clientcreate_style} >
                    <span>Client Create</span>
                    <NavLink to="../dashboard/clientcreate" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="client_list" style={clientlist_style} >
                    <span>Client List</span>
                    <NavLink to="../dashboard/clientlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>

                <SubMenu style={projectstyle} key="projects" title={<span><Icon type="file-text" /> Projects</span>} subMenuCloseDelay={0.1}>

                  <Menu.Item key="create_project" style={projectcreate_style}>
                    <span>Project Create</span>
                    <NavLink to="../dashboard/newproject" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="project_list" style={projectlist_style}>
                    <span>Project List</span>
                    <NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>

                <SubMenu style={userstyle} key="user" title={<span><Icon type="user" />User Management</span>} subMenuCloseDelay={0.1}>
                  <Menu.Item key="create_user">
                    <span>Create User</span>
                    <NavLink to="../dashboard/createuser" activeClassName="active"></NavLink>
                  </Menu.Item>
                  <Menu.Item key="user_list">
                    <span>User List</span>
                    <NavLink to="../dashboard/userlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>


                <SubMenu style={billstyle} key="bill" title={<span><Icon type="solution" />Bill Managements</span>} subMenuCloseDelay={0.1}>

                  <Menu.Item key="create_bill" style={billcreate_style}>
                    <span>Bill Create</span>
                    <NavLink to="../dashboard/bill" activeClassName="active"></NavLink>
                  </Menu.Item>

                  <Menu.Item key="bill_list" style={billlist_style}>
                    <span>Bill List</span>
                    <NavLink to="../dashboard/billlist" activeClassName="active"></NavLink>
                  </Menu.Item>
                </SubMenu>


                <Menu.Item key="timesheet">
                  <Icon type="calendar" />
                  <span>Timesheet</span>
                  <NavLink to="../dashboard/timesheet" activeClassName="active"></NavLink>
                </Menu.Item>

               

                {/* <Menu.Item key="ChatScreen">
                  <Icon type="area-chart" />
                  <span>CHAT</span>
                  <NavLink to="../dashboard/chat" activeClassName="active"></NavLink>
                </Menu.Item> */}


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
                <Route exact path={`${this.props.match.url}/project/:projectname`} component={Files} />
                <Route exact path={`${this.props.match.url}/singleproject`} component={ProjectManagement} />
                <Route exact path={`${this.props.match.url}/timesheet`} component={timesheetManagement} />
                <Route exact path={`${this.props.match.url}/projecttab`} component={ProjectTab} />
                <Route exact path={`${this.props.match.url}/chat`} component={ChatScreen} />
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
function mapDispatchToProps(dispatch, state) {
  return ({
    actions: bindActionCreators(basicActions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

//export default Dashboard;