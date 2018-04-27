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

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class BillForm extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }

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
                // sm: { span: 16 },
            },
            // required:false
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }, {
                validator: this.datevalidate
            }]
        };
        const { fetching, techArray, value } = this.state;
        return (
            <div>
                {/* <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                /> */}

                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}
                    <div className="newCustomerform">

                        {/* {(this.state.editClient == true) ?
                        <h1 className="NewCustomer">Edit Project</h1> : <h1 className="NewCustomer">New Project</h1>
                    } */}
                        <h1 className="NewCustomer">New Bill</h1>
                        {/* <Divider dashed className="underLine" /> */}
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo informationProject">
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <p className="expecteDateclient">Choose Project :</p>
                                        <FormItem>
                                            {getFieldDecorator('ProjectName', {
                                                rules: [{ required: true, message: 'Please select a client!' },],
                                                // initialValue:{props.location.data}
                                            },

                                            )(
                                                <Select className="statuspipeline"

                                                placeholder="Project"
                                                // onChange={this.handleSelectChange}
                                                showSearch
                                            >
                                                <Option value="New">project 1</Option>
                                                
                                            </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Customer Name">
                                            {getFieldDecorator('Customername', {
                                                rules: [{ required: true, message: 'Please input your Name!' }],
                                            })(

                                                <Input maxLength="50" placeholder="Name" />
                                            )}
                                        </FormItem>
                                        {/* <FormItem label="Brief Requirement">
                                    {getFieldDecorator('requirement', {
                                        rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                    })(
                                        <Input placeholder="Brief Requirement" />
                                    )}
                                </FormItem> */}
                                        {/* <FormItem label="Client List">
                                    {getFieldDecorator('client', {
                                        rules: [{ required: true, message: 'Please select your client!' }],
                                    })(
                                        <Select className="statuspipeline"
                                            placeholder="Choose Client"
                                            onChange={this.handleSelectChange}
                                        >
                                            <Option value="Client1">Client1</Option>
                                            <Option value="Client2">Client2</Option>
                                            <Option value="Client3">Client3</Option>
                                        </Select>
                                    )}
                                </FormItem> */}

                                    </Col>
                                </Row>
                            </div>
                            <Row className="briefRequire">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Company Name">
                                        {getFieldDecorator('Companyname', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Project Status">
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select className="statuspipeline"

                                                placeholder="Status"
                                                // onChange={this.handleSelectChange}
                                                showSearch
                                            >
                                                <Option value="New">New</Option>
                                                <Option value="InDiscussion">InDiscussion</Option>
                                                <Option value="Scoping">Scoping</Option>
                                                <Option value="InProgess">InProgess</Option>
                                                <Option value="Stalled">Stalled</Option>
                                                <Option value="Completed">Completed</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem className="tech" label="Type">
                                        {getFieldDecorator('Type', {
                                            rules: [{ required: true, message: 'Please input your Type!' }],
                                        })(
                                            <Select
                                                // mode="multiple"
                                                // labelInValue
                                                // value={value}
                                                placeholder="Select users"
                                                // notFoundContent={fetching ? <Spin size="small" /> : null}
                                                // filterOption={false}
                                                // onSearch={this.searchTechnology}
                                                // onChange={this.handleChange}
                                                // style={{ width: '100%' }}

                                            >
                                                {/* {techArray.map(d =>
                                                    <Option value={d}>{d}</Option>
                                                )} */}
                                                <Option value="Completed">type1</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate">Billing Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('Billing Date', {
                                                    rules: [{ required: false, message: 'Please select expecteddate!' }, {
                                                        validator: this.validatetoexpecend
                                                    }]
                                                })(
                                                    <DatePicker />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Pay Bill No">
                                        {getFieldDecorator('PayBillNo  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Meme Bill No ">
                                        {getFieldDecorator('Memebillno  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="BDE Name">
                                        {getFieldDecorator('BDEName  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                    </Col>
                                </Row>
                              

                            </div>

                            {/* **************email & project cost ************** */}
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Email ">
                                        {getFieldDecorator('Email  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Email" />
                                        )}
                                    </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Project Cost">
                                        {getFieldDecorator('projectcost  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Cost" />
                                        )}
                                    </FormItem>
                                    </Col>
                                </Row>
                                </div>
                                {/* *************************** */}
                                {/* ********** new div section***************** */}
                                <div>
                                <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                <FormItem label="Pay Pal Account Name">
                                        {getFieldDecorator('paypalaccount  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                    
                                <Col xs={24} sm={24} md={24} lg={24}>
                                <FormItem label="Amount Record">
                                        {getFieldDecorator('amountrecord  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input maxLength="50" placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                           
                            </Row>
                            
                            </div>
                            {/* *************************** */}
                            {/* ************************new div section 2************* */}
                            <div>
                                <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                <FormItem label="Balance">
                                        {getFieldDecorator('balance  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input placeholder="balance" />
                                        )}
                                    </FormItem>
                                </Col>
                    
                                <Col xs={24} sm={24} md={24} lg={24}>
                                <FormItem label="Credit Record">
                                        {getFieldDecorator('creditrecord  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input  placeholder="Credit" />
                                        )}
                                    </FormItem>
                                </Col>
                           
                            </Row>
                            
                            </div>
                            {/* *************************************** */}

                            {/* ************************ */}
                            <div>
                                <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                <FormItem label="Currency">
                                        {getFieldDecorator('Currency  ', {
                                            rules: [{ required: true, message: 'Please input !' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <Input placeholder="Currency" />
                                        )}
                                    </FormItem>
                                </Col>
                                </Row>
                                </div>  
                            {/* ********************* */}
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.history.push('/dashboard/projectlist') }} >Cancel</Button>
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