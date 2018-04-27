import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Modal, Col } from 'antd';
import '../NewProject/NewProject.css';
import './billList.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { Select } from 'antd';
import warning from '../../Images/war.png';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
const Search = Input.Search;
const Option = Select.Option;



class BillList extends Component {

    state = {
        loading: false,
        visible: false,
        bills: [],
        selectedId:''
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
            clientlist: [],
            show: true, //loading-bar        
            selectedId: '',  //FOR SELECT CLIENT ROW ID
            searchedBill: [],
            searchinput: '',
            c: 'All',
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            column: [{
                title: 'BDE',
                dataIndex: 'BDE',
                key: 'BDE',

            }, {
                title: 'balance',
                dataIndex: 'balance',
                key: 'balance',
            }, {
                title: 'billNumber',
                dataIndex: 'billNumber',
                key: 'billNumber',
            }, {
                title: 'billingDate',
                dataIndex: 'billingDate',
                key: 'billingDate',
            }, {
                title: 'client',
                dataIndex: 'client',
                key: 'client',
            }, {
                title: 'company',
                dataIndex: 'company',
                key: 'company',
            }, {
                title: 'currency',
                dataIndex: 'currency',
                key: 'currency',
            }, {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: 'paypalAccountName',
                dataIndex: 'paypalAccountName',
                key: 'paypalAccountName',
            }, {
                title: 'paypalBillNumber',
                dataIndex: 'paypalBillNumber',
                key: 'paypalBillNumber',
            }, {
                title: 'projectCost',
                dataIndex: 'projectCost',
                key: 'projectCost',
            }, {
                title: 'projectName',
                dataIndex: 'projectName',
                key: 'projectName',
            },{
                title: 'receivedAmount',
                dataIndex: 'receivedAmount',
                key: 'receivedAmount',
            },{
                title: 'receivedDate',
                dataIndex: 'receivedDate',
                key: 'receivedDate',
            },{
                title: 'status',
                dataIndex: 'status',
                key: 'status',
            },{
                title: 'type',
                dataIndex: 'type',
                key: 'type',
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
    componentDidMount() {
        this.getBills();

    }

    // get billlist
    getBills = () => {
        this.props.billlist(this.state.userId).then((result) => {
            console.log(result);
            if (!result.error) {
                this.setState({ bills: result.result })
                console.log(this.state.bills);
                var data = result.result;
                data.map(function (item, index) {
                    return data[index] = {
                        BDE: item.BDE,
                        balance: item.balance,
                        billNumber: item.billNumber,
                        billingDate: item.billingDate,
                        client: item.client,
                        company: item.company,
                        currency: item.currency,
                        email: item.email,
                        paypalAccountName: item.paypalAccountName,
                        paypalBillNumber: item.paypalBillNumber,
                        projectCost: item.projectCost,
                        projectName: item.projectName,
                        receivedAmount: item.receivedAmount,
                        receivedDate: item.receivedDate,
                        status: item.status,
                        type: item.type,
                        key: Math.random() * 1000000000000000000,
                        _id: item._id
                    }

                })
                this.setState({ searchedBill: data });

            }

        }, err => {

        })
    }

    // EDIT TO Bill EDIT PAGE WITH SENDING DATA
    editClient=(data)=>{
        this.props.history.push({
            pathname: '/dashboard/bill',
            data: {
              data
            }
          })
    }
// SEACRH BILL LIST ACCORDING TO INPUT 
// searchClient = (e) => {
//     let newarray = this.state.bills.filter(item => {
//         return item.name.toLowerCase().indexOf(e.toLowerCase()) > -1
  
//       });
//       console.log(newarray);
//       this.setState({ searchedBillName: newarray })
// }

    render() {

        // modal
        const { visible, loading } = this.state;
        // modal
        const columns = this.state.column;
        return (

            <div className="clientListdiv">
                {/* {this.state.show == true ? <div className="loader">
          <Loader className="ldr" fullPage loading />
        </div> : ""} */}

                {/* <Loading
          show={this.state.show}
          color="red"
          showSpinner={false}
        /> */}
                <h1 className="clientList">BILL LIST</h1>
                <Row>
                    <div className="addButton clientadd">
                        <Button onClick={() => { this.props.history.push('/dashboard/bill') }}>+</Button>
                    </div>
                </Row>
                <Row>
                    <div className="AllProjects">
                        <Search className="SearchValue"
                            placeholder="input search text"
                            style={{ width: 200 }}
                            
                        />

                        <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="All">All</Option>
                            <Option value="Interested">Pending</Option>
                            <Option value="Pipeline">Completed</Option>
                        </Select>

                        <Button className="allprojectbtn" onClick={() => {
                            this.setState({ searchedclient: this.state.clientlist });
                            this.setState({ statussearch: this.state.c });
                            this.setState({ searchinput: '' })
                        }}>Show All</Button>

                    </div>
                </Row>

                {/* billlist */}
                <Card className="innercardContenta" bordered={false}>
                    <Table
                        onRow={(record) => {
                            return {
                                onClick: () => { console.log(record), this.setState((prevstate) => { return { selectedId: record } }) },       // click row
                            };
                        }}
                        columns={columns} dataSource={this.state.searchedBill} />
                </Card>
                {/* clientlist */}
                <div className="deletemodal">

                    {/* <Modal
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
                <p className="modaltxt">Are you sure you want to delete this bill?</p>
                <p className="modaltxt">You can't undo this action.</p>
              </Col>
            </Row>
          </Modal> */}
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
export default connect(mapStateToProps, actioncreators)(BillList);
