import React, { Component } from 'react';
import './timesheetManagement.css';

import { Layout, Modal, Input, Menu, Row, Col, List, TimePicker, Avatar, DatePicker, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import lunch from '../../Images/dinner.svg';
import teabreak from '../../Images/teabreak.svg';
import meeting from '../../Images/meeting.svg';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import moment from 'moment';

const data = [
    {
        title: 'LOREM IPSUM',
    },
    {
        title: 'LOREM IPSUM',
    },
    {
        title: 'LOREM IPSUM',
    },
    {
        title: 'LOREM IPSUM',
    },
];
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;


class WrappedtimesheetManagement extends Component {
    state = { visible: false }
    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            timesheet_title: '',  //DYNAMIC TIITLE FOR TIMESHEET PURPOSE
            disableEnd_time: false
        }
    }

    componentDidMount() {
        // this.props.actions.getTimesheet('5afec2af77860e41ff84217f', '2018-05-18T12:10:23.548Z');
    }

    // CREATE TIMESHEET FOR LOGGED USER
    createTimesheet = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                let data = {
                    userId: this.state.userId,
                    startTime: values.start_time.format(),
                    endTime: values.end_time.format()
                }
                // console.log(values.end_time.toISOString())
                console.log(data)
                this.props.actions.createTimeSheet(data);
                this.setState({ visible: false, });
                this.props.form.resetFields();
            }


        });
    }

    //  SHOW TIMESHEET CREATION FORM
    showModal = (purpose) => {
        console.log(purpose)
        this.setState({ visible: true, });
        this.setState({ timesheet_title: purpose })
        this.setState({ disableEnd_time: false });
        this.props.form.resetFields();
    }
    handleOk = (e) => {

        this.setState({
            visible: false,
        });
    }

    // CLOSE MODAL
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    };

    // VALIDATE END TIME TO START TIME AND AUTOMATICALLY FILL END TIME DPENDING ON CONDITIONDS
    fillendTime = (value) => {
        console.log(value)
        if (value) {
            if (this.state.timesheet_title == 'Lunch') {
                // to add minutes to end time ,fill endtime value  and disable end time field
                let starttime = moment(value, 'HH:mm:ss').add(30, 'minutes').format('HH:mm:ss');
                let x = (moment(starttime, 'HH:mm:ss').toDate());
                let m = moment(x)
                this.props.form.setFieldsValue({
                    ['end_time']: m
                })
                this.setState({ disableEnd_time: true });
            }
            else if (this.state.timesheet_title == 'Tea Break') {
                // to add minutes to end time and disable end time
                let starttime = moment(value, 'HH:mm:ss').add(10, 'minutes').format('HH:mm:ss');
                let x = (moment(starttime, 'HH:mm:ss').toDate());
                let m = moment(x)
                this.props.form.setFieldsValue({
                    ['end_time']: m
                })
                this.setState({ disableEnd_time: true });
            }
            // else if (this.state.timesheet_title == 'Meeting') {

            // }

        }

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { timesheet_title } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (


            <div className="timesheet">
                <Layout>
                    <Row>
                        <Col lg={12}>
                            <div className="activityName">
                                <Row className="actname"><h1>Activity</h1></Row>
                                <Row className="lunch">
                                    <Button className="activitybutton" type="primary" onClick={() => { this.showModal('Lunch') }}>
                                        <img src={lunch} />
                                        <span className="lunchMeal">Lunch</span>
                                        <Icon type="right" />
                                    </Button>
                                </Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary" onClick={() => { this.showModal('Tea Break') }}>
                                    <img src={teabreak} />
                                    <span className="lunchMeal">Tea break</span>
                                    <Icon type="right" />
                                </Button></Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary" onClick={() => { this.showModal('Meeting') }}>
                                    <img src={meeting} />
                                    <span className="lunchMeal">Meeting</span>
                                    <Icon type="right" />
                                </Button></Row>
                            </div>

                            {/* lunch Modal */}
                            <div>
                                <Modal
                                    title={timesheet_title}
                                    wrapClassName="vertical-center-modal"
                                    className="backgroundPicture"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <div className="lunchTime">
                                        <Form onSubmit={this.createTimesheet}>
                                            <p>Start Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('start_time', {
                                                    rules: [{ required: true, message: 'Please select starttime!' }

                                                    ]
                                                })(
                                                    <TimePicker format="HH:mm" onChange={this.fillendTime} />
                                                )}
                                            </FormItem>
                                            <p>End Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('end_time', {
                                                    rules: [{ required: true, message: 'Please select starttime!' }

                                                    ]
                                                })(
                                                    <TimePicker format="HH:mm" disabled={this.state.disableEnd_time} />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{
                                                    xs: { span: 24, offset: 0 },
                                                    sm: { span: 16, offset: 8 },
                                                }}
                                            >
                                                <Button className="modalSave" htmlType="submit">Save</Button>
                                                <Button className="modalCancel" onClick={this.handleCancel}>Cancel</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                            {/* lunch Modal */}

                        </Col>
                        <Col lg={12}>

                            <div className="dataonly">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<a>LOREM IPSUM</a>}
                                                description="Lorem Ipsum is simply dummy text"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>
                    </Row>
                </Layout>
            </div >

        )
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
const timesheetManagement = Form.create()(WrappedtimesheetManagement);
export default connect(mapStateToProps, mapDispatchToProps)(timesheetManagement);

// export default ProjectManagement


// timesheetid 5afe74dc5914ad24a3706e21