import React, { Component } from 'react';
import './projectManagement.css';
import modulelogo from '../../Images/module.svg';
import modulesidebarlogo from '../../Images/module2.svg';
import { Layout, Input, Menu, Row, Col, List, Avatar, Form, Select, Dropdown, Button, Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
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

    render() {
        const { size } = this.props;
        const state = this.state;

        return (
            /* list section */
            <div className="projectManagementpanda">
                <Layout>
                    <Row>
                        <Col lg={4}>
                            <div className="wkonList sidewkonlist">
                                <Row>
                                    <div className="listView">
                                        <Search
                                            placeholder="Type to filter"
                                            onSearch={value => console.log(value)}
                                            style={{ width: 200 }}
                                        />
                                        {/* <div classname="settingbtn">
                                      <Button type="default">  <Icon type="setting" /></Button>
                                      </div> */}
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
                        <Col lg={8}>
                            <div className="wkonList secondlist">
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
                                                avatar={<Avatar src={modulelogo} />}
                                                title={<a href="#">{item.title}</a>}
                                                description="Lorem Ipsum is simply dummy text"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="detailview">
                                <div className="projectpreview">
                                    <Row className="projectname">
                                        <h1>Project Name</h1>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <p className="expecteDateclient">Assign to :</p>
                                            <FormItem>



                                                <Select
                                                    showSearch
                                                    // style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="jack">Pushpendu</Option>
                                                    <Option value="lucy">payel</Option>
                                                    <Option value="tom">Tom</Option>
                                                </Select>

                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <p className="expecteDateclient">Status :</p>
                                            <FormItem>



                                                <Select
                                                    showSearch
                                                    // style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="jack">Active</Option>
                                                    <Option value="lucy">Pending</Option>
                                                    <Option value="tom">Tom</Option>
                                                </Select>
                                                    
                                                
                                         
                                        </FormItem>
                                    </Col>
                                    </Row>
                                <Row>
                                    <div className="startbtn">
                                        <Button  type="default">Start project</Button>

                                        <Button type="primary">End project</Button>
                                    </div>
                                </Row>
                                {/* <Row className="asign"><p>Asign to</p></Row> */}
                                {/* <Row>
                                        <div className="asignTo">
                                        <p>Asign to :</p>
                                            <Select
                                                value={state.currency}
                                                size={size}
                                                // style={{ width: '3%' }}
                                                onChange={this.handleCurrencyChange}
                                            >
                                                <Option value="rmb">Pushpendu</Option>
                                                <Option value="dollar">Payel</Option>
                                            </Select>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="startbtn">
                                            <Button type="default">Start project</Button>
                                        </div>
                                   
                                        <div className="endbtn">
                                            <Button type="default">End project</Button>
                                        </div>
                                    </Row>
                                    {/* <Row className="statusreport"></Row> */}
                                {/* <Row>
                                        <div className="status">
                                        <p>Status</p>
                                        <Select
                                                value={state.currency}
                                                size={size}
                                                style={{ width: '90%' }}
                                                onChange={this.handleCurrencyChange}
                                            >
                                                <Option value="rmb">Active</Option>
                                                <Option value="dollar">Pending</Option>
                                            </Select>
                                        </div>
                                    </Row> */}
                            </div>
                            </div>
                        </Col>
                    </Row>


                </Layout>
            </div >
            /* list section */
        )
    }
}
export default ProjectManagement