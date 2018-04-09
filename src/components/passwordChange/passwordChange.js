
import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Checkbox, Radio } from 'antd';
import axios from 'axios';
import '../login/login.css';
import './passwordChange.css';
import { config } from '../../config';

const FormItem = Form.Item;

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let conf = config.headers;
                let data = {
                    id: sessionStorage.getItem('id'),
                    password: values.oldPassword,
                    newPassword: values.password

                }
                axios.put(config.apiUrl + 'user/resetPassword', data, conf)
                    .then((response) => {
                        if (response.data & response.data._id) {
                            this.props.history.push('/dashboard');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("An error occurred");
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                {/* <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Old Password">
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: 'Please input your old Password!' }],
                        })(
                            <Input type="password" placeholder="Old Password" />)}
                    </FormItem>
                    <FormItem label="New Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }, {
                                validator: this.validateToNextPassword,
                              }],
                        })(
                            <Input type="password" placeholder="New Password" />
                        )}
                    </FormItem>
                    <FormItem label="Confirm New Password">
                        {getFieldDecorator('confirm', {
                            rules: [{ required: true, message: 'Please confirm your new Password!' },{
                                validator: this.compareToFirstPassword,
                              }],
                        })(
                            <Input type="password" placeholder="Confirm New Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form> */}
                <div className="login">
                    <div className="loginmainForm">
                        <div className="loginCard">
                            <Row type="flex">
                                <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 1 }}>
                                    <div className="loginFormsec">
                                        <p className="loginHead"><b>Reset Password</b></p>
                                        <p className="loginSubhead">What would you like your new password to be? 
                                        {/* <span><a>Create your account</a></span> */}
                                        </p>
                                        <Form onSubmit={this.handleSubmit} className="login-form" >
                                            <FormItem >
                                                {getFieldDecorator('oldPassword', {
                                                    rules: [{ required: true, message: 'Please input your old Password!' }],
                                                })(
                                                    <Input type="password" placeholder="Old Password" />)}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: 'Please input your Password!' }, {
                                                        validator: this.validateToNextPassword,
                                                    }],
                                                })(
                                                    <Input type="password" placeholder="New Password" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('confirm', {
                                                    rules: [{ required: true, message: 'Please confirm your new Password!' }, {
                                                        validator: this.compareToFirstPassword,
                                                    }],
                                                })(
                                                    <Input type="password" placeholder="Confirm New Password" />
                                                )}
                                            </FormItem>
                                            {/* <FormItem className="text-left">
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>Remember me</Checkbox>
                                                )}
                                                <a className="loginFormforgot" href="">Forgot password?</a>


                                            </FormItem> */}
                                            <FormItem >
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    SUBMIT
                   </Button>
                                            </FormItem>
                                        </Form>

                                    </div>
                                </Col>
                                <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 2 }}>
                                    <div className="imgsec borderBottom">
                                        {/* <img src={triangleimg} alt="triangle" /> */}
                                        <span>Welcome<br></br> Back.</span>
                                        <Row>
                                            <Col span={24}>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        {/* <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
            </Button>
                </FormItem>
            </Form> */}
                    </div>
                </div>
            </div>
        );
    }
}

const ChangePassword = Form.create()(ChangePasswordForm);


export default ChangePassword;