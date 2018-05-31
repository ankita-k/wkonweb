import React, { Component } from 'react';
import './login.css';
// import MainLayout from './layout.js';
import { Layout } from 'antd';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { config } from '../../config';
import { connect } from "react-redux";
import * as loginAction from '../../redux/action';
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import loginlogo from '../../Images/wkonlogo.png';
const { Header, Content, Footer } = Layout;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
        var id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id');

        if (id) {
            this.props.history.push('/dashboard');
        }
    }



    // LOGIN FUNCTION
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let data = {
                    password: values.password,
                    email: values.email,
                    checkbox: values.remember
                }
                this.props.actions.login(data, this.props.history);
            }
        });
    }

    // VALIDATE PASSWORD LENGTH
    validatepassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && form.getFieldValue('password')) {
            if (value.length < 8)
                callback('Password length too short!');
            else {
                callback();
            }
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="loginmainForm">
                    <Loading
                        show={this.props.fullloader}
                        color="red"
                        showSpinner={false}
                    />
                    <div className="loginCard">
                        <Row type="flex">
                            <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 1 }}>
                                <div className="loginFormsec">
                                    <p className="loginHead"><b>Login</b></p>
                                    {/* <p className="loginSubhead">Don't have an account? <span><a>Create your account</a></span></p> */}
                                    <Form onSubmit={this.handleSubmit} className="login-form" >
                                        <FormItem>
                                            {getFieldDecorator('email', {
                                                rules: [{
                                                    type: 'email', message: 'The input is not valid E-mail!'
                                                },
                                                { required: true, message: 'Please input your username!' }],
                                            })(
                                                <Input placeholder="Username" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'Please input your Password!' },
                                                { validator: this.validatepassword }],
                                            })(
                                                <Input type="password" placeholder="Password" minLength="8" />
                                            )}
                                        </FormItem>
                                        <FormItem className="text-left">
                                            {getFieldDecorator('remember', {
                                                rules: [{ required: false }],
                                                valuePropName: 'checked',
                                                initialValue: false,
                                            })(
                                                <Checkbox>Remember me</Checkbox>
                                            )}
                                            {/* <a className="loginFormforgot" href="">Forgot password?</a> */}


                                        </FormItem>
                                        <FormItem >
                                            <div className="LoginBtn">
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    LOGIN
                   </Button>
                                            </div>
                                        </FormItem>
                                    </Form>

                                </div>
                            </Col>
                            <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 2 }} sm={0}>
                                <div className="imgsec" sm={0}>
                                    {/* <img src={triangleimg} alt="triangle" /> */}
                                    <span><img src={loginlogo} /></span>
                                    <Row>
                                        <Col span={24}>
                                            <p>We are what we repeatedly do.Excellence then,is not an act,but a habit.</p>
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


















        );
    }
}
const mapStateToProps = (state) => {
    console.log('login screen info', state)
    return state

}

function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(loginAction, dispatch)
    })
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
//export default WrappedNormalLoginForm;


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);


