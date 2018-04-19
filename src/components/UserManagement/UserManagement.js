import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Card, Checkbox, AutoComplete, Divider, Select } from 'antd';
import './UserManagement.css';
import '../ClientComponent/ClientComponent.css';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const FormItem = Form.Item;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            developerarray:[],
            developers:[],
            show: false //loading-bar

        }
    }

    componentDidMount() {
        console.log('component did mount')
        this.getDevelopersList();
        
    }
    //USER ROLE
    getDevelopersList = (role) => {
        this.props.findByRole('Developer').then(response => {
                console.log('Role', response)
              if (!response.error) {
                    this.setState({ developerarray: response.result });
    
                }
    
              console.log(this.state.developerarray);
            })
       
    }
     // RENDER DROPDOWN OF SEARCHED ITEM
     renderOption = (item) => {
        console.log(item);
        return (
            <Option key={item._id} value={item._id} text={item.name}>
                {item.name}
            </Option>
        );
    }

    handleSearch = (value) => {
        let developers;
        if (value) {
            console.log("Developers value");
            developers = this.state.developerarray.filter(d => {
                return d.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            });
            this.setState({ developers })
            console.log(this.state.developers)
            console.log(this.state.developers)

        }
        else {
            this.setState({ developers: [] })
        }
        // if (!value || value.indexOf('@') >= 0) {
        //     result = [];
        // } else {
        //     result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        // }
        // this.setState({ result });
    }
  
    // handleSelectChange = (value) => {
    //     console.log(value);
    //     this.props.form.setFieldsValue({
    //         note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    //     });
    // }

//sending user values
    handleSubmit = (e) => {
        this.setState({ show: true });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let data = {
                    name: values.name,
                    email: values.email,
                    phoneNumber: values.phone,
                    role: values.role,
                    password: values.password,
                    manager:values.managers
                }
                this.props.createUser(data).then(result => {
                    this.setState({ show: false });
                    console.log(result);
                    if (!result.error) {
                        this.props.opentoast('success', 'User Created  Successfully!');
                        this.props.history.push('/dashboard')
                    }
                }, err => {
                    this.setState({ show: false });
                })

            }
        });
    }

    render() {
        const { result } = this.state;
      
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="userManagement">
                
                <Card className="innercardContent" bordered={false}>
                    {/* --UserManagement-- */}
                    <div className="newCustomerform">
                    <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />
                        <h1 className="userManagementa">User Management</h1>
                        {/* <Divider dashed className="underLine" /> */}

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
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!'
                                            },
                                            { required: true, message: 'Please input your Email!' }],
                                        })(
                                            <Input placeholder="Email" name="email" maxLength="100" />
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
                                            <Input placeholder="Phone No." name="phoneNumber"
                                                maxLength="15" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' },
                                            ],
                                        })(
                                            <Input type="password" placeholder="Password" name="password" minLength="8"

                                            />
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
                                <FormItem label="Reporting Manager :">
                                        {getFieldDecorator('managers', {
                                            rules: [{ required: true, message: 'Please select project manager!' }],
                                        })(
                                    // <p className="expecteDateclient">Reporting Manager :</p>
                                 
                                    <AutoComplete
                                        className="clientHere"
                                        onSearch={this.handleSearch}
                                        placeholder="Choose Reporting Manager"
                                        dataSource={this.state.developers.map((item) => { return this.renderOption(item) })}
                                      
                                    >
                                      
                                    </AutoComplete>
                                      )}
                                      </FormItem>
                                </Col>
                            </Row>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.history.push('/dashboard') }}>Cancel</Button>
                            </div>
                        </FormItem>

                    </Form>

                    {/* --UserManagement-- */}
                </Card>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state
}
const WrappedUserManagement = Form.create()(UserManagement);
export default connect(mapStateToProps, actioncreators)(WrappedUserManagement);