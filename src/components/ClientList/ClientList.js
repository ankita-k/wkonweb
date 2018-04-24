import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Modal, Col } from 'antd';
import '../NewProject/NewProject.css';
import './ClientList.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { Select } from 'antd';
import warning from '../../Images/war.png';
const Search = Input.Search;
const Option = Select.Option;


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

  // modal for delete start
  // state = {
  //   ModalText: 'Content of the modal',
  //   visible: false,
  //   confirmLoading: false,
  // }
  //   setTimeout(() => {
  //     this.setState({
  //       visible: false,
  //       confirmLoading: false,
  //     });
  //   }, 2000);
  // }
  state = {
    loading: false,
    visible: false,
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

  // modal for delete end
  constructor(props) {
    super(props);
    this.state = {
      clientlist: [],
      show: true, //loading-bar        
      selectedId: '',  //FOR SELECT CLIENT ROW ID
      searchedclient: [],
      searchinput: '',
      c:'All',
      userId: sessionStorage.getItem('id')?sessionStorage.getItem('id'):localStorage.getItem('id'),
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
          <Row>
            <Col lg={{ span: 10 }}>
              <Button className="edit" onClick={() => { this.editClient(record) }}>
                <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
            <Col lg={{ span: 8 }}></Col>
            <Col lg={{ span: 10 }}>
              <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
            </Col>

          </Row>
        ),
      }]

    }
  }

  //edit client
  editClient = (data) => {
    this.props.history.push({
      pathname: '/dashboard/editclient',
      data: {
        data
      }
    })

  }

  //delete client
  deleteClient = () => {
    this.props.deleteclient(this.state.selectedId._id).then(response => {
      console.log(response)
      this.setState({ visible: false })
      if (!response.error) {
        this.props.opentoast('success', 'Client Deleted Successfully!');
        this.getclients();
      }
    }, err => {

    })

  }

  componentDidMount() {
    console.log(this.props)
    this.getclients().then(success => {
      if (this.props.location.filterValue) {
        
        // this.setState({statussearch:this.props.location.filterValue})
        this.handleChange(this.props.location.filterValue)
        console.log(this.state.statussearch)
      }
    })


    // GET CLIENT LIST
    this.setState({ show: true })
    console.log('component will mount')

  }


  getclients = () => {
    return new Promise((resolve, reject) => {

      this.props.clientlist(this.state.userId, 0, 30).then((data) => {
        if (!data.error) {
          this.setState({ show: false });
          console.log(data);
          this.setState({ clientlist: data.result });
          var data = data.result;
          data.map(function (item, index) {
            return data[index] = {
              name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
              phoneNumber: item.phoneNumber,
              email: item.email,
              domain: item.domain,
              country: item.country,
              status: item.status,
              key: Math.random() * 1000000000000000000,
              _id: item._id
            }

          })

          if (!this.props.location.filterValue) {
            this.setState({ searchedclient: data });

          }
          resolve(true)
        }

      }, err => {
        this.setState({ show: false });
      })

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
  //handlechange function
  handleChange = (value) => {
 
    console.log(`selected ${value}`);
    let searchedclient;
    if (value) {
      this.setState({statussearch:value})
      if (value == 'All') {
        this.setState({ searchedclient: this.state.clientlist });
      }
      else {
        searchedclient = this.state.clientlist.filter(a => {
          return a.status.indexOf(value) > -1
        });
        this.setState({ searchedclient })
        console.log("filtered data", this.state.searchedclient);
      }
    }

  }

  render() {

    // modal
    const { visible, loading } = this.state;
    // modal
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
            <Select className="scoping" value={this.state.statussearch}style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="All">All</Option>
              <Option value="Interested">Interested</Option>
              <Option value="Pipeline">Pipeline</Option>
              <Option value="Commited">Commited</Option>


            </Select>
            <Button className="allprojectbtn" onClick={() => {
              this.setState({ searchedclient: this.state.clientlist });
              this.setState({statussearch:this.state.c});
              this.setState({ searchinput: '' })
            }}>Show All</Button>

          </div>
        </Row>

        {/* clientlist */}
        <Card className="innercardContenta" bordered={false}>
          <Table
            onRow={(record) => {
              return {
                onClick: () => { console.log(record), this.setState((prevstate) => { return { selectedId: record } }) },       // click row
              };
            }}
            columns={columns} dataSource={this.state.searchedclient} />
        </Card>
        {/* clientlist */}
        <div className="deletemodal">

          <Modal
            className="delmodal"
            visible={visible}
            wrapClassName="vertical-center-modal"
            title="Confirm"
            onOk={() => { this.deleteClient(this.state.selectedId) }}
            onCancel={this.handleCancel}
            footer={[
              <Button className="nobtn" key="back" onClick={this.handleCancel}>NO</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={() => { this.deleteClient(this.state.selectedId) }}>
                YES
            </Button>,
            ]}
          >
            <Row>
              <Col lg={4}>
                <img src={warning} />
              </Col>
              <Col lg={18}>
                <p className="modaltxt">Are you sure you want to delete this client?</p>
                <p className="modaltxt">You can't undo this action.</p>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return state
}
//export default ClientList;
export default connect(mapStateToProps, actioncreators)(ClientList);
