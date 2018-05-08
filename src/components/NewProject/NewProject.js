import React, { Component } from 'react';
import { Form, Icon, Input, Table, Modal, Button, Row, Spin, Col, Card, Select, DatePicker, AutoComplete } from 'antd';
import '../ClientComponent/ClientComponent.css';
import './NewProject.css';
import { Divider } from 'antd';
import moment from 'moment'
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Loading from 'react-loading-bar';

import 'react-loading-bar/dist/index.css';
import debounce from 'lodash/debounce';
const columns = [{
    title: 'Assign To',
    dataIndex: 'name',
    width: 200,
}, {
    title: 'Role',
    dataIndex: 'role',
}];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Priyanka ${i}`,
        role: `Wkonweb ${i}`,
    });
}

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;
class NewProject extends Component {

    state = {
        modal1Visible: false,
        modal2Visible: false,
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
        console.log(this.state.assignRole)
    }
    constructor(props) {
        // console.log(props);
        super(props);
        this.state = {
            clientlist: [],
            clientarray: [],
            show: false,//loading-bar,
            disabledate: true,
            disableclient: false,
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            techArray: ['ReactJS', 'Php', 'ReactNative','IOT'],
            techs: ['ReactJS', 'Php', 'ReactNative','IOT'],
            techsValue: [],
            value: [],
            fetching: false,
            verticalHeadrarray: [],
            verticalHead: '',
            editClient: false,
            projectId: '',
            role: '',
            assign: '',
            assignRole: [],
            memeberId: '',
            disabletag: true,
            disableassign: false,
            addMember:[],
            columns : [{
                title: 'Assign To',
                dataIndex: 'name',
                width: 200,
            }, {
                title: 'Role',
                dataIndex: 'role',
            }]
        }
       

    }

    componentDidMount() {
        if (this.props.location.data) {
            this.setState({ disabledate: false })
            this.setState({ disableclient: true })
            this.setState({ editClient: true })

            console.log('members', this.props.location.data.data.members);

            // this.setState({ assignRole: this.props.location.data.data.members })
            // console.log(this.state.assignRole)

            console.log("projectId", this.props.location.data.data._id)
            this.setState({ projectId: this.props.location.data.data._id })
            console.log(this.state.projectId)

            // For Status Checking
            if (this.props.location.data.data.status == "InProgress" || this.props.location.data.data.status == "InProgess") {
                this.setState((prevState) => {
                    return { verticalHead: 'InProgress' }
                });
                this.setState({ verticalHeadrarray: [] });
            }
            else {
                this.setState({ verticalHeadrarray: [] });
                this.setState((prevState) => {
                    return { verticalHead: '' }
                });
            }

            // for filter role,name,userId from members
            if (this.props.location.data.data.members != []) {
                let newarray1 = this.props.location.data.data.members.map(function (item, index) {
                    return {
                        userId: item.userId._id,
                        name: item.userId.name,
                        role: item.role
                    }
                })
                console.log(newarray1)
                this.setState({addMember:newarray1})
                // FOR SEARCH ROLE ==VerticalLead

                let index = newarray1.findIndex(x => x.role === "VerticalLead");
                console.log(index);
                console.log(newarray1[index]);
                if (index > -1) {
                    this.setState({ disableassign: true })                    
                }
                
            }
            this.props.form.setFieldsValue({
                ['name']: this.props.location.data.data.name1,
                ['textRequirement']: this.props.location.data.data.requirement1,
                ['technology']: this.props.location.data.data.technology1,
                ['expecstart']: this.props.location.data.data.expectedStartDate ? moment(this.props.location.data.data.expectedStartDate) : '',
                ['expecend']: this.props.location.data.data.expectedEndDate ? moment(this.props.location.data.data.expectedEndDate) : '',
                ['actualstart']: this.props.location.data.data.actualStartDate ? moment(this.props.location.data.data.actualStartDate) : '',
                ['actualend']: this.props.location.data.data.actualEndDate ? moment(this.props.location.data.data.actualEndDate) : '',
                ['status']: this.props.location.data.data.status,
                ['client']: this.props.location.data.data.client ? this.props.location.data.data.client.name : ''
            })

        }
        /** GET CLIENT LIST FROM PROPS*/
        if (this.props.clientList) {
            this.setState({ clientlist: this.props.clientList });
        }
        /** GET CLIENT LIST FROM PROPS*/

        //LOGGEDIN USER DETAILS
        if (this.props.loggeduserDetails) {
            console.log(this.props.loggeduserDetails.role)
            this.setState({ loggedInRole: this.props.loggeduserDetails.role })
        }

        /** GET VERTICAL LEADS LIST*/
        if (this.props.listByTags) {
            this.setState({ verticalHeadrarray: this.props.listByTags });
        }
        /** GET VERTICAL LEADS LIST ENDS*/
    }

    // ADD PROJECT FUNCTION 
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ show: true });
                console.log('Received values of form: ', values);

                if (this.props.location.data) {
                    console.log('edit function')
                    let data = {
                        requirement: values.textRequirement,
                        status: values.status,
                        technology: (values.technology).toString(),
                        name: values.name,
                        client: this.props.location.data.data.client._id,
                    }
                    if (values.expecstart) {
                        data.expectedStartDate = values.expecstart._d
                    }
                    if (values.expecend) {
                        data.expectedEndDate = values.expecend._d
                    }
                    if (values.actualstart) {
                        data.actualStartDate = values.actualstart._d
                    }
                    if (values.actualend) {
                        data.actualEndDate = values.actualend._d
                    }
                    console.log(data)

                    this.props.actions.editproject(data,this.state.userId, this.props.location.data.data._id,this.props.history)
                }
                else {

                    let data = {
                        requirement: values.textRequirement,
                        status: values.status,
                        technology: (values.technology).toString(),
                        name: values.name,
                        userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
                        client: values.client,

                    }
                    if (values.actualstart) {
                        data.actualStartDate = values.actualstart._d
                    }
                    if (values.expecstart) {
                        data.expectedStartDate = values.expecstart._d
                    }
                    if (values.expecend) {
                        data.expectedEndDate = values.expecend._d
                    }

                    console.log(data)
                    this.props.actions.addProject(data,this.props.history)
                }

            }
        });
    }

    componentWillReceiveProps(props) {

    }

    // VALIADTE EXPECTED START DATE AND END DATE
    validatetoexpecstart = (rule, value, callback) => {
        const form = this.props.form;
        if (value && form.getFieldValue('expecstart')) {
            if (moment(value).isBefore(form.getFieldValue('expecstart')))
                callback('End date cannot be before Start date!');
            else {
                callback();

            }
        } else {
            callback();
        }
    }

    // VALIADTE EXPECTED START DATE AND END DATE
    validatetoexpecend = (rule, value, callback) => {
        const form = this.props.form;

        if (value && form.getFieldValue('expecend')) {
            if (moment(value).isAfter(form.getFieldValue('expecend')))
                callback('Start cannot be after end date!');
            else {
                callback();
            }
        } else {
            callback();
        }
    }

    // VALIADTE ACTUAL START DATE AND END DATE
    validatetoactualstart = (rule, value, callback) => {

        const form = this.props.form;
        if (value && form.getFieldValue('actualstart')) {
            if (moment(value).isBefore(form.getFieldValue('actualstart')))
                callback('End date cannot be before Start date!');
            else {
                callback();
            }
        } else {
            callback();
        }
    }

    // VALIADTE ACTUAL START DATE AND END DATE
    validatetoactualend = (rule, value, callback) => {
        const form = this.props.form;

        if (value && form.getFieldValue('actualend')) {
            if (moment(value).isAfter(form.getFieldValue('actualend')))
                callback('Start cannot be after end date!');
            else {
                callback();
            }
        } else {
            callback();
        }
    }

    // SEARCH FROM CLIENT ARRAY
    handleSearch = (value) => {
        let clientarray;
        if (value) {
            console.log("Inside value");
            clientarray = this.state.clientlist.filter(d => {

                return d.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            });

            console.log(clientarray)

            if (clientarray.length != 0) {
                this.setState({ clientarray })
            }
            else {
                let data = {
                    name: "No Result Found",
                    _id: "1111"
                }
                clientarray.push(data)
                this.setState({ clientarray })
            }




        }
        else {
            this.setState({ clientarray: [] })
        }



    }

    // RENDER DROPDOWN OF SEARCHED ITEM
    renderOption = (item) => {
        // console.log(item);
        return (
            <Option key={item._id} value={item._id} text={item.name}>
                {item.name}
            </Option>
        );
    }

    // SEARCH TECHNOLOGY FROM DROPDOWN
    searchTechnology = (value) => {

        console.log('fetching user', value);
        this.setState({ techArray: [], fetching: true });

        let techArray;

        this.setState({ data: [], fetching: true });
        techArray = this.state.techs.filter(d => {

            return d.toLowerCase().indexOf(value.toLowerCase()) > -1
        });
        this.setState({ techArray, fetching: false });

    }

    // SELECTED TECHNOLOGY VALUE
    handleChange = (value) => {

        if (value.length > 0) {
            this.setState({ techsValue: value })
            this.setState({
                // techsValue: [],
                fetching: false,
            });
            console.log(this.state.techsValue)
            this.setState({ techArray: this.state.techs })
        }

    }
    //FOR STATUS VALUE
    handleSelectChange = (value) => {
        console.log(value);
        if (value == 'InProgress') {
            this.setState({ verticalHead: value })
        }
        else {
            this.setState({ verticalHead: '' })
        }

    }

    // GET ROLE FOE PROJECT
    roleValue = (value) => {
        console.log('role', value)
        this.setState({ role: value })
        // console.log(this.state.role)
    }
    //GET ASSIGN VALUR FOR PROJECT
    assignValue = (value) => {
        console.log('assign', value)
        this.setState({ memeberId: value })
        let newarray = this.state.verticalHeadrarray.filter(item => {
            return (item._id.toLowerCase().indexOf(value.toLowerCase()) > -1)
        });
        this.setState({ assign: newarray[0].name })
    }

    // CLICK ON PLUS ICON FOR ADDING MEMBER
    addMember = () => {
        let data = {
            userId: this.state.memeberId,
            role: this.props.loggeduserDetails.role == 'Sales' ? 'VerticalLead' : this.state.role,
            name: this.state.assign
        }
        this.state.assignRole.push(data)
        this.state.addMember.push(data)  // FOR DISPAY MEMBER NAME
        console.log(this.state.assignRole)
        this.props.form.setFieldsValue({    //for clear the field
            ['assign']: '',
            ['role']: '',
        })
        this.props.actions.addMember(this.state.assignRole, this.state.projectId)

    }
    render() {
        const columns = this.state.columns;
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
            // required:false
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }, {
                validator: this.datevalidate
            }]
        };
        const { fetching, techArray, value } = this.state;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />
                <div className="">

                    {(this.state.editClient == true) ?
                        <h1 className="NewCustomer">Edit Project</h1> : <h1 className="NewCustomer">New Project</h1>
                    }
                    {/* {(this.state.editClient == true) ?
                           
                        } */}

                    {/* <Divider dashed className="underLine" /> */}
                </div>
                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo informationProject">
                            <div className="spaceLess">
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <p className="expecteDateclient">Choose Client :</p>
                                        <FormItem>
                                            {getFieldDecorator('client', {
                                                rules: [{ required: true, message: 'Please select a client!' },],
                                                // initialValue:{props.location.data}
                                            },

                                            )(
                                                <Select className="statuspipeline"
                                                    placeholder="Choose Role"
                                                    onChange={this.selectStatus}
                                                >
                                                    {this.state.clientlist.map((item, index) => {
                                                        return <Option key={index} value={item._id}>{item.name}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <FormItem label="Project Name">
                                            {getFieldDecorator('name', {
                                                rules: [{ required: true, message: 'Please input your Name!' }],
                                            })(

                                                <Input maxLength="50" placeholder="Name" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>

                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Status">
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select className="statuspipeline"

                                                placeholder="Status"
                                                onChange={this.handleSelectChange}
                                                showSearch
                                            >
                                                <Option value="New">New</Option>
                                                <Option value="InDiscussion">InDiscussion</Option>
                                                <Option value="Scoping">Scoping</Option>
                                                {(this.state.editClient == true) ? <Option value="InProgress">InProgress</Option> : ''}
                                                <Option value="Stalled">Stalled</Option>
                                                <Option value="Completed">Completed</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem className="tech" label="Technology">
                                        {getFieldDecorator('technology', {
                                            rules: [{ required: true, message: 'Please input your Technology!' }],
                                        })(
                                            <Select
                                                mode="multiple"
                                                placeholder="Select users"
                                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                                filterOption={false}
                                                onSearch={this.searchTechnology}
                                                onChange={this.handleChange}
                                                style={{ width: '100%' }}

                                            >
                                                {techArray.map((d, index) =>
                                                    <Option key={index} value={d}>{d}</Option>
                                                )}

                                            </Select>
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
                                                {getFieldDecorator('expecstart', {
                                                    rules: [{ required: false, message: 'Please select expecteddate!' }, {
                                                        validator: this.validatetoexpecend
                                                    }]
                                                })(
                                                    <DatePicker />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate">Expected End Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('expecend', {
                                                    rules: [{ required: false, message: 'Please select expecteddate!' }, {
                                                        validator: this.validatetoexpecstart
                                                    }]
                                                })(
                                                    <DatePicker />
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
                                            <p className="expecteDate4">Actual Start Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('actualstart', {
                                                    rules: [{ required: false, message: 'Please select actualdate!' }, {
                                                        validator: this.validatetoactualend
                                                    }]
                                                })(
                                                    <DatePicker />
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
                                                {getFieldDecorator('actualend', {
                                                    rules: [{ required: false, message: 'Please select actualdate!' }, {
                                                        validator: this.validatetoactualstart
                                                    }]
                                                })(
                                                    <DatePicker disabled={this.state.disabledate} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                </Row>



                                <Row>
                                    {(this.state.editClient == true && this.state.verticalHead == 'InProgress') ?
                                        <Col xs={24} sm={24} md={24} lg={10}>
                                            <FormItem label="Assign To" className="roleAssign">
                                                {getFieldDecorator('assign', {
                                                    rules: [{ required: false, message: 'Please select !' }],
                                                })(
                                                    <Select className="statuspipeline"

                                                        placeholder="Assign To"
                                                        disabled={this.state.disableassign}

                                                        onSelect={this.assignValue}

                                                        showSearch
                                                    >
                                                        {this.state.verticalHeadrarray.map((item, index) => {
                                                            return <Option key={index} value={item._id}>{item.name}</Option>
                                                        })}

                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                        : ''}


                                    {(this.state.editClient == true && this.state.verticalHead == 'InProgress' && this.state.loggedInRole != 'Sales') ?
                                        <Col xs={24} sm={24} md={24} lg={10}>
                                            <FormItem label="Role">
                                                {getFieldDecorator('role', {
                                                    rules: [{ required: false, message: 'Please select ' }],
                                                })(
                                                    <Select className="statuspipeline roleAssign"
                                                        placeholder="Role"
                                                        onChange={this.roleValue}
                                                        showSearch
                                                    >
                                                        <Option value="Consultant1">Consultant1</Option>
                                                        <Option value="Consultant2">Consultant2</Option>
                                                        <Option value="Consultant3">Consultant3</Option>
                                                        <Option value="Consultant4">Consultant4</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                        : ''}
                                    {(this.state.editClient == true && this.state.verticalHead == 'InProgress' && this.state.loggedInRole == 'Sales') ?
                                        <Col xs={24} sm={24} md={24} lg={10}>
                                            <FormItem label="Role">
                                                {getFieldDecorator('role', {
                                                    rules: [{ required: false, message: 'Please select ' }],
                                                })(
                                                    <Select className="statuspipeline"
                                                        onChange={this.roleValue}
                                                        disabled={this.state.disabletag}
                                                        placeholder="VerticalLead"

                                                    >
                                                        <Option value="VerticalLead">VerticalLead</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                        : ''}

                                    {(this.state.editClient == true && this.state.verticalHead == 'InProgress') ?
                                        <Col xs={24} sm={24} md={24} lg={2}>
                                            {(this.state.editClient == true) ?

                                                <div className="addbtn"  >
                                                    <Button onClick={this.addMember} disabled={this.state.disableassign}>Add</Button>
                                                </div>
                                                : ''}
                                        </Col>
                                        : ""}

                                </Row>
                                {/* ShowDetails Modal */}
                                {(this.state.editClient == true && this.state.verticalHead == 'InProgress') ?
                                <Row>
                                    <p><a href="#" onClick={() => this.setModal2Visible(true)}>Show Details</a></p>
                                    <Modal
                                    className="showprojectModal"
                                        title="Show Details"
                                        wrapClassName="vertical-center-modal"
                                        visible={this.state.modal2Visible}
                                        onOk={() => this.setModal2Visible(false)}
                                        onCancel={() => this.setModal2Visible(false)}
                                    >
                                        <Table columns={columns} dataSource={this.state.addMember} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                                    </Modal>
                                </Row>:
                                ""}
                                {/* ShowDetails Modal */}
                                <Row className="briefRequire">
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <FormItem label="Brief Requirement">
                                            {getFieldDecorator('textRequirement', {
                                                rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                            })(
                                                <TextArea maxLength="250" rows={4} className="textRequirement" placeholder="Brief Requirement" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.actions.menuKeys('project_list');this.props.history.push('/dashboard/projectlist') }} >Cancel</Button>
                            </div>
                        </FormItem>


                    </Form>

                    {/* --NewProject details-- */}
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
const WrappedNewProject = Form.create()(NewProject);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNewProject);
