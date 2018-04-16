import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Card, Checkbox, AutoComplete, Divider, Select } from 'antd';
import './UserManagement.css';
import '../ClientComponent/ClientComponent.css';
const FormItem = Form.Item;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;
class UserManagement extends Component {
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
      handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
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
        return (
            <div className="userManagement">
                <Card className="innercardContent" bordered={false}>
                    {/* --UserManagement-- */}
                    <div className="newCustomerform">
                        <h1 className="userManagementa">User Management</h1>
                        <Divider dashed className="underLine" />

                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo">
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
                                    <FormItem label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input type="password" placeholder="Password" name="password" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Roles">
                                        {getFieldDecorator('role', {
                                            rules: [{ required: true, message: 'Please select your role!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Choose Role"
                                                onChange={this.selectStatus}
                                            >
                                                <Option value="Sales">Sales</Option>
                                                <Option value="Developer">Developer</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <p className="expecteDateclient">Reporting Manager :</p>
                                    <AutoComplete
                                   className="clientHere"
                                        onSearch={this.handleSearch}
                                        placeholder="Choose Reporting Manager"
                                    >
                                        {children}
                                    </AutoComplete>
                                    </Col>
                            </Row>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button htmlType="submit" className="cardbuttonCancel login-form-button">Cancel</Button>
                            </div>
                        </FormItem>

                    </Form>

                    {/* --UserManagement-- */}
                </Card>
            </div>
        );
    }
}
const WrappedUserManagement = Form.create()(UserManagement);
export default WrappedUserManagement;
