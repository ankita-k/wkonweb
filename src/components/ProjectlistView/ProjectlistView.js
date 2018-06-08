import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Col, Modal } from 'antd';
import { connect } from "react-redux";
import * as projectlistAction from '../../redux/action';
import { bindActionCreators } from 'redux';
import { Select } from 'antd';
import '../ClientList/ClientList.css';
import '../ProjectlistView/ProjectlistView.css';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import moment from 'moment';
import warning from '../../Images/war.png';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import editList from '../../Images/file.svg';
import deleteList from '../../Images/garbage.svg';
const Option = Select.Option;
const Search = Input.Search;
// import { Input } from 'antd';

class ProjectlistView extends Component {
  state = {
    loading: false,
    visible: false,
    selectedId: '' //  SELECT ROW ID for 
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }


  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
      selectedRowKeys: [],
      allproject: 'All',
      addStyle: { display: 'block' },
      edit_style: { display: 'block' },
      delete_style: { display: 'block' },
      view_style: { display: 'block' },
    }
  }



  componentDidMount() {
    this.commonFunction();
  }

  // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
  commonFunction = () => {
    console.log('ppppppp   PROJECT LIST ', this.props)
    this.handleChange(this.props.location.filterValue ? this.props.location.filterValue : 'All');

    /**HIDE ACTION FROM ADMIN */
    if (Object.keys(this.props.loggeduserDetails).length != 0) {
    if (this.props.loggeduserDetails.role == 'admin') {
      this.setState({ addStyle: { display: 'none' } })
      this.setState({ edit_style: { display: "none" } });
      this.setState({ delete_style: { display: "none" } });
      this.setState({ view_style: { display: "block" } });
    }
    else if (this.props.loggeduserDetails.role == 'Developer' && this.props.loggeduserDetails.tags.length == 0) {
      this.setState({ addStyle: { display: 'none' } })
      this.setState({ edit_style: { display: "none" } });
      this.setState({ delete_style: { display: "none" } });
      this.setState({ view_style: { display: "block" } });
    }
    else if (this.props.loggeduserDetails.role == 'Developer' && this.props.loggeduserDetails.tags.length != 0) {
      this.setState({ addStyle: { display: 'none' } })
      this.setState({ edit_style: { display: "block" } });
      this.setState({ delete_style: { display: "block" } });
      this.setState({ view_style: { display: "block" } });
    }
    else if (this.props.loggeduserDetails.role == 'Sales') {
      this.setState({ addStyle: { display: 'block' } })
      this.setState({ edit_style: { display: "block" } });
      this.setState({ delete_style: { display: "block" } });
      this.setState({ view_style: { display: "block" } });
    }
  }
    //* HIDE CLIENT CREATION AND PROJECT CREATION ICON FROM ADMIN AND DEVELOPER/
    // if (Object.keys(this.props.loggeduserDetails).length != 0) {
    //   if (this.props.loggeduserDetails.role == 'Sales') {
    //     this.setState({ addStyle: { display: 'block' } })
    //   }
    //   else {
    //     this.setState({ addStyle: { display: 'none' } })
    //   }
    // }
  }

  // DELETE PROJECT  API CALL
  deleteProject = () => {
    this.props.actions.deleteproject(this.state.userId, this.state.selectedId._id, this.props.history)
    this.setState({ visible: false })
  }

  // NAVIAGE TO EDIT PROJECT PAGE WITH DATA
  editProject = (data) => {
    this.props.actions.menuKeys('create_project');    // FOR CHANGING SELECTED KEY IN MENU ITEM
    this.props.history.push({
      pathname: '/dashboard/editProject',
      data: {
        data
      }
    })

  }

  // NAVIAGE TO EDIT PROJECT PAGE WITH DATA
  sendProjectData = (data) => {
    // this.props.actions.menuKeys('create_project');    // FOR CHANGING SELECTED KEY IN MENU ITEM
    this.props.history.push({
      pathname: '/dashboard/singleproject',
      data: {
        data
      }
    })

  }



  // CHANGE FOR STATUS CHANGE OF PROJECT
  handleChange = (value) => {
    console.log(`selected ${value}`);
    let searchedList;
    if (value != null || value != undefined) {
      this.setState({ statussearch: value })
      this.setState({ searchinput: '' });
    }
    else {
      this.setState({ statussearch: "" })
    }

  }


  // GET ALL PROJECT LIST
  viewProject = () => {
    this.props.actions.projectList(this.state.userId);
  }

  // SearchProject ACCORDING TO INPUR GIVEN
  searchproject = (val) => {
    this.setState({ searchinput: val })

  }

  //Show All project list
  showallList = (e) => {
    console.log(e);
    this.setState({ searchinput: e })
  }


  /** LOGIC FOR SEARCHING PROJECT  ACCORDING TO STATUS OR NAME OR  */
  logicForProjectSearch = (item, value, inputvalue) => {
    if (inputvalue == "" && value == "All") {
      return true
    }
    else {
      if (inputvalue) {
        return item.name.toLowerCase().indexOf(inputvalue.toLowerCase()) > -1
      }
      else {
        return (item.status.indexOf(value) > -1)
      }
    }
  }


  // NAVIGATE TO PROJECT DETAIL PAGE
  detailProject = (record) => {
    this.props.history.push({
      pathname: '/dashboard/projecttab',
      data: {
        record
      }
    });
  }
  render() {
    console.log('render')
    const columns = this.state.column;
    const { visible, loading, addStyle, statussearch, searchinput, edit_style, delete_style, view_style } = this.state;
    return (
      <div className="projectListdiv">
        {/* {this.state.show == true ? <div className="loader">
          <Loader className="ldr" fullPage loading />
        </div> : ""}
        <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        /> */}

        <div className="projectListheader">
          <h1 className="clientList">Project List</h1>
          <Row>
            <div className="AllProjects">
              <Search className="SearchValue"
                placeholder="Search Here.."
                onSearch={value => { this.searchproject(value) }}
                style={{ width: 200 }}
                onChange={(e) => { this.showallList(e.target.value) }}
                enterButton
                value={this.state.searchinput}


              />
              {(this.state.statussearch) ?
                <Select className="scoping" value={this.state.statussearch} style={{ width: 120 }} onChange={this.handleChange}>

                  <Option value="All">All</Option>
                  <Option value="New">New</Option>
                  <Option value="InDiscussion">InDiscussion</Option>
                  <Option value="Scoping">Scoping</Option>
                  <Option value="InProgess">InProgess</Option>
                  <Option value="Stalled">Stalled</Option>
                  <Option value="Completed">Completed</Option>

                </Select> :


                <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>

                  <Option value="All">All</Option>
                  <Option value="New">New</Option>
                  <Option value="InDiscussion">InDiscussion</Option>
                  <Option value="Scoping">Scoping</Option>
                  <Option value="InProgess">InProgess</Option>
                  <Option value="Stalled">Stalled</Option>
                  <Option value="Completed">Completed</Option>

                </Select>
              }

              <Button className="allprojectbtn" onClick={() => {
                this.handleChange('All')
              }}>All Projects</Button>


              <div className="addButton project" style={addStyle}>
                <Button onClick={() => { this.props.actions.menuKeys('create_project'); this.props.history.push('/dashboard/newproject') }} >+</Button>
              </div>


            </div>
          </Row>

        </div>
        {/* clientlist */}
        <Card className="innercardContenta" bordered={false}>
          <Table
            onRow={(record, x) => {
              return {
                onClick: () => { console.log(record), this.setState((prevstate) => { return { selectedId: record } }) },
                // click row
              };
            }}
            columns={
              [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',


              }, {
                title: 'Brief Requirement',
                dataIndex: 'requirement',
                key: 'requirement',
              }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
              }, {
                title: 'Technology',
                dataIndex: 'technology',
                key: 'technology',
              }, {
                title: 'Expected Start Date',
                dataIndex: 'expectedStartDate',
                key: 'expectedStartDate',
              },
              {
                title: 'Actual Start Date',
                dataIndex: 'actualStartDate',
                key: 'astart',
              },
              {
                title: 'Expected End Date',
                dataIndex: 'expectedEndDate',
                key: 'expectedtask',
              }, {
                title: 'Actual End Date',
                dataIndex: 'actualEndDate',
                key: 'taskend',
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Row className="btns">
                    <Col lg={8} style={edit_style}>
                      <Button className="edit" onClick={() => { this.editProject(record) }}>
                        <a href="javascript:;"><img className="fileIcon" src={editList} /></a></Button></Col>

                    <Col lg={8} style={delete_style}>
                      <Button className="delete" onClick={this.showModal} ><a href="javascript:;"><img className="fileIcon" src={deleteList} /></a></Button>
                    </Col>
                    <Col lg={7} style={view_style}>
                      <Button className="view" onClick={() => { this.detailProject(record) }}>
                        <a href="javascript:;"><Icon type="eye-o" /></a></Button></Col>
                  </Row>

                ),
              }
              ]

            } dataSource={this.props.projectList.filter((item) => { return this.logicForProjectSearch(item, statussearch, searchinput) })} />
        </Card>
        {/* clientlist */}
        <div className="deletemodal">

          <Modal
            className="delmodal"
            visible={visible}
            wrapClassName="vertical-center-modal"
            title="Confirm"
            onOk={() => { this.deleteProject(this.state.selectedId) }}
            onCancel={this.handleCancel}
            footer={[
              <Button className="nobtn" key="back" onClick={this.handleCancel}>NO</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={() => { this.deleteProject(this.state.selectedId) }}>
                YES
            </Button>,
            ]}
          >
            <Row>
              <Col lg={4}>
                <img src={warning} />
              </Col>
              <Col lg={18}>
                <p className="modaltxt">Are you sure you want to delete this project?</p>
                <p className="modaltxt">You can't undo this action.</p>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}
// export default ProjectlistView;
const mapStateToProps = (state) => {
  return state
}


function mapDispatchToProps(dispatch, state) {
  return ({
    actions: bindActionCreators(projectlistAction, dispatch)
  })
}
// const WrappedProjectlistView 

export default connect(mapStateToProps, mapDispatchToProps)(ProjectlistView);
