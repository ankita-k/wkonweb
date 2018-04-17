import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input } from 'antd';
import '../NewProject/NewProject.css';
import './ClientList.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const Search = Input.Search;
// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   key: 'name',

// }, {
//   title: 'Phone',
//   dataIndex: 'phoneNumber',
//   key: 'phoneNumber',
// }, {
//   title: 'Email',
//   dataIndex: 'email',
//   key: 'email',
// }, {
//   title: 'Domain',
//   dataIndex: 'domain',
//   key: 'domain',
// }, {
//   title: 'Country',
//   dataIndex: 'country',
//   key: 'country',
// }, {
//   title: 'Status',
//   dataIndex: 'status',
//   key: 'status',
// }, {
// title: 'Action',
// key: 'action',
// render: (text, record) => (
//   <span>
//     <Button className="edit">
//       <a href="javascript:;"><Icon type="edit" /></a></Button>
//     <Button className="delete"><a href="javascript:;"><Icon type="delete" /></a></Button>
//   </span>
// ),
//}];

const data = [{
  key: '1',
  name: 'Sukanta Sinha',
  phone: 876778906,
  email: 'sukantasinha@memeinfotech.com',
  domain: 'Lorem',
  country: 'New York',
  status: 'Pipeline',
}, {
  key: '2',
  name: 'Payel Dutta',
  phone: 826778906,
  email: 'payeldutta@memeinfotech.com',
  domain: 'Lorem',
  country: 'London',
  status: 'Pipeline',
}, {
  key: '3',
  name: 'Priyanka Saha',
  phone: 846778906,
  email: 'priyankasaha@memeinfotech.com',
  domain: 'Lorem',
  country: 'Sydney',
  status: 'Pipeline',
}];
class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientlist: [],
      show: true, //loading-bar        

      searchedclient: [],
      searchinput: '',
      column: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

      }, {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
      }, {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button className="edit" onClick={() => { this.editClient(record) }}>
              <a href="javascript:;"><Icon type="edit" /></a></Button>
            <Button className="delete" onClick={() => { this.deleteClient(record) }}><a href="javascript:;"><Icon type="delete" /></a></Button>
          </span>
        ),
      }]

    }
  }

  //edit client
  editClient = (data) => {
    this.props.history.push({
      pathname: '/dashboard/clientcreate',
      data: {
        data
      }
    })

  }

  //delete client
  deleteClient = (data) => {
    console.log(data);
    this.props.deleteclient(data._id).then(response => {
      console.log(response)
      if (!response.error) {
        this.props.opentoast('success', 'Client Deleted Successfully!');
        this.getclients();
      }
    }, err => {

    })

  }

  componentDidMount() {


    // GET CLIENT LIST
    this.setState({ show: true })
    console.log('component will mount')
    this.getclients();
  }

  getclients = () => {
    this.props.clientlist(sessionStorage.getItem('id'), 0, 30).then((data) => {
      this.setState({ show: false });
      console.log(data);
      this.setState({ clientlist: data.result });
      this.setState({ searchedclient: data.result })
      console.log(this.state.clientlist);
    }, err => {

    })

  }
  // SEACRH CLIENT LIST ACCORDING TO INPUT 
  searchClient = (e) => {
    console.log('search data', e);
    let newarray = this.state.clientlist.filter(d => {
      return d.name.toLowerCase().indexOf(e.toLowerCase()) > -1

    });
    console.log(newarray)
    this.setState({ searchedclient: newarray })
  }

  // SHOW ALL CLIENT LIST
  showallList = (e) => {
    console.log('target value', e)
    this.setState({ searchinput: e })
    if (e == '') {
      this.setState({ searchedclient: this.state.clientlist })
    }
  }

  render() {
    const columns = this.state.column;
    return (

      <div className="clientListdiv">

        <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        />
        <h1 className="clientList">CLIENT LIST</h1>
        <Row>
          <div className="addButton clientadd">
            <Button onClick={() => { this.props.history.push('/dashboard/clientcreate') }}>+</Button>
          </div>
        </Row>
        <Row>
          <div className="AllProjects">
            <Search className="SearchValue"
              placeholder="input search text"
              onSearch={(value) => { this.searchClient(value) }}
              style={{ width: 200 }}
              onChange={(e) => { this.showallList(e.target.value) }}
              enterButton
              value={this.state.searchinput}
            />
            <Button className="allprojectbtn" onClick={() => {
              this.setState({ searchedclient: this.state.clientlist });
              this.setState({ searchinput: '' })
            }}>Show All</Button>
          </div>
        </Row>

        {/* clientlist */}
        <Card className="innercardContenta" bordered={false}>
          <Table columns={columns} dataSource={this.state.searchedclient} />
        </Card>
        {/* clientlist */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return state
}
//export default ClientList;
export default connect(mapStateToProps, actioncreators)(ClientList);
