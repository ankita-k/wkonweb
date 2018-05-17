import React, { Component } from 'react';
import './timesheetManagement.css';

import { Layout, Modal, Input, Menu, DatePicker, Row, Col, List, Avatar, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import lunch from '../../Images/dinner.svg';
import teabreak from '../../Images/teabreak.svg';
import meeting from '../../Images/meeting.svg';
const { Header, Content, Footer, Sider } = Layout;
class timesheetManagement extends Component {





    render() {


        return (


            <div className="timesheet">
                <Layout>
                    <Row>
                        <Col lg={12}>
                            <div className="activityName">
                                <Row className="actname"><h1>Activity</h1></Row>
                                <Row className="lunch">
                                    <Button className="activitybutton" type="primary">
                                    <img src={lunch}/>
                                        Lunch
                                    <Icon type="right" />
                                    </Button>
                                    </Row>
                                <Row className="teabreak"><Button className="activitybutton" type="primary">
                                <img src={teabreak}/>
                                    Tea break<Icon type="right" />
                                </Button></Row>
                                <Row className="meeting"><Button className="activitybutton" type="primary">
                                <img src={meeting}/>
                                    Meeting<Icon type="right" />
                                </Button></Row>
                            </div>
                        </Col>
                        <Col lg={12}><div className="dataonly"></div>
                        </Col>
                    </Row>
                </Layout>
            </div >

        )
    }
}
export default timesheetManagement;

// export default ProjectManagement