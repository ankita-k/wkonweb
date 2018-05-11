import React, { Component } from 'react';
import './projectManagement.css';
import modulelogo from '../../Images/module.svg';
import modulesidebarlogo from '../../Images/module2.svg';
import { Layout, Modal, Input, Menu, Row, Col, List, Avatar, Form, Select, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import backbtn from '../../Images/backbtn.svg';
import addbtn from '../../Images/addbtn.svg';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const { TextArea } = Input;
const data = [
    
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
    {
        title: 'Lorem Ipsum',
    },
];


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

class ProjectManagement extends Component {

    constructor() {
        super();
        this.state = {
            modal2Visible: false,
            menu:(
                <Menu>
                    <Menu.Item>
                        <a onClick={() => this.setModal2Visible(true)}>Module</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={() => this.setModal3Visible(true)}>Sub Module</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={() => this.setModal4Visible(true)}>Task</a>
                    </Menu.Item>
                </Menu>
            )
        }
    }



    setModal2Visible = (modal2Visible) => {
        this.setState({ modal2Visible });
    }
    setModal3Visible = (modal3Visible) => {
        this.setState({ modal3Visible });
    }
    setModal4Visible = (modal4Visible) => {
        this.setState({ modal4Visible });
    }
    render() {
        const { size } = this.props;
        const state = this.state;

        return (
            /* list section */
            <div className="projectManagementpanda">
                <Layout>
                    <Row>
                        <Col lg={12}>
                            <div className="wkonList sidewkonlist">
                                <Row>
                                    <div className="listHeader">
                                        <Row>
                                            <Col lg={4}>
                                                <Button type="primary"><img src={backbtn} /></Button>
                                            </Col>
                                            <Col lg={12}>
                                                <Breadcrumb>
                                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                                    <Breadcrumb.Item><a href="">Module</a></Breadcrumb.Item>
                                                    <Breadcrumb.Item><a href="">Sub_module</a></Breadcrumb.Item>
                                                    <Breadcrumb.Item>Project</Breadcrumb.Item>
                                                </Breadcrumb>
                                            </Col>

                                            <Col lg={6}></Col>
                                            <Col lg={2}>

                                                <div className="listaddbtn">
                                                    <Dropdown overlay={this.state.menu} placement="bottomCenter" trigger={['click']}>
                                                        <Button><img className="plus" src={addbtn} /></Button>
                                                    </Dropdown>
                                                </div>
                                            </Col>

                                        </Row>


                                    </div>
                                </Row>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={modulesidebarlogo} />}
                                                title={<a href="#">{item.title}</a>}
                                            // description="17 points | 7 comments | 16 hours ago by Suganth S"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>

                        <Col lg={12}>
                            <div className="wkonList detailView">
                                <div className="projectname">
                                    <p>Project Name :</p>
                                    <Input placeholder="" />

                                </div>
                                <div className="projectdata">
                                    <p>Project Details :</p>
                                    <TextArea rows={4} />
                                </div>
                                <div className="savebtn">
                                    <Button>Save</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="modal"><Modal
                        title="Module name"
                        wrapClassName="Module name"
                        visible={this.state.modal2Visible}
                        onOk={() => this.setModal2Visible(false)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                      <div className="projectname">
                                    <p>Name :</p>
                                    <Input placeholder="" />

                                </div>
                                <div className="projectdata">
                                    <p>Details :</p>
                                    <TextArea rows={4} />
                                </div>
                                <div className="savebtn modalbtn">
                                    <Button>Save</Button>
                                    <Button className="cancelbtn">Cancel</Button>
                                </div>
                    </Modal>
                    </div>

                    
                    <div className="modal"><Modal
                        title="New Sub module"
                        wrapClassName="New Sub module"
                        visible={this.state.modal3Visible}
                        onOk={() => this.setModal3Visible(false)}
                        onCancel={() => this.setModal3Visible(false)}
                    >
                       <div className="projectname">
                                    <p>Name :</p>
                                    <Input placeholder="" />

                                </div>
                                <div className="projectdata">
                                    <p>Descriptions :</p>
                                    <TextArea rows={4} />
                                </div>
                                <div className="savebtn modalbtn">
                                    <Button>Save</Button>
                                    <Button className="cancelbtn">Cancel</Button>
                                </div>
                        
                    </Modal>
                    </div>
                    <div className="modal"><Modal
                        title="Task"
                        wrapClassName="Task"
                        visible={this.state.modal4Visible}
                        onOk={() => this.setModal4Visible(false)}
                        onCancel={() => this.setModal4Visible(false)}
                    >
                        <div className="projectname">
                                    <p>Name :</p>
                                    <Input placeholder="" />

                                </div>
                                <div className="projectdata">
                                    <p>Descriptions :</p>
                                    <TextArea rows={4} />
                                </div>
                                <div className="savebtn modalbtn">
                                    <Button>Save</Button>
                                    <Button className="cancelbtn">Cancel</Button>
                                </div>
                        
                    </Modal>
                    </div>

                </Layout>
            </div >
            /* list section */
        )
    }
}
export default ProjectManagement