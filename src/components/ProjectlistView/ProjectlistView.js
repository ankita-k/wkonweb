import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input } from 'antd';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { Select } from 'antd';
import '../ClientList/ClientList.css';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import moment from 'moment';
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
      // {
      //   title: 'Actual Start Date',
      //   dataIndex: 'astart',
      //   key: 'astart',
      // }, {
      //   title: 'Expected End Date',
      //   dataIndex: 'expectedtask',
      //   key: 'expectedtask',
      // }, {
      //   title: 'Actual End Date',
      //   dataIndex: 'taskend',
      //   key: 'taskend',
      //},
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            {/* <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span> */}

            <Button className="edit" >
              <a href="javascript:;"><Icon type="edit" /></a></Button>
            <Button className="delete" onClick={() => { this.deleteProject(record) }}><a href="javascript:;"><Icon type="delete" /></a></Button>
          </span>
        ),
      }
      ]
    }
  }

  deleteProject = (data) => {
    console.log(data);
    this.props.deleteproject(data._id).then(response => {
      console.log(response)
    }, err => {
      console.log(err)
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
      console.log(sucess);
      this.setState({ projectList: sucess.result });
      var data = sucess.result;
      data.map(function (item, index) {
        return data[index] = {
          name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
          requirement: item.requirement.length > 15 ? (item.requirement.slice(0, 15) + '...') : item.requirement,
          status: item.status,
          technology: item.technology.length > 20 ? (item.technology.slice(0, 20) + '...') : item.technology,
          expectedStartDate: moment(item.expectedStartDate).format("MMM Do YY"),
          key: Math.random() * 1000000000000000000,
          _id:item._id
        }
      })

      this.setState({ searchedList: data });

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
            onRow={(record) => {
              return {
                onClick: () => { console.log(record) },       // click row
              };
            }}
            columns={columns} dataSource={this.state.searchedList} />
        </Card>
        {/* clientlist */}
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
