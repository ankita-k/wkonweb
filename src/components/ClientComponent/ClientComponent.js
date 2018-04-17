import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Card, Select } from 'antd';
import './ClientComponent.css';
import { Divider } from 'antd';
import * as actioncreators from '../../redux/action';
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
            show: false  //loading-bar
        }
    }


    componentDidMount() {
        console.log(this.props);
        console.log(this.props.form)
        if (this.props.location.data) {
            this.props.form.setFieldsValue({
                ['name']: this.props.location.data.data.name,
                ['email']: this.props.location.data.data.email,
                ['phone']: this.props.location.data.data.phoneNumber,
                ['domain']: this.props.location.data.data.domain,
                ['country']: this.props.location.data.data.country,
                ['status']: this.props.location.data.data.status
            });
            console.log(this.props.form)
        }

        // GET COUNTRY LIST

        console.log('component will didmount')
        this.props.countrylist().then((data) => {
            // this.setState({ show: false });
            this.setState({ countrylist: data });
            console.log(this.state.countrylist)
        }, err => {

        })
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ show: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let data = {
                    status: values.status,
                    country: values.country,
                    phoneNumber: values.phone,
                    email: values.email,
                    name: values.name,
                    userId: sessionStorage.getItem('id'),
                    domain: values.domain
                }
                if (this.props.location.data) {
                    console.log('edshgj')
                    this.props.updateclient(data,this.props.location.data.data._id).then(data => {
                        console.log(data)
                        if (!data.error) {
                            this.props.opentoast('success', 'Client Updated Successfully!');
                            this.props.history.push('/dashboard/clientlist')
                        }
                    }, err => {

                    })
                }
                else {
                    this.props.createClient(data).then(result => {
                        this.setState({ show: false });
                        console.log(result);
                        if (!result.error) {
                            this.props.opentoast('success', 'Client Added Successfully!');
                            this.props.history.push('/dashboard/clientlist')
                        }
                    }, err => {
                        this.setState({ show: false });
                    })
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
                <Card className="innercardContent" bordered={false}>
                    {/* --new customer details-- */}
                    <div className="newCustomerform">
                        <h1 className="NewCustomer">New Client</h1>
                        <Divider dashed className="underLine" />
                        {/* <div className="headingLine">
                            <Row className="formcustomer">
                                <Col xs={24} sm={24} md={12} lg={24}>
                                <Row>
                                <Col xs={24} sm={24} md={6} lg={4} className="linea"></Col>
                                <Col xs={24} sm={24} md={6} lg={4} className="lineb"></Col>
                                <Col xs={24} sm={24} md={6} lg={4} className="lineb"></Col>
                                <Col xs={24} sm={24} md={6} lg={4} className="lineb"></Col>
                                </Row>
                                
                                </Col>
                            </Row>
                        </div> */}
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo">
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
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
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!'
                                            },
                                            { required: true, message: 'Please input your Email!' }],

                                        })(
                                            <Input
                                                maxLength="20"
                                                placeholder="Email" name="email" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Phone No.">
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: true, message: 'Please input your Phone No.!' }],
                                        })(
                                            <Input
                                                type="test"
                                                maxLength="15"
                                                placeholder="Phone No." name="phoneNumber" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Domain">
                                        {getFieldDecorator('domain', {
                                            rules: [{ required: true, message: 'Please input your Domain!' }],
                                        })(
                                            <Input placeholder="Domain" name="domain" />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Country">
                                        {getFieldDecorator('country', {
                                            rules: [{ required: true, message: 'Please select your Country!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Country"
                                                onChange={this.selectCountry}
                                                showSearch

                                            >
                                                {this.state.countrylist.map((item, index) => {
                                                    return <Option key={index} value={item.name}>{item.name}</Option>
                                                })}

                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
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
                            </Row>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button" >Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.history.push('/dashboard/clientlist') }}>Cancel</Button>
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
    return state
}

const WrappedClientComponent = Form.create()(ClientComponent);
export default connect(mapStateToProps, actioncreators)(WrappedClientComponent);
