import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input,Modal,Col } from 'antd';
import '../NewProject/NewProject.css';
import './ClientList.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import warning from '../../Images/war.png';
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

// modal for delete start
// state = {
//   ModalText: 'Content of the modal',
//   visible: false,
//   confirmLoading: false,
// }
// showModal = () => {
//   this.setState({
//     visible: true,
//   });
// }
// handleok = () => {
//   this.setState({
//     ModalText: 'The modal will be closed after two seconds',
//     confirmLoading: true,
//   });
//   setTimeout(() => {
//     this.setState({
//       visible: false,
//       confirmLoading: false,
//     });
//   }, 2000);
// }
// handleCancel = () => {
//   console.log('Clicked cancel button');
//   this.setState({
//     visible: false,
//   });
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

      searchedclient: [],
      searchinput: '',
      columns: [{
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
          // <span>
          //   <Button className="edit">
          //     <a href="javascript:;"><Icon type="edit" /></a></Button>
          //   <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
           
          // </span>
         <Row>
<Col lg={10}>
<Button className="edit">
              <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
              <Col lg="8"></Col>
              <Col lg={10}>
            <Button className="delete" onClick={this.showModal} ><a href="javascript:;"><Icon type="delete" /></a></Button>
</Col>

           </Row>
        ),
      }]

    }
  }


  componentDidMount() {


    // GET CLIENT LIST
    this.setState({ show: true })
    console.log('component will mount')
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
    const columns = this.state.columns;
    // modal
    const { visible, loading } = this.state;
    // modal
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
        <div className="deletemodal">
        
        <Modal
        className="delmodal"
          visible={visible}
          wrapClassName="vertical-center-modal"
          title="Confirm"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button className="nobtn" key="back" onClick={this.handleCancel}>NO</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              YES
            </Button>,
          ]}
        >
        <Row>
          <Col lg={4}>
        <img src={warning}/>
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
const mapStateToProps = (state) => {
  console.log(state);
  return state
}
//export default ClientList;
export default connect(mapStateToProps, actioncreators)(ClientList);
