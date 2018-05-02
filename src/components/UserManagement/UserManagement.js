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
            developerarray: [],
            developers: [],
            show: false, //loading-bar
            userEdit: false

        }
    }

    componentDidMount() {
        console.log('component did mount')
        this.getDevelopersList();
        console.log(this.props.location.userData)
        if (this.props.location.userData) {
            this.setState({ userEdit: true })
            this.props.form.setFieldsValue({
                ['name']: this.props.location.userData.name,
                ['email']: this.props.location.userData.email,
                ['phone']: this.props.location.userData.phoneNumber,
                ['password']: this.props.location.userData.password,
                ['role']: this.props.location.userData.role,
                ['managers']: this.props.location.userData.manager ? this.props.location.userData.manager._id : ''
            });
            console.log(this.props.form)

        }
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
                if (this.props.location.userData) {
                    let user = {
                        password: values.password,
                        role: values.role,
                        phoneNumber: values.phone,
                        email: values.email,
                        name: values.name,
                        manager: values.managers
                    }
                    console.log(user)
                    this.props.editUser(user, this.props.location.userData._id).then(response => {
                        this.setState({ show: false });
                        console.log(response);
                        if (!response.error) {
                            this.props.opentoast('success', 'User Updated Successfully!');
                            this.props.history.push('/dashboard/Userlist')
                        }
                        else {
                            this.props.opentoast('success', response.message);
                        }
                    },
                        err => {
                            this.setState({ show: false });
                            this.props.opentoast('warning', 'User Not Updated Successfully!');
                        })
                }
                else {
                    let data = {
                        name: values.name,
                        email: values.email,
                        phoneNumber: values.phone,
                        role: values.role,
                        password: values.password,
                        manager: values.managers
                    }
                    this.props.createUser(data).then(result => {
                        this.setState({ show: false });
                        console.log(result);
                        if (!result.error) {
                            this.props.opentoast('success', 'User Created  Successfully!');
                            this.props.history.push('/dashboard/Userlist')
                        }
                        else{
                            this.props.opentoast('warning', result.message);
                        }
                    }, err => {
                        this.setState({ show: false });
                        this.props.opentoast('warning', 'UserNot  Created  Successfully!');
                    })
                }

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
                        {(this.state.userEdit == true) ?
                            <h1 className="userManagementa">Edit User</h1> : <h1 className="userManagementa">Create User</h1>
                        }
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
                                    <FormItem label="Reporting Manager:">
                                        {getFieldDecorator('managers', {
                                            rules: [{ required: true, message: 'Please select project manager!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Choose Role"
                                                onChange={this.selectStatus}
                                                showSearch
                                            >
                                                {this.state.developerarray.map((item, index) => {
                                                    return <Option key={index} value={item._id}>{item.name}</Option>
                                                })}
                                            </Select>
                                            // <p className="expecteDateclient">Reporting Manager :</p>

                                            // <AutoComplete
                                            //     className="clientHere"
                                            //     onSearch={this.handleSearch}
                                            //     placeholder="Choose Reporting Manager"
                                            //     dataSource={this.state.developers.map((item) => { return this.renderOption(item) })}

                                            // >

                                            // </AutoComplete>
                                        )}

                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.history.push('/dashboard/Userlist') }}>Cancel</Button>
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