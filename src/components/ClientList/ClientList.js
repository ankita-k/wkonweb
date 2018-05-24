import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Modal, Col, Layout } from 'antd';
import '../NewProject/NewProject.css';
import './ClientList.css';
import { connect } from "react-redux";
import * as clientListAction from '../../redux/action';
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { Select } from 'antd';
import warning from '../../Images/war.png';
import editList from '../../Images/file.svg';
import deleteList from '../../Images/garbage.svg';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
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
      trueClientList: [],
      loading: false,
      visible: false,
      searchinput: '',
      searchinput: '',
      allclient: 'All',
      userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
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
        title: 'currency',
        dataIndex: 'currency',
        key: 'currency',
      }, {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: 'paypal-id',
        dataIndex: 'paypal_id',
        key: 'paypal_id',
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }, {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Row>
            <Col lg={{ span: 4 }}>
              <Button className="edita" onClick={() => { this.editClient(record) }}>
                <a href="javascript:;"> <img className="fileIcon" src={editList} /></a></Button></Col>
            <Col lg={{ span: 4 }}></Col>
            {/* <Col lg={{ span: 10 }}>
              <Button className="delete" onClick={this.showModal}><a href="javascript:;"><img className="fileIcon" src={deleteList} /></a></Button>
            </Col> */}

          </Row>
        ),
      }]

    }
  }

  componentDidMount() {
    console.log('++++++++++++++++component will mount++++++++++++++++', this.props);
    this.setState({ show: true });
    this.commonFunction();
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.commonFunction();
  }

  // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
  commonFunction() {
    /* SHOWING CLIENT LIST AFTER RECEIVING DATA FROM PROPS*/
    if (this.props.clientList.length > 0) {
      this.setState({ searchedclient: (this.props.clientList) });
      this.setState({ show: false });
    }
    this.handleChange((this.props.location.filterValue));
  }

  //edit client
  editClient = (data) => {
    this.props.actions.menuKeys('create_client');
    this.props.history.push({
      pathname: '/dashboard/editclient',
      data: {
        data
      }
    })

  }

  //**DELETE CLIENT ACTION CALLING  */
  deleteClient = () => {
    this.setState({ show: true })
    this.props.actions.deleteclient(this.state.selectedId._id, sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'), this.props.history);
    this.setState({ visible: false })

  }





  // SEACRH CLIENT LIST ACCORDING TO INPUT 
  searchClient = (e) => {
    console.log('search data', e);
    let newarray = this.props.clientList.filter(d => {
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
      this.setState({
        searchedclient: this.props.clientList
      });
    }
  }

  //handlechange function
  handleChange = (value) => {
    // let searchedclient = [];
    if (value != null || value != undefined) {
      this.setState({ statussearch: value })
      if (value == 'All') {
        this.setState({ statussearch: 'All' });
        this.setState({ searchinput: '' });
        this.setState({
          searchedclient: this.props.clientList
        });
      }
      else {
        this.setState({
          searchedclient:
            this.props.clientList.filter(a => {
              return a.status.indexOf(value) > -1
            })
        })
      }
    }
    else {
      console.log("Show client list . . . . . . . . .. . ");
      this.setState({
        searchedclient: this.props.clientList
      }, function () {
        this.forceUpdate();
      });
    }

  }

  render() {

    // modal
    const { visible, loading } = this.state;
    // modal
    const columns = this.state.column;
    return (

      <div className="clientListdiv">
        {/* {this.state.show == true ? <div className="loader">
          <Loader className="ldr" fullPage loading />
        </div> : ""}

        <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        /> */}
        <div className="projectListheader">
          <h1 className="clientList">Client List</h1>
          <Row>
            <div className="addButton clientadd">
              <Button onClick={() => { this.props.actions.menuKeys('create_client'); this.props.history.push('/dashboard/clientcreate') }}>+</Button>
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
              {(this.state.statussearch) ?
                <Select className="scoping" value={this.state.statussearch} style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="All">All</Option>
                  <Option value="Interested">Interested</Option>
                  <Option value="Pipeline">Pipeline</Option>
                  <Option value="Commited">Committed</Option>


                </Select> :
                <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="All">All</Option>
                  <Option value="Interested">Interested</Option>
                  <Option value="Pipeline">Pipeline</Option>
                  <Option value="Commited">Committed</Option>


                </Select>
              }
              <Button className="allprojectbtn" onClick={() => {
                this.handleChange('All')
              }}>Show All</Button>

            </div>
          </Row>
        </div>
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
function mapDispatchToProps(dispatch, state) {
  return ({
    actions: bindActionCreators(clientListAction, dispatch)
  })
}
//export default ClientList;
export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
