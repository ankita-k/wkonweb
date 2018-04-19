import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card, Select, DatePicker, AutoComplete } from 'antd';
import '../ClientComponent/ClientComponent.css';
import './NewProject.css';
import { Divider } from 'antd';
import moment from 'moment'
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;
class NewProject extends Component {




    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            clientlist: [],
            clientarray: [],
            show: false,//loading-bar,
            disabledate: true,
            disableclient: false
        }
    }

    componentDidMount() {
        console.log("component Did Mount");
        console.log(this.props.location);
        console.log(this.props.form)
        if (this.props.location.data) {
            this.setState({ disabledate: false })
            this.setState({ disableclient: true })
            this.props.form.setFieldsValue({
                ['name']: this.props.location.data.data.name,
                ['textRequirement']: this.props.location.data.data.requirement1,
                ['technology']: this.props.location.data.data.technology,
                ['expecstart']: this.props.location.data.data.expectedStartDate ? moment(this.props.location.data.data.expectedStartDate) : '',
                ['expecend']: this.props.location.data.data.expectedEndDate ? moment(this.props.location.data.data.expectedEndDate) : '',
                ['actualstart']: this.props.location.data.data.actualStartDate ? moment(this.props.location.data.data.actualStartDate) : '',
                ['actualend']: this.props.location.data.data.actualEndDate ? moment(this.props.location.data.data.actualEndDate) : '',
                ['status']: this.props.location.data.data.status,
                ['client']: this.props.location.data.data.client ? this.props.location.data.data.client.name : ''
            })

        }




        // GET CLIENT LIST
        this.props.clientlist(sessionStorage.getItem('id'), 0, 30).then((data) => {
            // this.setState({ show: false });
            console.log(data);
            this.setState({ clientlist: data.result });
            console.log(this.state.clientlist);
        }, err => {

        })
    }

    // ADD PROJECT FUNCTION 
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ show: true });
        this.props.form.validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);

                if (this.props.location.data) {
                    console.log('edit function')


                    let data = {
                        requirement: values.textRequirement,
                        status: values.status,
                        technology: values.technology,
                        expectedStartDate: values.expecstart ? values.expecstart._d : '',
                        // actualStartDate: values.actualstart ? values.actualstart._d : '',
                        expectedEndDate: values.expecend ? values.expecend._d : '',
                        // actualEndDate: values.actualend ? values.actualend._d : '',
                        name: values.name,
                        client: this.props.location.data.data.client._id

                    }
                    if (values.actualstart) {
                        data.actualStartDate = values.actualstart._d
                    }
                    if (values.actualend) {
                        data.actualEndDate = values.actualend._d
                    }
                    console.log(data)

                    this.props.editproject(data, this.props.location.data.data._id).then(response => {
                        this.setState({ show: false });
                        console.log(response)
                        if (!response.error) {
                            this.props.opentoast('success', 'Project Updated Successfully!');
                            this.props.history.push('/dashboard/projectlist')
                        }
                    }, err => {

                    })
                }
                else {

                    let data = {
                        requirement: values.textRequirement,
                        status: values.status,
                        technology: values.technology,
                        expectedStartDate: values.expecstart ? values.expecstart._d : '',
                        // actualStartDate: values.actualstart ? values.actualstart._d : '',
                        expectedEndDate: values.expecend ? values.expecend._d : '',
                        // actualEndDate: values.actualend ? values.actualend._d : '',
                        name: values.name,
                        userId: sessionStorage.getItem('id'),
                        client: values.client

                    }
                    if (values.actualstart) {
                        data.actualStartDate = values.actualstart._d
                    }

                    console.log(data)
                    this.props.addProject(data).then(response => {
                        this.setState({ show: false });
                        console.log(response)
                        if (!response.error) {
                            this.props.opentoast('success', 'Project Added Successfully!');
                            this.props.history.push('/dashboard/projectlist')
                        }
                    }, err => {

                    })
                }

            }
        });
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

            // if (clientarray.length != 0) {
                this.setState({ clientarray })
            // }
            // else {
            //     let data={
            //         name: "No Result Found",
            //         _id : "1111"
            //     }
            //   clientarray.push(data)
            //   this.setState({clientarray})
            // }




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
    
    render() {
        // const { clientarray } = this.state;
        // console.log(this.state.clientarray)
        // const children = clientarray.map((list) => {
        //     return <Option1 key={list._id}>{list.name}</Option1>;
        // });
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
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />

                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}
                    <div className="newCustomerform">
                        <h1 className="NewCustomer">New Project</h1>
                        <Divider dashed className="underLine" />
                    </div>
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
                                                <AutoComplete
                                                    className="clientHere clieHere"
                                                    onSearch={this.handleSearch}
                                                    placeholder="Choose Client"
                                                    dataSource={this.state.clientarray.map((item) => { return this.renderOption(item) })}
                                                   // onSelect={this.onSelect}
                                                    disabled={this.state.disableclient}

                                                >

                                                </AutoComplete>
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
                                        {/* <FormItem label="Brief Requirement">
                                        {getFieldDecorator('requirement', {
                                            rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                        })(
                                            <Input placeholder="Brief Requirement" />
                                        )}
                                    </FormItem> */}
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
                            </div>
                            <Row className="briefRequire">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <FormItem label="Brief Requirement">
                                        {getFieldDecorator('textRequirement', {
                                            rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                        })(
                                            // <Input placeholder="Brief Requirement" />
                                            <TextArea maxLength="250" rows={4} className="textRequirement" placeholder="Brief Requirement" />
                                        )}
                                    </FormItem>
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
                                                showSearch
                                            >
                                                <Option value="New">New</Option>
                                                <Option value="InDiscussion">InDiscussion</Option>
                                                <Option value="Scoping">Scoping</Option>
                                                <Option value="InProgess">InProgess</Option>
                                                <Option value="Stalled">Stalled</Option>
                                                <Option value="Completed">Completed</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Technology">
                                        {getFieldDecorator('technology', {
                                            rules: [{ required: true, message: 'Please input your Technology!' }],
                                        })(
                                            <Input maxLength="50" placeholder="Technology" />
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
                                                    rules: [{ type: 'object', required: true, message: 'Please select expecteddate!' }, {
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
                                                    rules: [{ type: 'object', required: true, message: 'Please select expecteddate!' }, {
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
                                                    rules: [{  required: false, message: 'Please select actualdate!' }, {
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
                                                    rules: [{  required: false, message: 'Please select actualdate!' }, {
                                                        validator: this.validatetoactualstart
                                                    }]
                                                })(
                                                    <DatePicker disabled={this.state.disabledate} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <p className="expecteDateclient">Choose Client :</p>
                                        <FormItem>
                                            {getFieldDecorator('client', {
                                                rules: [{ required: true, message: 'Please select a client!' },]
                                            })(
                                                <AutoComplete
                                                    className="clientHere"
                                                    onSearch={this.handleSearch}
                                                    placeholder="Choose Client"
                                                    dataSource={this.state.clientarray.map((item) => { return this.renderOption(item) })}
                                                    onSelect={this.onSelect}
                                                >

                                                </AutoComplete>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row> */}
                            </div>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button className="cardbuttonCancel login-form-button" onClick={() => { this.props.history.push('/dashboard/projectlist') }} >Cancel</Button>
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

const WrappedNewProject = Form.create()(NewProject);
export default connect(mapStateToProps, actioncreators)(WrappedNewProject);
