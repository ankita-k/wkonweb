import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card, Select } from 'antd';
import './ClientComponent.css';
import { Divider } from 'antd';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;
class ClientComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countrylist: []
        }
    }


    componentWillMount() {
        // GET COUNTRY LIST

        console.log('component will mount')
        this.props.countrylist().then((data) => {
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let data = {
                    status: values.status,
                    country: values.country,
                    phoneNumber: values.phoneNumber,
                    email: values.email,
                    name: values.name,
                    userId: "5acc8400d1f70b1d7bf43a55",
                    domain: values.domain
                }
                this.props.createClient(data).then(result => {
                    console.log(result);
                    if (!result.error) {
                        this.props.history.push('/dashboard')
                    }
                }, err => {

                })

            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card className="innercardContent" bordered={false}>
                    {/* --new customer details-- */}
                    <div className="newCustomerform">
                        <h1 className="NewCustomer">New Customer</h1>
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
                                    <FormItem label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your Email!' }],
                                        })(
                                            <Input placeholder="Email" name="email" />
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
                                            <Input placeholder="Phone No." name="phoneNumber" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Name">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your Name!' }],
                                        })(
                                            <Input placeholder="Name" name="name" />
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
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
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
