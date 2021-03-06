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
import mail from '../../Images/close-envelope.svg';
import editList from '../../Images/file.svg';
import deleteList from '../../Images/garbage.svg';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
const Search = Input.Search;
const Option = Select.Option;

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
      selectedId: '',  //FOR SELECT CLIENT ROW ID
      loading: false,
      visible: false,
      searchinput: '',
      allclient: 'All',
      statussearch: '',
      userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
      addStyle: { display: 'block' },
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
                <a href="javascript:;"> <img className="fileIcon" src={editList} /></a></Button>
            </Col>
            <Col lg={{ span: 4 }}>
              <Button style={record.mailstatus == true ? { display: 'none' } : { display: 'block' }} className="email" onClick={() => { this.SendEmail(record) }}>
                <a href="javascript:;"><img className="mail" src={mail}/></a></Button>
            </Col>
            <Col lg={{ span: 4 }}></Col>
            {/* <Col lg={{ span: 10 }}>
              <Button className="delete" onClick={this.showModal}><a href="javascript:;"><img className="fileIcon" src={deleteList} /></a></Button>
            </Col> */}
          </Row>
        ),
      }]

    }
  }

  componentDidMount(props) {
    console.log('++++++++++++++++component will mount++++++++++++++++', this.props);
  //* HIDE CLIENT CREATION AND PROJECT CREATION ICON FROM ADMIN AND DEVELOPER && HIDE ACTIONS OPTIONS FOR OTHER USER LOGIN THAN SALES /
    if (Object.keys(this.props.loggeduserDetails).length != 0) {
      if (this.props.loggeduserDetails.role == 'Sales') {
        this.setState({ addStyle: { display: 'block' } })
      }
      else {
        this.setState({ addStyle: { display: 'none' } })
        this.state.column.pop();
      }
    }

    this.handleChange((this.props.location.filterValue ? this.props.location.filterValue : 'All'));
  }

 // GO TO EDIT PAGE OF CLIENT WITH SELECTED CLIENT DATA
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
    this.props.actions.deleteclient(this.state.selectedId._id, sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'), this.props.history);
    this.setState({ visible: false })

  }


  // SEACRH CLIENT LIST ACCORDING TO INPUT 
  searchClient = (e) => {

    this.setState({ searchinput: e })
  }

  // SHOW ALL CLIENT LIST
  showallList = (e) => {
    this.setState({ searchinput: e })
  }

  //handlechange function
  handleChange = (value) => {
    console.log(value)
    if (value != null || value != undefined) {
      this.setState({ statussearch: value })
      this.setState({ searchinput: '' });
    }
    else {
      this.setState({ statussearch: "" })
    }

  }

  /** LOGIC FOR SEARCHING CLIENT ACCORDING TO STATUS OR NAME */
  logicForClientSearch = (item, value, inputvalue) => {
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

    //  APICALL FOR SENDING MAIL TO USER
    SendEmail = (client) => {
      console.log(client);
      let data = {
        name: client.name,
        email: client.email,
        subject: 'Please Login To Your Account',
        userId: this.state.userId,
        clientId: client._id
      }
      console.log(data)
      this.props.actions.emailService(data)
    }

    render() {
      console.log('CLIENT LIST PAGE RENDER')
      // modal
      const { visible, loading, addStyle, statussearch, searchinput } = this.state;
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
              <div className="addButton clientadd" style={addStyle}>
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
                    <Option value="Committed">Committed</Option>


                  </Select> :
                  <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="All">All</Option>
                    <Option value="Interested">Interested</Option>
                    <Option value="Pipeline">Pipeline</Option>
                    <Option value="Committed">Committed</Option>


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

              columns={columns} dataSource={this.props.clientList.filter((item) => { return this.logicForClientSearch(item, statussearch, searchinput) })} />

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
