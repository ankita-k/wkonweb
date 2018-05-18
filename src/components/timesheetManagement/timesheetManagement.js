import React, { Component } from 'react';
import './timesheetManagement.css';

import { Layout, Modal, Input, Menu, Row, Col, List, TimePicker, Avatar, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import lunch from '../../Images/dinner.svg';
import teabreak from '../../Images/teabreak.svg';
import meeting from '../../Images/meeting.svg';
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

    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };




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
                                <Row className="lunch">
                                    <Button className="activitybutton" type="primary" onClick={this.showModal}>
                                        <img src={lunch} />
                                        <span className="lunchMeal">Lunch</span>
                                        <Icon type="right" />
                                    </Button>
                                </Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary">
                                    <img src={teabreak} />
                                    <span className="lunchMeal">Tea break</span>
                                    <Icon type="right" />
                                </Button></Row>
                                <Row className="lunch"><Button className="activitybutton" type="primary">
                                    <img src={meeting} />
                                    <span className="lunchMeal">Meeting</span>
                                    <Icon type="right" />
                                </Button></Row>
                            </div>

                            {/* lunch Modal */}
                            <div>
                                <Modal
                                    title="Lunch"
                                    wrapClassName="vertical-center-modal"
                                    className="backgroundPicture"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
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
                                                <Button className="modalCancel" htmlType="submit">Cancel</Button>
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
const timesheetManagement = Form.create()(WrappedtimesheetManagement);
export default timesheetManagement;

// export default ProjectManagement