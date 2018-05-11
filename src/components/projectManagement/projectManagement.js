import React, { Component } from 'react';
import './projectManagement.css';
import modulelogo from '../../Images/module.svg';
import modulesidebarlogo from '../../Images/module2.svg';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { getProjectModule } from '../../redux/action';
import { bindActionCreators } from 'redux';
import { Layout, Input, Menu, Row, Col, Modal, List, Avatar, Form, Select, Dropdown, Button, Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
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

const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

class ProjectManagement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: '',
            visible: false,
            moduleList: [],
            moduleId:''
        }
    }

    componentDidMount() {
        if (this.props.location.data) {
            console.log(this.props.location.data.record);

            console.log(this.props.location.data.record._id);

            this.setState({
                projectId: this.props.location.data.record._id
            }, function () {
                this.fetchModules();
            });
        }
    }
    componentWillReceiveProps(props) {
        // console.log(props);

    }
//******************ADD MODULE ***********/
    showModal = () => {
        this.setState({ visible: true });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({ visible: false });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({ visible: false });
        this.props.form.setFieldsValue({    //For Clear the Input  Field
            ['name']: '',
            ['description']: '',
        })
    }
//***************ADD SUBMODULE ********** */
subModal = () => {
    this.setState({ visible: true });
}
    //CREATE MODULE AGAINST PROJECT
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.location);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    name: values.name,
                    description: values.description,
                    projectId: this.state.projectId
                }
                console.log(data);
                this.props.actions.addModule(data)
                this.fetchModules();
                this.props.form.setFieldsValue({    //For Clear the Input  Field
                    ['name']: '',
                    ['description']: '',
                })
                this.setState({ visible: false });
                console.log('Received values of form: ', values);
            }
        })

    }
    addSubModule=()=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    name: values.name,
                    description: values.description,
                    moduleId: this.state.moduleId
                }
                console.log(data);
                this.props.actions.addSubModule(data)
                this.fetchModules();
                this.props.form.setFieldsValue({    //For Clear the Input  Field
                    ['name']: '',
                    ['description']: '',
                })
                this.setState({ visible: false });
                console.log('Received values of form: ', values);
            }
        })
    }
    // FETCH ALL THE MODULES AGAINST PROJECT,uSING PROJECTID
    fetchModules = () => {
        getProjectModule(this.state.projectId).then((success) => {
            console.log(success)
            this.setState({ moduleList: success.result })
        }, function (error) {
            console.log(error);
        });
    }

    // fetch submodules against a module , using module id
    fetchSubModules = () => {

    }

    //fetch Task , using sub-modules id
    fetchTasks = () => {

    }
    deleteModule = () => {

    }


    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }




    render() {
        const { size } = this.props;
        const state = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            /* list section */
            <div className="projectManagementpanda">
                <Layout>
                    <Row>
                        <Col lg={4}>
                            <div className="wkonList sidewkonlist">
                                <Row>
                                    <div className="listView">
                                        {/* <Search
                                            placeholder="Type to filter"
                                            onSearch={value => console.log(value)}
                                            style={{ width: 200 }}
                                        /> */}
                                        {/* <div classname="settingbtn">
                                      <Button type="default">  <Icon type="setting" /></Button>
                                      </div> */}
                                    </div>
                                </Row>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.moduleList}
                                    renderItem={moduleList => (
                                        <List.Item actions={[<a>Add SubModule</a>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={modulesidebarlogo} />}
                                                title={<a href="#">{moduleList.name}</a>}
                                                description={moduleList.description}

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
                                        <Button type="primary" onClick={this.subModal}>ADD SUBMODULE</Button>
                                        <Modal
                                            className="showprojectModal"
                                            title="Show Details"
                                            wrapClassName="vertical-center-modal"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <FormItem label="Module Name">
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(

                                                    <Input maxLength="50" placeholder="Name" />
                                                )}
                                            </FormItem>
                                            <FormItem label="Description">
                                                {getFieldDecorator('description', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(

                                                    <Input maxLength="50" placeholder="description" />
                                                )}
                                            </FormItem>
                                            <Button type="primary" onClick={this.addSubModule}>Submit</Button>
                                        </Modal>
                                    </div>
                                        {/* <Modal
                                            className="showprojectModal"
                                            title="Show Details"
                                            wrapClassName="vertical-center-modal"
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <FormItem label="Module Name">
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(

                                                    <Input maxLength="50" placeholder="Name" />
                                                )}
                                            </FormItem>
                                            <FormItem label="Description">
                                                {getFieldDecorator('description', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(

                                                    <Input maxLength="50" placeholder="description" />
                                                )}
                                            </FormItem>
                                            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>


                                        </Modal> */}
                                </Row>
                                {/* <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.moduleList}
                                    renderItem={moduleList => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={modulelogo} />}
                                                title={<a href="#">{item.name}</a>}
                                                // description="Lorem Ipsum is simply dummy text"
                                                description={item.description}
                                                
                                            />
                                        </List.Item>
                                    )}
                                /> */}
                                {/* <Card className="innercardContenta" bordered={false}>
          <Table columns={columns} dataSource={this.state.moduleList} />
        </Card> */}
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
                                                    onChange={this.handleChange}
                                                    onFocus={this.handleFocus}
                                                    onBlur={this.handleBlur}
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
                                                    onChange={this.handleChange}
                                                    onFocus={this.handleFocus}
                                                    onBlur={this.handleBlur}
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
                                            <Button type="default">Start project</Button>

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
                                    </Row> */}
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
} const mapStateToProps = (state) => {
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(actioncreators, dispatch)
    })
}
const WrappedProjectManagement = Form.create()(ProjectManagement);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProjectManagement);

// export default ProjectManagement