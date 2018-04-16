import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row } from 'antd';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { Select } from 'antd';
import '../ClientList/ClientList.css';
const Option = Select.Option;

const columns = [{
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
  dataIndex: 'estart',
  key: 'estart',
}, {
  title: 'Actual Start Date',
  dataIndex: 'astart',
  key: 'astart',
}, {
  title: 'Expected End Date',
  dataIndex: 'expectedtask',
  key: 'expectedtask',
}, {
  title: 'Actual End Date',
  dataIndex: 'taskend',
  key: 'taskend',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Button className="edit">
        <a href="javascript:;"><Icon type="edit" /></a></Button>
      <Button className="delete"><a href="javascript:;"><Icon type="delete" /></a></Button>
    </span>
  ),
}];

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
      projectArray: [],
      page: 0,
      limit: 20,
      userId: sessionStorage.getItem('id'),

    }


  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
    let projectArray;
    if (value) {
      if (value == 'All') {
        this.setState({ projectArray: this.state.projectList });
      }
      else {
        projectArray = this.state.projectList.filter(a => {
          return a.status.indexOf(value) > -1
        });
        this.setState({ projectArray })
        console.log("filtered data", this.state.projectArray);
      }
    }

  }
  componentWillMount() {
    this.viewProject();
  }
  // GET ALL PROJECT LIST
  viewProject = () => {
    // debugger
    console.log('project List')
    this.props.projectList(this.state.userId, this.state.page, this.state.limit).then((sucess) => {
      console.log(sucess);
      this.setState({ projectList: sucess.result });
      this.setState({ projectArray: sucess.result });
      console.log(this.state.projectList)
    }, err => {

    });
  }


  render() {
    console.log('render')
    return (
      <div className="projectListdiv">
        <h1 className="clientList">PROJECT LIST</h1>
        <div>
          <Select defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="All">All</Option>
            <Option value="New">New</Option>
            <Option value="InDiscussion">InDiscussion</Option>
            <Option value="Scoping">Scoping</Option>
            <Option value="InProgess">InProgess</Option>
            <Option value="Stalled">Stalled</Option>
            <Option value="Completed">Completed</Option>

          </Select>
        </div>
        <Row>
          <div className="addButton clientadd">
            <Button onClick={() => { this.props.history.push('/dashboard/newproject') }} >+</Button>
          </div>

        </Row>
        {/* clientlist */}
        <Card className="innercardContenta" bordered={false}>
          <Table columns={columns} dataSource={this.state.projectArray} />
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
