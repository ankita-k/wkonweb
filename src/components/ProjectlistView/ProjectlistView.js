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
      projectList: [],
      searchedList: [],
      userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
      selectedRowKeys: [],
      show: true,  //loading-bar
      allproject: 'All',
      column: [{
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
            <Col lg={8}>
              <Button className="edit" onClick={() => { this.editProject(record) }}>
                <a href="javascript:;"><img className="fileIcon" src={editList} /></a></Button></Col>

            <Col lg={8}>
              <Button className="delete" onClick={this.showModal} ><a href="javascript:;"><img className="fileIcon" src={deleteList} /></a></Button>
            </Col>
            <Col lg={7}>
              <Button className="view" onClick={() => { this.detailProject(record) }}>
                <a href="javascript:;"><Icon type="eye-o" /></a></Button></Col>
          </Row>
        ),
      }
      ]
    }
  }



  componentDidMount() {
    this.setState({ show: true });
    this.commonFunction();
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.commonFunction();
  }

  // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
  commonFunction = () => {
    this.setState({ show: false });
    this.handleChange(this.props.location.filterValue);
  }
  // DELETE PROJECT 
  deleteProject = () => {
    this.setState({ show: true });
    this.props.actions.deleteproject(this.state.userId, this.state.selectedId._id, this.props.history)
    this.setState({ show: false });
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



  // CHANGE FOR STATUS CHANGE OF PROJECT
  handleChange = (value) => {
    console.log(`selected ${value}`);
    let searchedList;
    if (value != null || value != undefined) {
      this.setState({ statussearch: value })
      if (value == 'All') {
        this.setState({ searchinput: '' })
        this.setState({ statussearch: 'All' });
        this.setState({ searchedList: this.props.projectList });
      }
      else {
        searchedList = this.props.projectList.filter(a => {
          return a.status.indexOf(value) > -1
        });
        this.setState({ searchedList })
        console.log("filtered data", this.state.searchedList);
      }
    }
    else {
      console.log(this.props.projectList);
      this.setState({
        searchedList: this.props.projectList
      });
    }

  }


  // GET ALL PROJECT LIST
  viewProject = () => {
    this.setState({ show: true });
    this.props.actions.projectList(this.state.userId);
  }

  // SearchProject ACCORDING TO INPUR GIVEN
  searchproject = (val) => {
    let newarray = this.props.projectList.filter(f => {
      return f.name.toLowerCase().indexOf(val.toLowerCase()) > -1
    });
    console.log(newarray)
    this.setState({ searchedList: newarray })


  }

  //Show All project list
  showallList = (e) => {
    console.log(e);
    this.setState({ searchinput: e })
    if (e == '') {
      this.setState({ searchedList: this.props.projectList })
    }
  }

  // NAVIGATE TO PROJECT DETAIL PAGE
  detailProject = (record) => {

    this.props.history.push('/dashboard/singleproject')
  }


  render() {
    console.log('render')
    const columns = this.state.column;
    const { visible, loading } = this.state;
    return (
      <div className="projectListdiv">
        {this.state.show == true ? <div className="loader">
          <Loader className="ldr" fullPage loading />
        </div> : ""}
        <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        />

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


              <div className="addButton project">
                <Button onClick={() => {this.props.actions.menuKeys('create_project'); this.props.history.push('/dashboard/newproject') }} >+</Button>
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
            columns={columns} dataSource={this.state.searchedList} />
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
