import React, { Component } from 'react';
import { Card, Table, Button, Icon, Row, Input, Modal, Col } from 'antd';
import '../NewProject/NewProject.css';
import './billList.css';
import { connect } from "react-redux";
import * as billlistAction from '../../redux/action';
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { Select } from 'antd';
import warning from '../../Images/war.png';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import moment from 'moment';
import editList from '../../Images/file.svg';
import deleteList from '../../Images/garbage.svg';
const Search = Input.Search;
const Option = Select.Option;




class BillList extends Component {

    state = {
        loading: false,
        visible: false,
        bills: [],
        selectedId: '',
        show: true, //loading-bar  
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
            billerlist: [],
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
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
            }, {
                title: 'BillNumber',
                dataIndex: 'billNumber',
                key: 'billNumber',
            }, {
                title: 'BillingDate',
                dataIndex: 'billingDate',
                key: 'billingDate',
            }, {
                title: 'Client',
                dataIndex: 'client',
                key: 'client',
            }, {
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
            }, {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
            }, {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: 'PaypalAccountName',
                dataIndex: 'paypalAccountName',
                key: 'paypalAccountName',
            }, {
                title: 'PaypalBillNumber',
                dataIndex: 'paypalBillNumber',
                key: 'paypalBillNumber',
            }, {
                title: 'ProjectCost',
                dataIndex: 'projectCost',
                key: 'projectCost',
            }, {
                title: 'ProjectName',
                dataIndex: 'projectName',
                key: 'projectName',
            }, {
                title: 'ReceivedAmount',
                dataIndex: 'receivedAmount',
                key: 'receivedAmount',
            }, {
                title: 'ReceivedDate',
                dataIndex: 'receivedDate',
                key: 'receivedDate',
            }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            }, {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Row>
                        <Col lg={{ span: 10 }}>
                            <Button className="edit" onClick={() => { this.editBill(record) }}>
                                <a href="javascript:;"><img className="fileIcon" src={editList} /></a></Button></Col>
                        <Col lg={{ span: 8 }}></Col>
                        {/* <Col lg={{ span: 10 }}>
                            <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
                        </Col> */}

                    </Row>
                ),
            }]

        }
    }
    componentDidMount() {
     
        console.log(this.props);
        this.setState({ show: true })
        this.commonFunction();

    }
    componentWillReceiveProps(props) {
     
        console.log('component will receive props');
        console.log(props)
        this.commonFunction();

    }

    // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS

    commonFunction() {
        /* CODE FOR GETTING BILLIST AND SHOWING IN TABLE USING PROPS  */
        if (this.props.billList.length > 0) {
        
            this.setState({ show: false });
            this.setState({ searchedBill: this.props.billList });
        }
        /*   CODE FOR GETTING BILLIST AND SHOWING IN TABLE USING PROPS ENDS   */
    }

    //edit bill
    editBill = (data) => {
       this.props.actions.menuKeys('create_bill');
        this.props.history.push({
            pathname: '/dashboard/editbill',
            data: {
                data
            }
        })

    }
    // // SHOW ALL BILL LIST
    showallList = (e) => {
        console.log('target value', e)
        this.setState({ searchinput: e })
        if (e == '') {
            this.setState({ searchedBill: this.props.billList })
        }
    }

    // // SEACRH BILL LIST ACCORDING TO INPUT
    searchFilter = (e) => {
        let newarray = this.props.billList.filter(item => {
            return (item.email.toLowerCase().indexOf(e.toLowerCase()) > -1) || (item.BDE.toLowerCase().indexOf(e.toLowerCase()) > -1) || (item.company.toLowerCase().indexOf(e.toLowerCase()) > -1) || (item.paypalAccountName.toLowerCase().indexOf(e.toLowerCase()) > -1) || (item.status.toLowerCase().indexOf(e.toLowerCase()) > -1)

        });
        console.log(newarray);
        this.setState({ searchedBill: newarray })
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
                {/* <div className="billlistheader"> */}
                    <h1 className="clientList">Bill List</h1>
                    <Row>
                        <div className="addButton billeradd">
                            <Button onClick={() => {this.props.actions.menuKeys('create_bill'); this.props.history.push('/dashboard/bill') }}>+</Button>
                        </div>
                        {/* </Row>
                <Row> */}
                        <div className="AllProjects">
                            <Search className="SearchValue"
                                placeholder="input search text"
                                onSearch={(value) => { this.searchFilter(value) }}
                                style={{ width: 200 }}
                                onChange={(e) => { this.showallList(e.target.value) }}
                                enterButton
                            // value={this.state.searchinput}

                            />

                            {/* <Select className="scoping" defaultValue="All" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="All">All</Option>
                            <Option value="Interested">Pending</Option>
                            <Option value="Pipeline">Completed</Option>
                        </Select> */}

                            {/* <Button className="allprojectbtn" onClick={() => {
                            this.setState({ searchedclient: this.state.clientlist });
                            this.setState({ statussearch: this.state.c });
                            this.setState({ searchinput: '' })
                        }}>Show All</Button> */}

                        </div>
                    </Row>
                {/* </div> */}
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
    console.log('bill list', state);
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(billlistAction, dispatch)
    })
}
//export default ClientList;
export default connect(mapStateToProps, mapDispatchToProps)(BillList);
