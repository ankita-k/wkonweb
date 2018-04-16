import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card, Select, DatePicker, AutoComplete } from 'antd';
import '../ClientComponent/ClientComponent.css';
import './NewProject.css';
import { Divider } from 'antd';
import moment from 'moment'
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;
const Option1 = AutoComplete.Option1;
class NewProject extends Component {




    constructor(props) {
        super(props);
        this.state = {
            clientlist: [],
            clientarray: []
        }
    }

    componentWillMount() {
        // GET CLIENT LIST
        this.props.clientlist(sessionStorage.getItem('id'), 0, 30).then((data) => {

            console.log(data);
            this.setState({ clientlist: data.result });
            console.log(this.state.clientlist);
        }, err => {

        })
    }
    // ADD PROJECT FUNCTION 
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);
                let data = {
                    requirement: values.requirement,
                    status: values.status,
                    technology: values.technology,
                    expectedStartDate: values.expecstart._d,
                    actualStartDate: values.actualstart._d,
                    expectedEndDate: values.expecend._d,
                    actualEndDate: values.actualend ? values.actualend._d : '',
                    name: values.name,
                    userId: sessionStorage.getItem('id'),
                    client:values.client

                }
                console.log(data)
                this.props.addProject(data).then(response => {
                    console.log(response)
                    if (!response.error) {
                        this.props.opentoast('success', 'Project Added Successfully!');
                        this.props.history.push('/dashboard/projectlist')
                    }
                }, err => {

                })
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
        console.log(value);
        let clientarray;
        if (value) {
            clientarray = this.state.clientlist.filter(d => {
                return d.name.indexOf(value) > -1

            });
            this.setState({ clientarray })
            console.log(this.state.clientlist)

        }




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
    // ON SELECTING VALUE OF DROPDOWN
    onSelect = (e) => {
        console.log(e)
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
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }, {
                validator: this.datevalidate
            }]
        };
        return (
            <div>
                <Card className="innercardContent cardProject" bordered={false}>
                    {/* --NewProject details-- */}
                    <div className="newCustomerform">
                        <h1 className="NewCustomer">New Project</h1>
                        <Divider dashed className="underLine" />
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="inputForminfo informationProject">
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Name">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your Name!' }],
                                        })(
                                            <Input placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Brief Requirement">
                                        {getFieldDecorator('requirement', {
                                            rules: [{ required: true, message: 'Please input your Brief Requirement!' }],
                                        })(
                                            <Input placeholder="Brief Requirement" />
                                        )}
                                    </FormItem>
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
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Status">
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select className="statuspipeline"
                                                placeholder="Status"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="Interested">Interested</Option>
                                                <Option value="Pipeline">Pipeline</Option>
                                                <Option value="Committed">Committed</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <FormItem label="Technology">
                                        {getFieldDecorator('technology', {
                                            rules: [{ required: true, message: 'Please input your Technology!' }],
                                        })(
                                            <Input placeholder="Technology" />
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
                                            <p className="expecteDate">Actual Start Date :</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('actualstart', {
                                                    rules: [{ type: 'object', required: true, message: 'Please select actualdate!' }, {
                                                        validator: this.validatetoactualend
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
                                            <p className="expecteDate4">Expected End Date</p>
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
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <div className="startDate">
                                            <p className="expecteDate4">Actual End Date</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('actualend', {
                                                    rules: [{ type: 'object', required: false, message: 'Please select actualdate!' }, {
                                                        validator: this.validatetoactualstart
                                                    }]
                                                })(
                                                    <DatePicker disabled={true} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
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
                                </Row>
                            </div>
                        </div>
                        <FormItem>
                            <div className="savebutton">
                                <Button htmlType="submit" className="cardbuttonSave login-form-button">Save</Button>
                                <Button htmlType="submit" className="cardbuttonCancel login-form-button">Cancel</Button>
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
