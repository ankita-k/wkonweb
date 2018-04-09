import React, { Component } from 'react';
import './login.css';
// import MainLayout from './layout.js';
import { Layout } from 'antd';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { config } from '../../config';
const { Header, Content, Footer } = Layout;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let conf = config.headers;
                axios.get(config.apiUrl + 'user/login?username=' + values.email + '&password=' + values.password, conf)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.error) {
                            alert('No such user');
                            return;
                        }
                        if (response.data && response.data.lastLogin) {
                            sessionStorage.setItem('id', response.data._id)
                            this.props.history.push('/dashboard');
                        }
                        else if (response.data && !response.data.lastLogin) {
                            sessionStorage.setItem('id', response.data._id)
                            this.props.history.push('/passwordchange');
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        alert("some error occured");
                    });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
            <div className="loginmainForm">
            <div className="loginCard">
        <Row type="flex">
          <Col  md={{ span: 12, order:1 }} xs={{ span: 24, order:1 }}>
                <div className="loginFormsec">
                    <p className="loginHead"><b>Login</b></p>
                    <p className="loginSubhead">Don't have an account? <span><a>Create your account</a></span></p>
                    <Form onSubmit={this.handleSubmit} className="login-form" >
                        <FormItem>
                            {getFieldDecorator('userName', {
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
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                                )}
                            <a className="loginFormforgot" href="">Forgot password?</a>


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
            <Col  md={{ span: 12, order:2 }} xs={{ span: 24, order:2 }} sm={0}>
                <div className="imgsec" sm={0}>
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


















        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;


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
