import React, { Component } from 'react';
import './ProjectTab.css';
import { Layout, Modal, Input, Menu, Row, Col, List, TimePicker, Avatar, DatePicker, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import chats from '../../Images/chats.svg';
import projct from '../../Images/projects.svg';
import upload from '../../Images/upload.svg';
const { Header, Content, Footer, Sider } = Layout;

class ProjectTab extends Component {

    render() {

        return (
            <div className="prjcttabalign">
                <div className="projecttabWindow">
                    <Layout>
                        <div className="prjctcontent">
                            <p className="prjctnameheading">Project Name :<span className="prjctnm">&nbsp;WKON</span></p>
                            <p className="prjctdesc">Project Description :</p>
                            <p className="prjcdtl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </p>


                        </div>
                        <Row>
                            <Col span={7} className="cardblock">
                                <div className="cardcontent">
                                    <img src={projct} className="prjct" />
                                    <p className="prjcttxt">Project</p>

                                </div>


                            </Col>
                            <Col span={1} ></Col>

                            <Col span={8} className="cardblock">
                                <div className="cardcontent">
                                    <img src={chats} className="chatting" />
                                    <p className="prjcttxt">Chat Us</p>
                                </div>
                            </Col>
                            <Col span={1} ></Col>
                            <Col span={7} className="cardblock">

                                <div className="cardcontent">
                                    <img src={upload} className="upldimg" />
                                    <p className="prjcttxt">File Upload</p>
                                </div>

                            </Col>

                        </Row>





                    </Layout>
                </div >

            </div>

        )
    }
}



export default ProjectTab;

