import React, { Component } from 'react';
import './projectManagement.css';
import navbarlogo from '../../Images/wkonlogo.png';
import { Layout, Input, Menu, Row, Col, List, Avatar, Dropdown, Button, Icon } from 'antd';
const data = [
    {
      title: 'Google Zeplin',
    },
    {
      title: 'Google Zeplin',
    },
    {
      title: 'Google Zeplin',
    },
    {
      title: 'Google Zeplin',
    },
  ];
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
    </Menu>
);
const Search = Input.Search;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class ProjectManagement extends Component {

    render() {

        return (
            /* list section */
            <div className="projectManagementpanda">
                <Layout>
                    <Row>
                    <Col lg={6}>
                        <div className="wkonList">
                            <Row>
                                <div className="listView">
                               

                                </div>
                            </Row>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            // description="17 points | 7 comments | 16 hours ago by Suganth S"
                                        />
                                    </List.Item>
                                )}
                            />
                            </div>
                        </Col>
                        <Col lg={10}>
                        <div className="wkonList">
                            <Row>
                                <div className="listView">
                                    <Dropdown overlay={menu} placement="bottomLeft">
                                        <Button>Home</Button>
                                    </Dropdown>

                                </div>
                            </Row>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="17 points | 7 comments | 16 hours ago by Suganth S"
                                        />
                                    </List.Item>
                                )}
                            />
                            </div>
                        </Col>
                        {/* <Col lg={14}>col-12</Col> */}
                    </Row>


                </Layout>
            </div>
            /* list section */
        )
    }
}
export default ProjectManagement