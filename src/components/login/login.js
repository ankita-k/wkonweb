import React, { Component } from 'react';
import './login.css';
// import MainLayout from './layout.js';
import { Layout } from 'antd';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { config } from '../../config';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const { Header, Content, Footer } = Layout;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, //loading-bar
            x: '' //For ChECKBOX VALUE
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        var id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id');
        console.log('userId')
        if (id) {
            console.log(this.props)
            console.log('userId')
            this.props.history.push('/dashboard');
        }
    }

    handleSubmit = (e) => {
        console.log(`checked = ${e.target.checked}`);
        console.log(this.state.x)
        e.preventDefault()
        this.setState({ show: true });
        this.props.form.validateFields((err, values) => {
            if (!err) {

                // axios.get(config.apiUrl + 'user/login?username=' + values.email + '&password=' + values.password, conf)
                this.props.login(values.email, values.password).then((response) => {
                    console.log(response);
                    this.setState({ show: false });
                    if (response.error) {
                        this.props.opentoast('error', 'No Such User Exists!');
                        return;
                    }
                    if (response.result && response.result.lastLogin) {
                        if (this.state.x == true) {
                            console.log('local Storage')
                            localStorage.setItem('id', response.result._id);
                            this.props.history.push('/dashboard');
                        }
                        else {
                            console.log('session Storage')
                            sessionStorage.setItem('id', response.result._id);
                            this.props.history.push('/dashboard');
                        }
                    }
                    else if (response.result && !response.result.lastLogin) {
                        if (this.state.x == true) {
                            localStorage.setItem('id', response.result._id);
                            this.props.history.push('/dashboard');
                        }
                        else {
                            sessionStorage.setItem('id', response.result._id)
                            this.props.history.push('/passwordchange');
                        }
                    }

                }, err => {
                    this.setState({ show: false });
                });
            }
        });
    }
    // FOR CHECKBOX 
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ x: e.target.checked })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="loginmainForm">
                    <Loading
                        show={this.state.show}
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
                                                rules: [{ required: true, message: 'Please input your username!' }],
                                            })(
                                                <Input placeholder="Username" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'Please input your Password!' }],
                                            })(
                                                <Input type="password" placeholder="Password" />
                                            )}
                                        </FormItem>
                                        <FormItem className="text-left">
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: false,
                                            })(
                                                <Checkbox onChange={this.onChange}  >Remember me</Checkbox>
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
                                    <span>Welcome</span>
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


















        );
    }
}
const mapStateToProps = (state) => {
    return state
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
//export default WrappedNormalLoginForm;


export default connect(mapStateToProps, actioncreators)(WrappedNormalLoginForm);


// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         }
//     }

//     render() {
//         return (
//             <div className="App">
//                 <Layout className="layout">
//                     <Header>

//                     </Header>
//                     <Content style={{ padding: '0 50px' }}>
//                         <div style={{ background: '#ffffff', padding: '30px' }}>

//                             <Row type="flex" align="middle">
//                                 <Col span={16} offset={4}> <WrappedNormalLoginForm {...this.props}></WrappedNormalLoginForm></Col>
//                             </Row>
//                         </div>
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>
//                         WKON ©2016 Created by MeMe Information Technology
//                     </Footer>
//                 </Layout>
//             </div>
//         );
//     }
// }

// export default Login;
