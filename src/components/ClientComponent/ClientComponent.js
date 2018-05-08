import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Card, Select } from 'antd';
import './ClientComponent.css';
import { Divider } from 'antd';
import * as actioncreators from '../../redux/action';
import { bindActionCreators } from 'redux';
import * as ClientCreate from '../../redux/action';
import { connect } from "react-redux";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const FormItem = Form.Item;
const Option = Select.Option;

class ClientComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countrylist: [],
            show: false,  //loading-bar
            clientEdit: false,
        }
    }


    componentDidMount() {
        console.log(this.props);
        console.log(this.props.form)
        if (this.props.location.data) {
            this.setState({ clientEdit: true })
            this.props.form.setFieldsValue({
                ['name']: this.props.location.data.data.name,
                ['email']: this.props.location.data.data.email,
                ['phone']: this.props.location.data.data.phoneNumber,
                ['domain']: this.props.location.data.data.domain,
                ['country']: this.props.location.data.data.country,
                ['status']: this.props.location.data.data.status,
                ['currency']: this.props.location.data.data.currency,
                ['paypal_id']: this.props.location.data.data.paypal_id,
                ['company']: this.props.location.data.data.company1 ? this.props.location.data.data.company1 : '',
                ['address']: this.props.location.data.data.address1 ? this.props.location.data.data.address1 : ''

            });
            console.log(this.props.form)
        }

    }
    componentWillReceiveProps(props) {
        console.log("componentwillrecieveprops")

    }
    // TAKE INPUT FIELD VALUE
    inputValue = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log('onchangeinputfield', e.target.value, '+', e.target.name)
    }

    // STATUS INPUT
    selectStatus = (e) => {
        this.setState({ status: e });
        console.log(e)
    }

    //  COUNTRY SELECTED
    selectCountry = (e) => {
        this.setState({ country: e });
        console.log(e)
    }
    //Currency SELECTED
    selectCurrency = (e) => {
        this.setState({ currency: e });
        console.log(e)
    }


    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({ show: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)

                if (this.props.location.data) {
                    let data = {
                        status: values.status,
                        country: values.country,
                        phoneNumber: values.phone,
                        email: values.email,
                        name: values.name,
                        domain: values.domain,
                        currency: values.currency,
                        paypalId: values.paypal_id,
                        company: values.company,
                        address: values.address
                        // paypal_id:values.paypalId
                    }
                    this.props.actions.updateclient(data, this.props.location.data.data._id, sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'), this.props.history)
                }
                else {
                    let data = {
                        status: values.status,
                        country: values.country,
                        phoneNumber: values.phone,
                        email: values.email,
                        name: values.name,
                        userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
                        domain: values.domain,
                        currency: values.currency,
                        paypalId: values.paypal_id,
                        company: values.company,
                        address: values.address
                    }
                    this.props.actions.createClient(data, this.props.history)
                }


            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />
                <div>
                    {/* <h1 className="NewCustomer">New Client</h1> */}
                    {(this.state.clientEdit == true) ?
                        <h1 className="NewCustomer">Edit Client</h1> : <h1 className="NewCustomer">New Client</h1>
                    }
                </div>
                <Card className="innercardContent" bordered={false}>
                    {/* --new customer details-- */}

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo">
                            <Row>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Name">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your Name!' }],
                                        })(
                                            <Input
                                                maxLength="15"
                                                placeholder="Name" name="name" />
                                        )}
                                    </FormItem>
                                </Col>
                                {/* </Row>
                            <Row> */}
                                <Col md={2} lg={2}></Col>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!'
                                            },
                                            { required: true, message: 'Please input your Email!' }],

                                        })(
                                            <Input
                                                maxLength="200"
                                                placeholder="Email" name="email" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Address">
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, message: 'Please input your Address!' }],
                                        })(
                                            <Input
            
                                                placeholder="Address" name="address" maxLength="100"/>
                                        )}
                                    </FormItem>
                                </Col>
                                {/* </Row>
                            <Row> */}
                                <Col md={2} lg={2}></Col>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Company">
                                        {getFieldDecorator('company', {
                                            rules: [{ required: true, message: 'Please input your Company!' }],
                                        })(
                                            <Input
                                        
                                                placeholder="Company" name="company" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="paypal_id">
                                        {getFieldDecorator('paypal_id', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid paypal id!'
                                            },
                                            { required: true, message: 'Please input your Paypal id!' }],

                                        })(
                                            <Input
                    
                                                placeholder="paypal_id" name="paypal_id" />
                                        )}
                                    </FormItem>
                                </Col>
                                {/* </Row>
                            <Row> */}
                                <Col md={2} lg={2}></Col>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Country">
                                        {getFieldDecorator('country', {
                                            rules: [{ required: true, message: 'Please select your Country!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Country"
                                                onChange={this.selectCountry}
                                                name="country"
                                                showSearch
                                            >
                                                {this.props.countrylists.map((item, index) => {
                                                    return (<Option key={index} value={item.name}>{item.name}</Option>)
                                                })}

                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Phone No.">
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: 'Please input your Phone No.!' }],
                                        })(
                                            <Input
                                                type="test"
                                                maxLength="15"
                                                placeholder="Phone No." name="phoneNumber" minlength="8" maxlength="15"/>
                                        )}
                                    </FormItem>
                                </Col>
                                {/* </Row>

                            <Row> */}
                                <Col md={2} lg={2}></Col>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Domain">
                                        {getFieldDecorator('domain', {
                                            rules: [{ required: true, message: 'Please input your Domain!' }],
                                        })(
                                            <Input placeholder="Domain" name="domain" maxlength="50"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Status">
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Status"
                                                onChange={this.selectStatus}
                                                showSearch

                                            >
                                                <Option value="Interested">Interested</Option>
                                                <Option value="Pipeline">Pipeline</Option>
                                                <Option value="Committed">Committed</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                {/* </Row>
                            <Row> */}
                                <Col md={2} lg={2}></Col>
                                <Col xs={24} sm={24} md={11} lg={11}>
                                    <FormItem label="Currency">
                                        {getFieldDecorator('currency', {
                                            rules: [{ required: true, message: 'Please select your Currency!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Currency"
                                                onChange={this.selectCurrency}
                                                showSearch

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
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                {/* loading={this.state.showLoader} */}
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.actions.menuKeys('client_list');this.props.history.push('/dashboard/clientlist') }}>Cancel</Button>
                            </div>
                        </FormItem>

                    </Form>

                    {/* --new customer details-- */}
                </Card>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(ClientCreate, dispatch)
    })
}

const WrappedClientComponent = Form.create()(ClientComponent);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedClientComponent);
