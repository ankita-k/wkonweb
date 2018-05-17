import React, { Component } from 'react';
import './projectManagement.css';
import modulelogo from '../../Images/module.svg';
import modulesidebarlogo from '../../Images/module2.svg';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Layout, Modal, Input, Menu, DatePicker, Row, Col, List, Avatar, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import backbtn from '../../Images/backbtn.svg';
import addbtn from '../../Images/addbtn.svg';
const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const FormItem1 = Form.Item;
const FormItem2 = Form.Item;
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class ProjectManagement extends Component {

    handleSubmit = (e) => {
        console.log("handlesubmit");
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }
    constructor(props) {
        super(props);

        this.state = {
            projectId: '',
            moduleList: [],
            subModuleList: [],
            moduleId: '',       //save modueid
            submoduleId: '',     //save submoduleid
            taskId: '',          //save taskid
            modal2Visible: false,
            showsubmodule: false,                               // hide-show submodule tab from  header
            showtask: false,                                    // hide-show task tab from  header 
            functioncall: 'submodules',                       // switch function call for submodule list ,task list from list item
            showform: false,                                  // hide-show save,cancel button when project detail show
            namefieldlabel: 'Project Name',                   // dynamic form field label name
            descriptionfieldlabel: 'Project Description',     // dynamic form field label name
            projectreRequirement: '',
            projectname: '',
            formstyle: { display: 'none' },                   // HIDE-SHOW EDIT FORM OF MODULE-SUBMODULE
            projectstyle: { display: 'block' },               // HIDE-SHOW PROJECT VIEW   
            taskformstyle: { display: 'none' },               // HIDE-SHOW TASK EDIT FORM
            modulestyle: { display: 'block' },                 // HIDE-SHOW MODULE MENUITEM OF DROPDOWN
            submodulestyle: { display: 'none' },              // HIDE-SHOW SUBMODULE MENUITEM OF DROPDOWN
            taskstyle: { display: 'none' },                   // HIDE-SHOW TASK MENUITEM OF DROPDOWN
            showloader: true                                  // HIDE-SHOW LOADER
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.location.data) {
            console.log(this.props.location.data.record);

            console.log(this.props.location.data.record._id);
            this.setState({ projectname: this.props.location.data.record.name1 })
            this.setState({ projectreRequirement: this.props.location.data.record.requirement1 })

            this.setState({
                projectId: this.props.location.data.record._id
            }, function () {
                this.fetchModules();
            });
        }
    }
    componentWillReceiveProps(props) {
        console.log(props);
    }
    //CREATE MODULE AGAINST PROJECT
    addModule = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.moduledetails && values.modulename) {
                let data = {
                    name: values.modulename,
                    description: values.moduledetails,
                    projectId: this.state.projectId
                }
                console.log(data);
                this.props.actions.addModule(data);
                this.fetchModules();
                this.props.form.setFieldsValue({    //For Clear the Input  Field
                    ['modulename']: '',
                    ['moduledetails']: '',
                })
                this.setState({ modal2Visible: false })

            }
        })

    }
    // CLOSE MODULE ON CANCEL
    closeModule = () => {
        this.setState({ modal2Visible: false })
        this.setState({ modal3Visible: false })
        this.setState({ modal4Visible: false })
    }

    //  ADD SUBMODULE TO MODULE 
    addSubModule = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (values.submodulename && values.submoduledetails) {
                let data = {
                    name: values.submodulename,
                    description: values.submoduledetails,
                    moduleId: this.state.moduleId
                }
                console.log(data);
                this.props.actions.addSubModule(data)
                this.fetchSubModules(this.state.moduleId);
                this.props.form.setFieldsValue({    //For Clear the Input  Field
                    ['submodulename']: '',
                    ['submoduledetails']: '',
                })
                // this.setState({ visible: false });
                this.setState({ modal3Visible: false });

            }
        })
    }
    //ADD TASK (MODAL)
    addTask = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (values.tasknames && values.taskdetails) {
                // let data = {
                //     name: values.taskname,
                //     description: values.taskdetails,
                //     submoduleId: this.state.submoduleId
                // }
                // console.log(data);
                // this.props.actions.addTask(data)
                // this.fetchTasks(this.state.submoduleId);
                this.props.form.setFieldsValue({   
                    ['tasknames']: '',
                    ['taskdetails']: '',
                })
                // this.setState({ modal4Visible: false });
            }
        })
    }
    //*********ADD TASK ENDS********
    // CREATE MODULES
    createModule = (res) => {
        console.log(res);
        let data = {
            name: res.projectname,
            description: res.projectdetails,
            projectId: this.state.projectId
        }
        console.log(data);
        this.props.actions.moduleCreate(data)
        this.getModules();
        this.props.form.setFieldsValue({    //For Clear the Input  Field
            ['projectname']: '',
            ['projectdetails']: '',
        })
        this.setState({ modal2Visible: false });
    }


    // FETCH ALL THE MODULES AGAINST PROJECT,uSING PROJECTID
    fetchModules = () => {
        this.setState({ showloader: true })
        this.setState({ moduleList: [] })
        this.setState({ showtask: false })
        this.setState({ showsubmodule: false });
        this.setState({ functioncall: 'submodules' });
        this.setState({ showform: false })
        this.setState({ formstyle: { display: 'none' } });
        this.setState({ projectstyle: { display: 'block' } });
        this.setState({ taskformstyle: { display: 'none' } });
        this.setState({ modulestyle: { display: 'block' } });
        this.setState({ submodulestyle: { display: 'none' } });
        this.setState({ taskstyle: { display: 'none' } });
        this.props.actions.getProjectModule(this.state.projectId).then((success) => {
            console.log(success)
            this.setState({ showloader: false })
            this.setState({ moduleList: success.result })
            /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET PROJECT FIELD VALUE DETAILS */
            this.setState({ namefieldlabel: 'Project Name' }),
                this.setState({ descriptionfieldlabel: 'Project Description' })
            this.props.form.setFieldsValue({
                ['name']: this.props.location.data.record.name1,
                ['description']: this.props.location.data.record.requirement1
            })
            /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET PROJECT FIELD VALUE DETAILS ENDS*/
        }, err => {
        });
    }

    // FETCH SUBMODULE LIST AGAINST MODULE ID
    fetchSubModules = (id) => {
        console.log(id);
        this.setState({ showloader: true })
        this.setState({ moduleList: [] })
        this.setState({ showsubmodule: true })
        this.setState({ functioncall: 'tasks' })
        this.setState({ moduleId: id });
        this.setState({ showform: true })
        this.setState({ formstyle: { display: 'block' } });
        this.setState({ projectstyle: { display: 'none' } });
        this.setState({ modulestyle: { display: 'none' } });
        this.setState({ submodulestyle: { display: 'block' } });
        this.setState({ taskstyle: { display: 'none' } });
        this.props.actions.getSubModuleList(id).then(response => {
            console.log(response)
            this.setState({ showloader: false })
            if (!response.error) {
                this.setState({ moduleList: response.result })

            }
        }, err => {

        })
    }

    // FETCH TASK LIST AGAINST SUBMODULE ID
    fetchTasks = (id) => {
        console.log(id)
        this.setState({ showloader: true })
        this.setState({ moduleList: [] })
        this.setState({ showtask: true })
        this.setState({ functioncall: 'taskdetail' })
        this.setState({ submoduleId: id })
        this.setState({ formstyle: { display: 'block' } });
        this.setState({ projectstyle: { display: 'none' } });
        this.setState({ modulestyle: { display: 'none' } });
        this.setState({ submodulestyle: { display: 'none' } });
        this.setState({ taskstyle: { display: 'block' } });
        this.props.actions.getTaskList(id).then(response => {
            console.log(response)
            this.setState({ showloader: false })
            if (!response.error) {
                this.setState({ moduleList: response.result })
            }

        })

    }

    // FUNCTION CALL FOR SUBMODULE LIST AND TASK LIST WHEN CLICKED ON LIST ITEM
    ListItemClicked = (data) => {
        console.log(data, this.state.functioncall)
        console.log(data._id);
        this.setState({ taskId: data._id });
        if (this.state.functioncall == 'submodules') {
            this.fetchSubModules(data._id);
            this.fetchModuleData(data._id)
        }
        else if (this.state.functioncall == 'tasks') {
            this.fetchTasks(data._id);
            this.fetchSubModuleData(data._id)
        }
        else if (this.state.functioncall == 'taskdetail') {
            this.setState({ formstyle: { display: 'none' } });
            this.setState({ projectstyle: { display: 'none' } });
            this.setState({ taskformstyle: { display: 'block' } });
            this.props.form.setFieldsValue({
                ['taskname']: data.name,
                ['taskdescription']: data.description,
            })

        }
    }


    // GET SUBMODULES LIST WHEN CLICKED ON UPPER TAB SUB_MODULE 
    getsubModules = () => {
        this.setState({ showtask: false });
        this.setState({ functioncall: 'submodules' });
        this.setState({ formstyle: { display: 'block' } });
        this.setState({ projectstyle: { display: 'none' } });
        this.setState({ taskformstyle: { display: 'none' } });
        this.setState({ modulestyle: { display: 'none' } });
        this.setState({ submodulestyle: { display: 'block' } });
        this.setState({ taskstyle: { display: 'none' } });
        this.fetchSubModules(this.state.moduleId);
        this.fetchModuleData(this.state.moduleId)
    }

    //GET PARTICULAR SUBMODULE INFO
    fetchSubModuleData = (id) => {
        this.props.actions.getSubModuleInfo(id).then(response => {
            console.log(response)
            if (!response.error && response.result) {
                /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET SUBMODULE FIELD VALUE DETAILS */
                this.setState({ namefieldlabel: 'Sub-Module Name' })
                this.setState({ descriptionfieldlabel: 'Sub-Module Description' })
                this.props.form.setFieldsValue({
                    ['name']: response.result.name,
                    ['description']: response.result.description,
                })
                /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET SUBMODULE FIELD VALUE DETAILS ENDS */
            }

        })
    }

    // GET PARTICULAR MODULE INFO
    fetchModuleData = (id) => {
        this.props.actions.getModuleInfo(id).then(response => {
            console.log(response)
            if (!response.error && response.result) {
                /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET MODULE FIELD VALUE DETAILS */
                this.setState({ namefieldlabel: 'Module Name' })
                this.setState({ descriptionfieldlabel: 'Module Description' })
                this.props.form.setFieldsValue({
                    ['name']: response.result.name,
                    ['description']: response.result.description,
                })
                /** CHANGE FIELD LABEL NAME DYNAMICALLY AND SET MODULE FIELD VALUE DETAILS ENDS */
            }

        })
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

    setModal2Visible = (modal2Visible) => {
        this.setState({ modal2Visible });
    }
    setModal3Visible = (modal3Visible) => {
        this.setState({ modal3Visible });
    }
    setModal4Visible = (modal4Visible) => {
        this.setState({ modal4Visible });
    }

    handleSubmitmodal = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.createModule(values);
            }

        });
    }


    handleSubmitmodal2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // this.createSubModule(values);
            }

        });
    }

    editModule = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (this.state.namefieldlabel == 'Module Name' && this.state.descriptionfieldlabel == 'Module Description') {
                if (values.name && values.description) {
                    console.log('Received values of form: ', values);
                    let data = {
                        name: values.name,
                        description: values.description,
                        projectId: this.state.projectId
                    }
                    console.log(data)
                    this.props.actions.editmodule(data, this.state.moduleId)
                }
            }

            else if (this.state.namefieldlabel == 'Sub-Module Name' && this.state.descriptionfieldlabel == 'Sub-Module Description') {
                if (values.name && values.description) {
                    let data = {
                        name: values.name,
                        description: values.description,
                        moduleId: this.state.moduleId
                    }
                    console.log(data)
                    this.props.actions.editSubModule(data, this.state.submoduleId)
                }
            }


        });

    }

    startTask = () => {

        // var d = new Date();
        // var startDate = d.toISOString();
        let data = {
            startDate: new Date().toISOString()
        }
        console.log(this.state.taskId);
        this.props.actions.taskStarted(data, this.state.taskId);
    }

    endTask = () => {
        let data = {
            endDate: new Date().toISOString()
        }
        this.props.actions.taskEnded(data, this.state.taskId);
    }
    goback = () => {
        console.log("backbutton triggered");
        if (this.state.showsubmodule && !this.state.showtask) {
            this.fetchModules();
        }
        else if (this.state.showtask && this.state.showsubmodule) {
            this.getsubModules();

        }
        else{
            this.props.history.push('../dashboard/projectlist');
        }

    }

    render() {
        const { size } = this.props;
        const state = this.state;
        const { getFieldDecorator } = this.props.form;
        const { namefieldlabel, descriptionfieldlabel, formstyle, projectstyle, taskformstyle, showloader, modulestyle, submodulestyle, taskstyle } = this.state;
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
            /* list section */

            <div className="projectManagementpanda">
                <Layout>
                    <Row>
                        <Col lg={12}>

                            <div className="wkonList sidewkonlist heightWkon">
                                <Row>
                                    <div className="listHeader">
                                        <Row>
                                            <Col lg={4}>
                                                <Button  onClick={() => { this.goback() }} type="primary"><img src={backbtn} /></Button>
                                            </Col>
                                            <Col lg={12}>
                                                <Breadcrumb className="activelink">
                                                    <Breadcrumb.Item>{this.state.projectname}</Breadcrumb.Item>
                                                    <Breadcrumb.Item className={(!this.state.showsubmodule && !this.state.showtask) ? "currentpos1" : "activelink1"} onClick={this.fetchModules}><a>Modules</a></Breadcrumb.Item>
                                                    {this.state.showsubmodule ? <Breadcrumb.Item className={this.state.showsubmodule && !this.state.showtask ? "currentpos1" : "activelink1"} onClick={this.getsubModules}><a>Sub_modules</a></Breadcrumb.Item> : ''}
                                                    {this.state.showtask ? <Breadcrumb.Item className="currentpos">Tasks</Breadcrumb.Item> : ''}
                                                </Breadcrumb>
                                            </Col>

                                            <Col lg={6}></Col>
                                            <Col lg={2}>

                                                <div className="listaddbtn">
                                                    <Dropdown overlay={<Menu>
                                                        <Menu.Item style={modulestyle} >
                                                            <a onClick={() => this.setModal2Visible(true)}> Module</a>
                                                        </Menu.Item>
                                                        <Menu.Item style={submodulestyle} >
                                                            <a onClick={() => this.setModal3Visible(true)}>Sub Module</a>
                                                        </Menu.Item>
                                                        <Menu.Item style={taskstyle} >
                                                            <a onClick={() => this.setModal4Visible(true)}>Task</a>
                                                        </Menu.Item>
                                                    </Menu>} placement="bottomCenter" trigger={['click']}>
                                                        <Button><img className="plus" src={addbtn} /></Button>
                                                    </Dropdown>
                                                </div>
                                            </Col>

                                        </Row>


                                    </div>
                                </Row>
                                <Spin spinning={showloader} indicator={antIcon} />
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.moduleList}

                                    renderItem={moduleList => (
                                        <List.Item onClick={() => { console.log('selected module detail'); this.ListItemClicked(moduleList) }} >
                                            <List.Item.Meta
                                                avatar={<Avatar src={modulesidebarlogo} />}
                                                title={<a><span onClick={console.log('module list')}>{moduleList.name}</span></a>}
                                                description={moduleList.description}

                                            // description="17 points | 7 comments | 16 hours ago by Suganth S"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>

                        {/* area for task add form start*/}
                        <Col lg={12}>
                            <div className="wkonList detailView taskaddform" style={taskformstyle}>

                                <Form onSubmit={this.handleSubmit} className="projectForm">
                                    <FormItem label="Task Name">
                                        {getFieldDecorator('taskname', { initialValue: '' }, {
                                            rules: [{ required: true, message: 'Please input your Task Name !' }],
                                        })(
                                            <Input placeholder="Enter name" />
                                            )}
                                    </FormItem>
                                    <FormItem label="Task Description">
                                        {getFieldDecorator('taskdescription', { initialValue: '' }, {
                                            rules: [{ required: true, message: 'Please input your Task Description !' }],
                                        })(
                                            <textarea placeholder="Enter Description" />
                                            )}
                                    </FormItem>
                                    <FormItem label="Status">
                                        {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select
                                                placeholder="Status"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="Statusa">Status</Option>
                                                <Option value="Status">Status</Option>
                                            </Select>
                                            )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}>
                                        {/* // {getFieldDecorator('date-picker', config)(
                                            <DatePicker />
                                        )} */}
                                        <Button onClick={this.startTask}>Start Task</Button>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}>
                                        <Button onClick={this.endTask}>End Task</Button>
                                        {/* {getFieldDecorator('date-picker', config)(
                                            <DatePicker />
                                        )} */}
                                    </FormItem>
                                    <FormItem label="Assigned To">
                                        {getFieldDecorator('assign', {
                                            rules: [{ required: true, message: 'Please select your assignee!' }],
                                        })(
                                            <Select
                                                placeholder="Assigned To"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="efgh">abcd</Option>
                                                <Option value="abcd">efgh</Option>
                                            </Select>
                                            )}
                                    </FormItem>
                                    <FormItem>
                                        <div className="savebtn modalbtn">
                                            <Button onClick={this.handleSubmitmodal}>Save</Button>
                                            <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                                        </div>
                                    </FormItem>
                                </Form>


                            </div>
                        </Col>
                        {/* area for task add form end*/}
                        {/* area for project add form start*/}
                        <Col lg={12}>
                            {/* {this.state.showInitialForm?  */}

                            <div className="wkonList detailView projectaddform" style={formstyle}>

                                <Form onSubmit={this.editModule} className="projectForm">
                                    <FormItem label={namefieldlabel}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your Task Name !' }],
                                        })(
                                            <Input placeholder="Enter name" />
                                            )}
                                    </FormItem>
                                    <FormItem label={descriptionfieldlabel}>
                                        {getFieldDecorator('description', {
                                            rules: [{ required: true, message: 'Please input your Task Description !' }],
                                        })(
                                            <textarea placeholder="Enter Description" />
                                            )}
                                    </FormItem>

                                    <FormItem>
                                        {this.state.showform ?
                                            <div className="savebtn modalbtn">
                                                <Button htmlType='submit'>Save</Button>
    
                                            </div> : ''}
                                    </FormItem>
                                </Form>


                            </div>
                            {/* :''} */}
                            <div style={projectstyle}>
                                <p className="projectaTitle">Project Name : <span className="projectaName">{this.state.projectname}</span> </p>
                                <p className="projecteTitle">Project Description : <span className="projectaNamelorem">{this.state.projectreRequirement}</span> </p>
                            </div>
                        </Col>
                        {/* area for project add form end*/}

                        {/* area for module add form start*/}
                        {/* <Col lg={12}>
                            <div className="wkonList detailView moduleaddform">

                                <Form onSubmit={this.handleSubmit} className="projectForm">
                                    <FormItem label="Module Name">
                                        {getFieldDecorator('taskname', {
                                            rules: [{ required: true, message: 'Please input your Task Name !' }],
                                        })(
                                            <Input placeholder="Enter here" />
                                        )}
                                    </FormItem>
                                    <FormItem label="Module Description">
                                        {getFieldDecorator('taskdescription', {
                                            rules: [{ required: true, message: 'Please input your Task Description !' }],
                                        })(
                                            <textarea placeholder="Enter Description" />
                                        )}
                                    </FormItem>

                                    <FormItem>
                                        <div className="savebtn modalbtn">
                                            <Button onClick={this.handleSubmitmodal}>Save</Button>
                                            <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                                        </div>
                                    </FormItem>
                                </Form>


                            </div>
                        </Col> */}
                        {/* area for module add form end*/}
                    </Row>
                    <div className="modal"><Modal
                        title="Module name"
                        wrapClassName="Module name"
                        visible={this.state.modal2Visible}
                        onOk={() => this.setModal2Visible(false)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <Form onSubmit={this.addModule}>
                            <div className="projectname">
                                <p>Name :</p>
                                <FormItem>
                                    {getFieldDecorator('modulename', {
                                        rules: [{ required: true, message: 'Please input your ProjectName!' }],
                                    })(
                                        <Input placeholder="" />
                                        )}
                                </FormItem>
                            </div>
                            <div className="projectdata">
                                <p>Details :</p>
                                <FormItem>
                                    {getFieldDecorator('moduledetails', {
                                        rules: [{ required: true, message: 'Please input your ProjectDetails!' }],
                                    })(
                                        <TextArea rows={4} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="savebtn modalbtn">
                                <Button htmlType="submit" >Save</Button>
                                <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                            </div>

                        </Form>
                        {/* <div className="savebtn modalbtn">
                            <Button type='submit' onClick={this.addModule}>Save</Button>
                            <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                        </div> */}
                    </Modal>
                    </div>


                    <div className="modal"><Modal
                        title="New Sub module"
                        wrapClassName="New Sub module"
                        visible={this.state.modal3Visible}
                        onOk={() => this.setModal3Visible(false)}
                        onCancel={() => this.setModal3Visible(false)}
                    >

                        <Form onSubmit={this.addSubModule}>
                            <div className="projectname">
                                <p>Name :</p>
                                <FormItem>
                                    {getFieldDecorator('submodulename', {
                                        rules: [{ required: true, message: 'Please input your  SubModule Name!' }],
                                    })(
                                        <Input placeholder="" />
                                        )}
                                </FormItem>
                            </div>
                            <div className="projectdata">
                                <p>Details :</p>
                                <FormItem>
                                    {getFieldDecorator('submoduledetails', {
                                        rules: [{ required: true, message: 'Please input your SubModule Details!' }],
                                    })(
                                        <TextArea rows={4} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="savebtn modalbtn">
                                <Button htmlType='submit'>Save</Button>
                                <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>

                            </div>

                        </Form>
                        {/* <div className="savebtn modalbtn">
                            <Button onClick={this.addSubModule}>Save</Button>
                            <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                        </div> */}
                    </Modal>

                    </div>
                    <div className="modal"><Modal
                        title="Task"
                        wrapClassName="Task"
                        visible={this.state.modal4Visible}
                        onOk={() => this.setModal4Visible(false)}
                        onCancel={() => this.setModal4Visible(false)}
                    >
                        <Form onSubmit={this.addTask}>
                        <div className="projectname">
                        <p>Name :</p>
                        <FormItem>
                            {getFieldDecorator('tasknames', {
                                rules: [{ required: true, message: 'Please input your  Task Name!' }],
                            })(
                                <Input placeholder="Enter task name" />
                                )}
                        </FormItem>
                    
                            </div>
                            <div className="projectdata">
                                <p>Details :</p>
                                <FormItem>
                                    {getFieldDecorator('taskdetails', {
                                        rules: [{ required: true, message: 'Please input your TaskDetails!' }],
                                    })(
                                        <TextArea rows={4} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="savebtn modalbtn">
                                <Button htmlType='submit'>Save</Button>
                                <Button className="cancelbtn" onClick={this.closeModule}>Cancel</Button>
                            </div>

                        </Form>


                    </Modal>
                    </div>

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