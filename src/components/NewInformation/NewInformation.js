import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card, Select } from 'antd';
import './NewInformation.css';
import { Divider } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class NewInformation extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                                            <Input placeholder="Email" />
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
                                            <Input placeholder="Phone No." />
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
                                            <Input placeholder="Name" />
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
                                            <Input placeholder="Domain" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Country">
                                        {getFieldDecorator('country', {
                                            rules: [{ required: true, message: 'Please input your Country!' }],
                                        })(
                                            <Input placeholder="Country" />
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
                                                onChange={this.handleSelectChange}
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
const WrappedNewInformation = Form.create()(NewInformation);
export default WrappedNewInformation;
