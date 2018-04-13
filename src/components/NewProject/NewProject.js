import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Card, Select, AutoComplete, DatePicker } from 'antd';
import '../ClientComponent/ClientComponent.css';
import './NewProject.css';
import { Divider } from 'antd';
const Option1 = AutoComplete.Option1;
const FormItem = Form.Item;
const Option = Select.Option;
class NewProject extends Component {
    state = {
        result: [],
      }
    
      handleSearch = (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
          result = [];
        } else {
          result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { result } = this.state;
        const children = result.map((email) => {
          return <Option key={email}>{email}</Option>;
        });
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
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
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

                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate">Expected Start Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('date-picker', config)(
                                                    <p><DatePicker /></p>
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate">Actual Start Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('date-picker', config)(
                                                    <p><DatePicker /></p>
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate4">Expected End Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('date-picker', config)(
                                                    <p><DatePicker /></p>
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate4">Actual End Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('date-picker', config)(
                                                    <p><DatePicker /></p>
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                    <p className="expecteDateclient">Choose Client :</p>
                                    <AutoComplete
                                   className="clientHere"
                                        onSearch={this.handleSearch}
                                        placeholder="Choose Client"
                                    >
                                        {children}
                                    </AutoComplete>
                                    </Col>
                                </Row>
                            </div>
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
