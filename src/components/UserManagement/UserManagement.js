import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Spin, Card, Checkbox, AutoComplete, Divider, Select } from 'antd';
import './UserManagement.css';
import '../ClientComponent/ClientComponent.css';
import * as actioncreators from '../../redux/action';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Loading from 'react-loading-bar';
import { Loader } from 'react-overlay-loader';
import 'react-loading-bar/dist/index.css'

const FormItem = Form.Item;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;
var NumberFormat = require('react-number-format');

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            developerarray: [],
            developers: [],
            show: false, //loading-bar
            userEdit: false,
            tagArray: ['Vertical Lead', 'Manager'],
            tag: ['Vertical Lead', 'Manager'],
            tagValue: [],
            value: [],
            fetching: false,
            RoleDeveloper: "",
            disabletag: true,


        }
    }


    componentDidMount() {
        console.log('component did mount', this.props)
        console.log(this.props.location.userData)
        if (this.props.location.userData) {
            this.setState({ userEdit: true })
            if (this.props.location.userData.role == "Developer") {
                // this.setState({ RoleDeveloper:this.props.location.userData.role })

                this.setState({ disabletag: false })
            }



            else {
                // this.setState({RoleDeveloper:''})

                this.setState({ disabledtag: true })

            }
            this.props.form.setFieldsValue({
                ['name']: this.props.location.userData.name,
                ['email']: this.props.location.userData.email,
                ['phone']: this.props.location.userData.phoneNumber,
                ['password']: this.props.location.userData.password,
                ['role']: this.props.location.userData.role,
                ['managers']: this.props.location.userData.manager ? this.props.location.userData.manager._id : '',
                ['tags']: this.props.location.userData.tags
            });
            console.log(this.props.form)

        }
        this.commonFunction();

    }

    componentWillReceiveProps() {
        this.commonFunction();
    }

    // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
    commonFunction() {
        /*
        * FETCH DEVELOPER LIST FROM REDUCER
        */
        if (this.props.developerlist.length > 0) {
            this.setState({ developerarray: (this.props.developerlist) });
        }

        /*HIDE FULL LOADER */
        //  if (this.props.fullloader) {
        //     this.setState({ show: newprops.fullloader })
        // }
        /*HIDE FULL LOADER ENDS */
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

    //Searching tag
    searchTag = (value) => {

        console.log('fetching tag', value);
        this.setState({ tagArray: [], fetching: true });

        let tagArray;

        this.setState({ data: [], fetching: true });
        tagArray = this.state.tag.filter(d => {

            return d.toLowerCase().indexOf(value.toLowerCase()) > -1
        });
        this.setState({ tagArray, fetching: false });

    }
    //Selecting Tag
    handleChange = (value) => {

        if (value.length > 0) {
            this.setState({ tagValue: value })
            this.setState({
                // techsValue: [],
                fetching: false,
            });
            console.log(this.state.tagValue)
            this.setState({ tagArray: this.state.tag })
        }

    }
    //selectStatus function
    selectStatus = (value) => {
        console.log(value);
        if (value == "Developer") {
            this.setState({ RoleDeveloper: value })
            this.setState({ disabletag: false })

            console.log(this.state.RoleDeveloper);
        }
        else {
            this.setState({ RoleDeveloper: '' })
            this.setState({ disabletag: true })
            this.props.form.setFieldsValue({
                ['tags']: []
            });
            console.log(this.props.form)

            // this.setState({RoleSales:value})
            // console.log(this.state.RoleSales);

        }

        // this.setState({ disabletag: false })


    }

    //sending user values
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ show: true });
                console.log(values)
                if (this.props.location.userData) {
                    let user = {
                        password: values.password,
                        role: values.role,
                        phoneNumber: values.phone,
                        email: values.email,
                        name: values.name,
                        manager: values.managers,
                        tags: values.tags.length != 0 ? values.tags : []
                    }
                    // if(values.tags.length!=0 )
                    // {
                    //    user.tags=values.tags  
                    // }
                    console.log(user)
                    this.props.actions.editUser(user, this.props.location.userData._id, this.props.history)
                    //     this.setState({ showLoader: false });
                    //     this.setState({ show: false });
                    //     console.log(response);
                    //     if (!response.error) {
                    //         this.props.opentoast('success', 'User Updated Successfully!');
                    //         this.props.history.push('/dashboard/Userlist')
                    //     }
                    //     else {
                    //         this.props.opentoast('success', response.message);
                    //     }
                    // },
                    //     err => {
                    //         this.setState({ show: false });
                    //         this.setState({ showLoader: false });
                    //         this.props.opentoast('warning', 'User Not Updated Successfully!');
                    //     })
                }
                else {
                    let data = {
                        name: values.name,
                        email: values.email,
                        phoneNumber: values.phone,
                        role: values.role,
                        password: values.password,
                        manager: values.managers,
                        tags: values.tags.length != 0 ? values.tags : []
                    }

                    this.props.actions.createUser(data, this.props.history)
                    // .then(result => {
                    //     this.setState({ showLoader: false });
                    //     this.setState({ show: false });
                    //     console.log(result);
                    //     if (!result.error) {
                    //         this.props.opentoast('success', 'User Created  Successfully!');
                    //         this.props.history.push('/dashboard/Userlist')
                    //     }
                    //     else {
                    //         this.props.opentoast('warning', result.message);
                    //     }
                    // }, err => {
                    //     this.setState({ show: false });
                    //     this.setState({ showLoader: false });
                    //     this.props.opentoast('warning', 'UserNot  Created  Successfully!');
                    // })
                }

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
        const { result } = this.state;

        const { getFieldDecorator } = this.props.form;
        const { fetching, tagArray, value } = this.state;
        return (
            <div className="userManagement">

                <Card className="innercardContent" bordered={false}>
                    {/* --UserManagement-- */}
                    <div className="newCustomerform">
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
                                            <Input placeholder="Name" name="name" maxlength="40" />
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
                                            <NumberFormat format="################" placeholder="Phone No." name="phoneNumber"
                                                />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' },
                                            {validator: this.validatepassword }],
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
                                            <Select className="statuspipeline "

                                                // visibility="hidden;"
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
                                            rules: [{ required: false, message: 'Please select project manager!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Choose Role"
                                                // onChange={this.selectStatus}
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
                            {/* {this.state.RoleDeveloper == "Developer" ? */}
                            <Row>

                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem className="tag" label="Tag">
                                        {getFieldDecorator('tags', {
                                            rules: [{ required: false, message: 'please select the  tag !' }],
                                        })(
                                            <Select
                                                mode="multiple"

                                                placeholder="Select Tag"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                disabled={this.state.disabletag}
                                                onSearch={this.searchTag}
                                                onChange={this.handleChange}
                                                style={{ width: '100%' }}
                                            // value={value}

                                            >
                                                {/* {tagArray.map(d => */}
                                                <Option value="VerticalLead">Vertical Lead</Option>
                                                <Option value="Manager">Manager</Option>
                                                {/* )} */}

                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            {/* : ""} */}

                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button" >Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.actions.menuKeys('user_list'); this.props.history.push('/dashboard/Userlist') }}>Cancel</Button>
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

function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(actioncreators, dispatch)
    })
}
const WrappedUserManagement = Form.create()(UserManagement);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserManagement);