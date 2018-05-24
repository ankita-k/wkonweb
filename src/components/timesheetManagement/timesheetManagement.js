import React, { Component } from 'react';
import './timesheetManagement.css';

import { Layout, Modal, Input, Menu, Row, Col, List, DatePicker, TimePicker, Avatar, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import lunch from '../../Images/dinner.svg';
import teabreak from '../../Images/teabreak.svg';
import meeting from '../../Images/meeting.svg';
function onChange(date, dateString) {
    console.log(date, dateString);
}
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

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            // Should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const rangeTimeValue = fieldsValue['range-time-picker'];
            const values = {
                ...fieldsValue,
                'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
            };
            console.log('Received values of form: ', values);
        });
    }
    state = {
        modal1Visible: false,
        modal2Visible: false,
        modal3Visible: false,
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    setModal3Visible(modal3Visible) {
        this.setState({ modal3Visible });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    closeModule = () => {
        this.setState({ modal1Visible: false })
        this.setState({ modal2Visible: false })
        this.setState({ modal3Visible: false })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
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
                                <div className="taskbtn">
                                <Row className="lunch">
                                    <Button className="activitybutton" type="primary" onClick={() => this.setModal1Visible(true)}>
                                        <img src={lunch} />
                                        <span className="lunchMeal1">Lunch</span>

                                    </Button>
                                </Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary" onClick={() => this.setModal2Visible(true)}>
                                    <img src={teabreak} />
                                    <span className="lunchMeal">Tea break</span>

                                </Button></Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary" onClick={() => this.setModal3Visible(true)}>
                                    <img src={meeting} />
                                    <span className="lunchMeal">Meeting</span>
                                </Button></Row>
                                </div>
                            </div>

                            {/* lunch Modal */}
                            <div>
                                <Modal
                                    title="Lunch"
                                    wrapClassName="vertical-center-modal"

                                    visible={this.state.modal1Visible}
                                    onOk={() => this.setModal1Visible(false)}
                                    onCancel={() => this.setModal1Visible(false)}
                                >
                                    <div className="lunchTime">
                                        <Form onSubmit={this.handleSubmit}>
                                            <p>Start Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <p>End Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{
                                                    xs: { span: 24, offset: 0 },
                                                    sm: { span: 16, offset: 8 },
                                                }}
                                            >
                                                <Button className="modalSave" htmlType="submit">Save</Button>
                                                <Button className="modalCancel" htmlType="submit" onClick={this.closeModule}>Cancel</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                            {/* lunch Modal */}
                            {/* tea break*/}
                            <div>

                                <Modal
                                    title="Tea break"
                                    wrapClassName="vertical-center-modal"

                                    visible={this.state.modal2Visible}
                                    onOk={() => this.setModal2Visible(false)}
                                    onCancel={() => this.setModal2Visible(false)}
                                >

                                    <div className="lunchTime">
                                        <Form onSubmit={this.handleSubmit}>
                                            <p>Start Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <p>End Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{
                                                    xs: { span: 24, offset: 0 },
                                                    sm: { span: 16, offset: 8 },
                                                }}
                                            >
                                                <Button className="modalSave" htmlType="submit" >Save</Button>
                                                <Button className="modalCancel" htmlType="submit" onClick={this.closeModule}>Cancel</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                            {/*teabreak */}
                            {/* tea break*/}
                            <div>

                                <Modal
                                    title="Meeting"
                                    wrapClassName="vertical-center-modal"

                                    visible={this.state.modal3Visible}
                                    onOk={() => this.setModal3Visible(false)}
                                    onCancel={() => this.setModal3Visible(false)}
                                >

                                    <div className="lunchTime">
                                        <Form onSubmit={this.handleSubmit}>
                                            <p>Start Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <p>End Time:</p>
                                            <FormItem
                                                {...formItemLayout}
                                            >
                                                {getFieldDecorator('time-picker', config)(
                                                    <TimePicker />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{
                                                    xs: { span: 24, offset: 0 },
                                                    sm: { span: 16, offset: 8 },
                                                }}
                                            >
                                                <Button className="modalSave" htmlType="submit" >Save</Button>
                                                <Button className="modalCancel" htmlType="submit" onClick={this.closeModule}>Cancel</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                            {/*Meeting */}

                        </Col>
                        <Col lg={12}>
                            <Row className="taskListdate">
                                <p>Select Date</p>
                                <DatePicker onChange={onChange} />
                            </Row>
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
const timesheetManagement = Form.create()(WrappedtimesheetManagement);
export default timesheetManagement;

// export default ProjectManagement