import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Col, Modal } from 'antd';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { Select } from 'antd';
import '../ClientList/ClientList.css';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import moment from 'moment';
import warning from '../../Images/war.png';
const Option = Select.Option;
const Search = Input.Search;
// import { Input } from 'antd';

// remaining

// const data = [{
//   key: '1',
//   name: 'Sukanta Sinha',
//   requirement: 'Lorem',
//   status: 'Pipeline',
//   technology: 'techniques',
//   estart: '13-04-2018',
//   astart: '14-04-2018',
//   expectedtask: '13-05-2018',
//   taskend: '14-05-2018',

// }, {
//   key: '2',
//   name: 'Payel Dutta',
//   requirement: 'Lorem',
//   status: 'Pipeline',
//   technology: 'techniques',
//   estart: '15-04-2018',
//   astart: '09-04-2018',
//   expectedtask: '25-05-2018',
//   taskend: '28-05-2018',


// }, {
//   key: '3',
//   name: 'Priyanka Saha',
//   requirement: 'Lorem',
//   status: 'Pipeline',
//   technology: 'techniques',
//   estart: '14-04-2018',
//   astart: '10-04-2018',
//   expectedtask: '23-05-2018',
//   taskend: '30-05-2018',

// }];

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
      page: 0,
      limit: 20,
      userId: sessionStorage.getItem('id'),
      selectedRowKeys: [],
      show: true,  //loading-bar
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
          // <span>
          //   {/* <span style={{ marginLeft: 8 }}>
          //     {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          //   </span> */}

          //   <Button className="edit">
          //     <a href="javascript:;"><Icon type="edit" /></a></Button>
          //   <Button className="delete" onClick={() => { this.deleteProject(record) }}><a href="javascript:;"><Icon type="delete" /></a></Button>
          // </span>
          <Row>
            <Col lg={10}>
              <Button className="edit" onClick={() => { this.editProject(record) }}>
                <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
            <Col lg="8"></Col>
            <Col lg={10}>
              <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
            </Col>

          </Row>
        ),
      }
      ]
    }
  }
  // delete 
  deleteProject = () => {
    // console.log(data);
    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
    this.props.deleteproject(this.state.selectedId._id).then(response => {
      console.log(response);
      this.setState({ visible: false })
      if (!response.error) {
        this.props.opentoast('success', 'Project Deleted Successfully!');
        this.viewProject();
      }
    }, err => {
      console.log(err)
    })
  }
  // edit
  editProject = (data) => {
    console.log(data);
    console.log("hellllloo");
    this.props.history.push({
      pathname: '/dashboard/newproject',
      data: {
        data
      }
    })

  }




  handleChange = (value) => {
    console.log(`selected ${value}`);
    let searchedList;
    if (value) {
      if (value == 'All') {
        this.setState({ searchedList: this.state.projectList });
      }
      else {
        searchedList = this.state.projectList.filter(a => {
          return a.status.indexOf(value) > -1
        });
        this.setState({ searchedList })
        console.log("filtered data", this.state.searchedList);
      }
    }

  }
  componentDidMount() {
    this.viewProject();
  }

  // GET ALL PROJECT LIST
  viewProject = () => {
    console.log('project List');
    this.setState({ show: true })
    this.props.projectList(this.state.userId, this.state.page, this.state.limit).then((sucess) => {
      this.setState({ show: false });

      if (!sucess.error) {
        console.log(sucess);
        this.setState({ projectList: sucess.result });
        var data = sucess.result;
        data.map(function (item, index) {
          return data[index] = {
            name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
            requirement: item.requirement.length > 15 ? (item.requirement.slice(0, 15) + '...') : item.requirement,
            status: item.status,
            technology: item.technology.length > 20 ? (item.technology.slice(0, 20) + '...') : item.technology,
            expectedStartDate: moment(item.expectedStartDate).format("ll"),
            expectedEndDate: moment(item.expectedStartDate).format("ll"),
            actualStartDate: moment(item.actualStartDate).format("ll"),
            actualEndDate: moment(item.actualEndDate).format("ll"),
            key: Math.random() * 1000000000000000000,
            _id: item._id,
            client: item.client
          }
        })

        this.setState({ searchedList: data });
      }

    }, err => {
      this.setState({ show: false });
    });
  }



  //SearchProject
  searchproject = (val) => {
    let newarray = this.state.projectList.filter(f => {
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
      this.setState({ searchedList: this.state.projectList })
    }
  }


  render() {
    console.log('render')
    const columns = this.state.column;
    const { visible, loading } = this.state;
    return (
      <div className="projectListdiv">
        <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        />
        <h1 className="clientList">PROJECT LIST</h1>

        <div className="AllProjects">
          <Search className="SearchValue"
            placeholder="input search text"
            onSearch={value => { this.searchproject(value) }}
            style={{ width: 200 }}
            onChange={(e) => { this.showallList(e.target.value) }}
            enterButton
            value={this.state.searchinput}


          />
          <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="All">All</Option>
            <Option value="New">New</Option>
            <Option value="InDiscussion">InDiscussion</Option>
            <Option value="Scoping">Scoping</Option>
            <Option value="InProgess">InProgess</Option>
            <Option value="Stalled">Stalled</Option>
            <Option value="Completed">Completed</Option>

          </Select>
          <Button className="allprojectbtn" onClick={() => {
            this.setState({ searchedList: this.state.projectList });
            this.setState({ searchinput: '' })
          }}>All Projects</Button>
        </div>
        <Row>
          <div className="addButton clientadd">
            <Button onClick={() => { this.props.history.push('/dashboard/newproject') }} >+</Button>
          </div>

        </Row>
        {/* clientlist */}
        <Card className="innercardContenta" bordered={false}>
          <Table
            onRow={(record, x) => {
              return {
                onClick: () => { console.log(record), this.setState((prevstate) => { return { selectedId: record } }) },       // click row
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
                <p>Are you sure you Want to delete this file?</p>
                <p>You can't undo this action.</p>
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
// const WrappedProjectlistView 

export default connect(mapStateToProps, actioncreators)(ProjectlistView);
