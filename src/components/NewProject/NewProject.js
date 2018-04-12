import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card, Select } from 'antd';
import '../ClientComponent/ClientComponent.css';
import './NewProject.css';
import { Divider } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class NewProject extends Component {
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
                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}
                    <div className="newCustomerform">
                        <h1 className="NewCustomer">New Project</h1>
                        <Divider dashed className="underLine" />
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo informationProject">
                        <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Name">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your Name!' }],
                                        })(
                                            <Input placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                <FormItem label="Brief Requirement">
                                        {getFieldDecorator('requirement', {
                                            rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                        })(
                                            <Input placeholder="Brief Requirement" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
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
                                <Col xs={24} sm={24} md={24} lg={12}>
                                <FormItem label="Technology">
                                        {getFieldDecorator('technology', {
                                            rules: [{ required: true, message: 'Please input your Technology!' }],
                                        })(
                                            <Input placeholder="Technology" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
    
                
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Expected Start Date">
                                        {getFieldDecorator('start', {
                                            rules: [{ required: true, message: 'Please input your Start date!' }],
                                        })(
                                            <Input placeholder="Expected Start Date" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Actual Start Date">
                                        {getFieldDecorator('actualt', {
                                            rules: [{ required: true, message: 'Please input your start date!' }],
                                        })(
                                            <Input placeholder="Actual Start Date" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Expected End Date">
                                        {getFieldDecorator('actuale', {
                                            rules: [{ required: true, message: 'Please input your expected date!' }],
                                        })(
                                            <Input placeholder="Expected End Date" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Actual End Date">
                                        {getFieldDecorator('actualn', {
                                            rules: [{ required: true, message: 'Please input your field!' }],
                                        })(
                                            <Input placeholder="Actual End Date" />
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

                    {/* --NewProject details-- */}
                </Card>

            </div>
        );
    }
}
const WrappedNewProject = Form.create()(NewProject);
export default WrappedNewProject;
