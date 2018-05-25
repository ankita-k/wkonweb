import React, { Component } from 'react';
import './timesheetManagement.css';

import { Layout, Modal, Table, Input, Menu, Row, Col, List, TimePicker, Avatar, DatePicker, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import lunch from '../../Images/dinner.svg';
import teabreak from '../../Images/teabreak.svg';
import meeting from '../../Images/meeting.svg';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import moment from 'moment';



const columns = [{
    title: 'Project Name',
    dataIndex: 'name',
}, {
    title: 'StartTime',
    dataIndex: 'starttime',
}, {
    title: 'End Time',
    dataIndex: 'endtime',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `WKON ${i}`,
        starttime: '10:30',
       endtime: '12:30 ',
    });
}




// const data = [
//     {
//         title: 'LOREM IPSUM',
//     },
//     {
//         title: 'LOREM IPSUM',
//     },
//     {
//         title: 'LOREM IPSUM',
//     },
//     {
//         title: 'LOREM IPSUM',
//     },
// ];
const FormItem = Form.Item;
const { Header, Content, Footer, Sider } = Layout;


class WrappedtimesheetManagement extends Component {

    // table
    
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // table

    state = { visible: false }
    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            timesheet_title: '',  //DYNAMIC TIITLE FOR TIMESHEET PURPOSE
            disableEnd_time: false,
            date: moment(),
            timesheetList: []
        }
    }

    componentDidMount() {

        console.log(this.state.date)
        this.getTimesheet(this.state.date)
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
                    startTime: values.start_time._d.toISOString(),
                    endTime: values.end_time._d.toISOString(),
                    date: moment()._d.toISOString(),
                    purpose: this.state.timesheet_title
                }
                // console.log(values.end_time.toISOString())
                console.log(data)
                this.props.actions.createTimeSheet(data);
                this.setState({ visible: false, });
                this.props.form.resetFields();
            }


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

    // GET USER TIMESHHET ACCORDING TO DATE CHOOSEN
    getTimesheet = (date) => {
        console.log(date._d.toISOString())
        this.props.actions.getTimesheetByDate(this.state.userId, date._d.toISOString()).then(response => {
            console.log(response)
            if (!response.error) {
                if (response.result.length != 0) {
                    this.setState({ timesheetList: response.result })
                } else {
                    this.setState({ timesheetList: [] })
                }
            }
        }, err => {

        })
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
                                <DatePicker onChange={this.getTimesheet} />
                            </Row>

                            <div className="dataonly">

                                {/* <div className="tym">
                                    <Row className="dta">
                                        <Col lg={8}>
                                            <div className="tsk">
                                             <p><Icon type="file-text" /> Wkon</p>
                                            </div>
                                            
                                        </Col>
                                        <Col lg={8}>
                                            <div className="strt">
                                                <p className="strttym"><Icon type="clock-circle-o" /> Start Time: 10:20</p>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <div className="endt">
                                                <p className="endtym"> <Icon type="clock-circle-o" /> End Time: 10:20</p>
                                            </div>
                                        </Col>
                                    </Row>
                                   
                                </div> */}

                                
                                <Table  columns={columns} dataSource={data} />


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