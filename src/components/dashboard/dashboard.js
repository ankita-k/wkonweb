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
      openKeys: []
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
        _base.props.history.push('/login');

      },
      onCancel() {
        console.log('Cancel');
      },

    })
  }

  gotoDashboard = () => {
    this.props.actions.menuKeys('home');
    this.props.actions.openkey([]);
   
  }

  handleClick = (nav) => {
    console.log(nav);
    this.props.actions.menuKeys(nav.key);
    
    if (nav.key == 'home') {
      this.props.actions.openkey([])
    };
   
  }

  openChange = (nav) => {
   
    if (nav.length >= 1) {

      let key = nav[nav.length - 1];
     
      this.props.actions.openkey(key);
     
    } else {
      this.props.actions.openkey([])
     
    }
  }




  componentDidMount() {
    console.log(this.props);

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
    //***** */


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
    /* SHOWING LOGGEDIN USER NAME AFTER RECEIVING DATA FROM PROPS*/
    if (this.props.loggeduserDetails) {
      this.setState({ username: this.props.loggeduserDetails.name });
      this.setState({ userrole: this.props.loggeduserDetails.role })
    }

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
              <SubMenu key="user" title={<span>User Management</span>} subMenuCloseDelay={0.1}>
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
                // defaultSelectedKeys={this.state.selectedKey}
                defaultOpenKeys={this.state.selectedKey}
                style={{ height: '100%', borderRight: 0 }}
                openKeys={this.state.openKeys}
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
                {this.state.userrole ? this.state.userrole == "Developer" || "admin" || 'Sales' ?
                  <SubMenu key="projects" title={<span><Icon type="file-text" /> Projects</span>} subMenuCloseDelay={0.1}>
                    {this.state.userrole != "Developer" ?
                      <Menu.Item key="create_project">
                        <span>Project Create</span>
                        <NavLink to="../dashboard/newproject" activeClassName="active"></NavLink>
                      </Menu.Item> : ''}
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

                {this.state.userrole ? this.state.userrole == "admin" || "Sales" ?
                  <SubMenu key="bill" title={<span><Icon type="solution" />Bill Managements</span>} subMenuCloseDelay={0.1}>
                    {
                      this.state.userrole == "Sales" ?
                        <Menu.Item key="create_bill">
                          <span>Bill Create</span>
                          <NavLink to="../dashboard/bill" activeClassName="active"></NavLink>
                        </Menu.Item> : ''
                    }
                    <Menu.Item key="bill_list">
                      <span>Bill List</span>
                      <NavLink to="../dashboard/billlist" activeClassName="active"></NavLink>
                    </Menu.Item>
                  </SubMenu>
                  : '' : ''}
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
                <Route exact path={`${this.props.match.url}/project/:projectname`} component={Files} />
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
function mapDispatchToProps(dispatch, state) {
  return ({
    actions: bindActionCreators(basicActions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

//export default Dashboard;