import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Spin, Col, Card, Select, DatePicker } from 'antd';
import './billForm.css';
import { Divider } from 'antd';
import * as billACtion from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css';
import debounce from 'lodash/debounce';
import moment from 'moment'
import * as actioncreators from '../../redux/action';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
var NumberFormat = require('react-number-format');

class BillForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,   //FOR PROGRESS LOADING BAR
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            projectlist: [],
            disableclient: false,
            disableproject: false,
            filteredclient: [],
            editBill: false,

        }

    }


    componentDidMount() {
        console.log(this.props);
        console.log(this.props.location)
        if (this.props.location.data) {
            console.log(this.props.location.data.data);
            this.setState({ disableclient: true });
            this.setState({ disableproject: true });
            this.setState({ editBill: true })
            this.props.form.setFieldsValue({
                ['ProjectName']: this.props.location.data.data.projectName,
                ['clientName']: this.props.location.data.data.client ? this.props.location.data.data.client : '',
                ['CompanyName']: this.props.location.data.data.company1,
                ['status']: this.props.location.data.data.status,
                ['type']: this.props.location.data.data.type,
                ['billingdate']: this.props.location.data.data.billingDate ? moment(this.props.location.data.data.billingDate) : '',
                ['Paybillno']: this.props.location.data.data.paypalBillNumber1,
                ['billno']: this.props.location.data.data.billNumber1,
                ['bdename']: this.props.location.data.data.BDE1,
                ['email']: this.props.location.data.data.email,
                ['projectcost']: this.props.location.data.data.projectCost,
                ['paypalaccount']: this.props.location.data.data.paypalAccountName1,
                ['amountrecord']: this.props.location.data.data.receivedAmount,
                ['balance']: this.props.location.data.data.balance,
                ['receiveddate']: this.props.location.data.data.receivedDate ? moment(this.props.location.data.data.receivedDate) : '',
                ['currency']: this.props.location.data.data.currency,
            });
        }

        /*GET PROJECT LIST FROM PROPS*/
        if (this.props.projectList.length > 0) {
            this.setState({ projectlist: this.props.projectList })
        }
        /*GET PROJECT LIST FROM PROPS  ENDS*/

    }

    // FUNCTION CALLED ON SAVE BUTTON
    save = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ show: true });
                console.log('Received values of form: ', values);

                if (this.props.location.data && this.props.location.data.data) {

                    let data = {
                        userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
                        billingDate: values.billingdate ? values.billingdate._d : '',
                        paypalBillNumber: values.Paybillno,
                        billNumber: values.billno,
                        BDE: values.bdename,
                        type: values.type,
                        client: this.props.location.data.data.client1,
                        company: values.CompanyName,
                        paypalAccountName: values.paypalaccount,
                        email: values.email,
                        ProjectName: values.ProjectName,
                        projectCost: parseInt(values.projectcost),
                        receivedAmount: parseInt(values.amountrecord),
                        balance: parseInt(values.balance),
                        currency: values.currency,
                        receivedDate: values.receiveddate ? values.receiveddate._d : '',
                        status: values.status,
                    }
                    console.log(data);

                    this.props.actions.BillEdit(data, this.props.location.data.data._id, this.props.history)
                  
                }
                else {
                    let billdata = {
                        userId: this.state.userId,
                        billingDate: values.billingdate._d,
                        paypalBillNumber: values.Paybillno,
                        billNumber: values.billno,
                        BDE: values.bdename,
                        type: values.type,
                        client: this.state.filteredclient[0].client._id,
                        company: values.CompanyName,
                        paypalAccountName: values.paypalaccount,
                        email: values.email,
                        projectName: values.ProjectName,
                        projectCost: parseInt(values.projectcost),
                        receivedAmount: parseInt(values.amountrecord),
                        balance: parseInt(values.balance),
                        currency: values.currency,
                        receivedDate: values.receiveddate._d,
                        status: values.status
                    }
                    console.log(billdata)
                    this.props.actions.billCreate(billdata, this.props.history);
                   
                }

            }
        })
    }

    //  SELECT PROJECT AND GET CLIENT DETAILS FOR SHOWING IN FEILD
    selectProject = (id) => {
        let filteredValue = {}
        filteredValue = this.state.projectlist.filter(d => {

            return d._id.toLowerCase().indexOf(id.toLowerCase()) > -1
        });
        console.log(filteredValue)
        this.setState({ filteredclient: filteredValue })

        this.props.form.setFieldsValue({
            ['clientName']: filteredValue[0].client.name,
            ['email']: filteredValue[0].client.email,
            ['CompanyName']: filteredValue[0].client.company?filteredValue[0].client.company:'',
            ['currency']:filteredValue[0].client.currency,
        })
        this.setState({ disableclient: true })

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                lg: { span: 24 },

            },

        };

        const { fetching, techArray, value } = this.state;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />
                <div className="newCustomerform">

                    {(this.state.editBill == true) ?
                        <h1 className="NewCustomer">Edit Bill</h1> : <h1 className="NewCustomer">New Bill</h1>
                    }
                    {/* <h1 className="NewCustomer">New Bill</h1> */}
                    {/* <Divider dashed className="underLine" /> */}
                </div>
                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}
                    <Form onSubmit={this.save} className="login-form">
                        <div className="inputForminfo informationProject">
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <p className="expecteDateclient">Choose Project :</p>
                                        <FormItem>
                                            {getFieldDecorator('ProjectName', {
                                                rules: [{ required: true, message: 'Please select a project!' },],
                                                // initialValue:{props.location.data}
                                            },

                                            )(
                                                <Select className="statuspipeline"
                                                    placeholder="Project"
                                                    onChange={this.selectProject}
                                                    showSearch
                                                    disabled={this.state.disableproject}
                                                >
                                                    {this.state.projectlist.map((project, index) => {
                                                        return <Option key={index} value={project._id}>{project.name}</Option>
                                                    })}

                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Client Name">
                                            {getFieldDecorator('clientName', {
                                                rules: [{ required: true, message: 'Please input client name!' }],
                                            })(

                                                <Input disabled={this.state.disableclient} placeholder="Client Name" maxlength="30"/>
                                            )}
                                        </FormItem>

                                    </Col>
                                </Row>
                            </div>
                            <Row className="briefRequire">
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Company Name">
                                        {getFieldDecorator('CompanyName', {
                                            rules: [{ required: true, message: 'Please provide Company Name !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input  disabled={this.state.disableclient}  placeholder="Company Name" maxlength="50"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Currency">
                                            {getFieldDecorator('currency', {
                                                rules: [{ required: true, message: 'Please choose currency !' }],
                                            })(
                                                <Select className="statuspipeline"
                                                    placeholder="Select type"

                                                >
                                                    <Option value="USD">USD</Option>
                                                    <Option value="GBP">GBP</Option>
                                                    <Option value="AUD">AUD</Option>
                                                    <Option value="INR">INR</Option>
                                                    <Option value="EUR">EUR</Option>
                                                    <Option value="AED">AED</Option>

                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                            </Row>
                            <Row>

                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem className="tech" label="Type">
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true, message: 'Please input  Type!' }],
                                        })(
                                            <Select
                                                placeholder="Select type"
                                            >
                                                <Option value="New">New</Option>
                                                <Option value="Old">Old</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <div className="startDate">
                                        <p className="expecteDate">Billing Date :</p>
                                        <FormItem
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('billingdate', {
                                                rules: [{ required: false, message: 'Please select billing date!' },
                                                    // {
                                                    //     validator: this.validatetoexpecend
                                                    // }
                                                ]
                                            })(
                                                <DatePicker />
                                            )}
                                        </FormItem>
                                    </div>
                                </Col>
                            </Row>

                            <div className="spaceLess">
                                <Row>

                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    {/* <NumberFormat format="#### #### #### ####" /> */}
                                        <FormItem label="Pay Bill No">
                                            {getFieldDecorator('Paybillno', {
                                                rules: [{ required: true, message: 'Please input pay bill no!' }],
                                            })(

                                                <NumberFormat format="#### #### #### ####"  placeholder="Bill Number" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Meme Bill No ">
                                            {getFieldDecorator('billno', {
                                                rules: [{ required: true, message: 'Please input bill number !' }],
                                            })(

                                                <NumberFormat format="#### #### #### ####" placeholder="Bill" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <div className="spaceLess">
                                <Row>

                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="BDE Name">
                                            {getFieldDecorator('bdename', {
                                                rules: [{ required: true, message: 'Please input  bde name!' }],
                                            })(

                                                <Input maxLength="50" placeholder="Name" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Email ">
                                            {getFieldDecorator('email', {
                                                rules: [{ required: true, message: 'Please input client email !' }],
                                            })(

                                                <Input disabled={this.state.disableclient} placeholder="Email" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>


                            </div>

                            {/* **************ROW FOR EMAIL AND PROJECTCOST  STARTS*************** */}
                            <div className="spaceLess">
                                <Row>

                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Project Cost">
                                            {getFieldDecorator('projectcost', {
                                                rules: [{ required: true, message: 'Please input cost!' }],
                                            })(

                                                <NumberFormat format="#### #### #### ####" placeholder="Amount"  />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Pay Pal Account Name">
                                            {getFieldDecorator('paypalaccount', {
                                                rules: [{ required: true, message: 'Please input account!' }],
                                            })(
                                                <Input placeholder="Account" maxlength="40"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            {/* ***************OW FOR EMAIL AND PROJECTCOST  ENDS************ */}
                            {/* ********** ROW FOR PAYPALACCOUNT AND AMOUNT RECORD STARTS***************** */}
                            <div>
                                <Row>


                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Amount Record">
                                            {getFieldDecorator('amountrecord', {
                                                rules: [{ required: true, message: 'Please input record!' }],
                                            })(

                                                <NumberFormat format="#### #### #### ####" placeholder="Amount"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Balance">
                                            {getFieldDecorator('balance', {
                                                rules: [{ required: true, message: 'Please input !' }],
                                            })(
                                                <NumberFormat format="#### #### #### ####" placeholder="Amount" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                            </div>
                            {/* **************ROW FOR PAYPALACCOUNT AND AMOUNT RECORD ENDS************** */}
                            {/* ************************ROW FOR BALANCE AND CREDIT RECORD STARTS************* */}
                            <div>
                                <Row>


                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate">Received Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('receiveddate', {
                                                    rules: [{ required: false, message: 'Please select billing received date!' },
                                                        // {
                                                        //     validator: this.validatetoexpecend
                                                        // }
                                                    ]
                                                })(
                                                    <DatePicker />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                  
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Bill Status">
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: 'Please select Biiling status!' }],
                                        })(
                                            <Select className="statuspipeline"

                                                placeholder="Status"
                                                // onChange={this.handleSelectChange}
                                                showSearch
                                            >
                                                <Option value="pending">Pending</Option>
                                                <Option value="complete">Complete</Option>
                                                <Option value="Cancelled">Cancelled</Option>
                                                <Option value="Refunded">Refunded</Option>


                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>

                                </Row>

                            </div>
                            {/* *******************ROW FOR BALANCE AND CREDIT RECORD ENDS******************** */}

                            {/* *************ROW FOR CURRENCY STARTS*********** */}
                            <div>
                                <Row>

                                </Row>
                            </div>
                            {/* **********ROW FOR CURRENCY ENDS*********** */}
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button" >Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.actions.menuKeys('bill_list');this.props.history.push('/dashboard/billlist') }} >Cancel</Button>
                            </div>
                        </FormItem>

                    </Form>

                    {/* --NewProject details-- */}
                </Card>

            </div>
        );
    }

}
const mapStateToProps = (state) => {
    console.log('billform screen info', state)
    return state

}

function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(billACtion, dispatch)
    })
}
const WrappedBillForm = Form.create()(BillForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedBillForm);