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
import moment from 'moment';
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

    constructor(props) {
        super(props);

        this.state = {
            projectId: '',
            moduleList: [],
            subModuleList: [],
            moduleId: '',       //save modueid
            submoduleId: '',     //save submoduleid
            taskId: '',          //save taskid
            members: [],
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
            showloader: true,
            Status: '',
            taskMatch: '',                                // HIDE-SHOW LOADER
            assignToEmpty: {},
            assignMemberId: '',
            loginId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            showselect: { display: "block" },
            endTaskStyle: { display: "block" },
            startTaskStyle: { display: "block" },
            addStyle: { display: "block" },
            saveStyle: { display: "block" },
            disableSelect: false,
            developer: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.location.data) {
            let memberarray = [];
            memberarray = this.props.location.data.record.members.filter(element => { return element.role == "Consultant1" || element.role == "Consultant2" || element.role == "Consultant3" || element.role == "Consultant4"|| element.role=="VerticalLead" });
         console.log(memberarray);
            this.setState({ members: memberarray });
            this.setState({ projectname: this.props.location.data.record.name1 })
            this.setState({ projectreRequirement: this.props.location.data.record.requirement1 });

            this.setState({
                projectId: this.props.location.data.record._id
            }, function () {
                this.fetchModules();
            });
        }

        /**GET ROLE OF LOGGED USER  AND SHOW SELECT ASIGNESS DROPDOWN ONLY TO VERTICAL HEAD*/
        if (Object.keys(this.props.loggeduserDetails).length != 0) {
            if (this.props.loggeduserDetails.tags.indexOf("VerticalLead") > -1) {
                this.setState({ showselect: { display: 'block' } })
                this.setState({ addStyle: { display: 'block' } })
                this.setState({ saveStyle: { display: 'block' } })
            }
            else {
                this.setState({ showselect: { display: 'none' } })
                this.setState({ addStyle: { display: 'none' } })
                this.setState({ saveStyle: { display: 'none' } })
            }
        }
        /**GET ROLE OF LOGGED USER  AND SHOW SELECT ASIGNESS DROPDOWN ONLY TO VERTICAL HEAD* ENDS**/

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
                this.props.actions.addModule(data).
                then(response => {
                    console.log(response)
                    if (!response.error) {
                        this.fetchModules();
                    }
                })

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
                this.props.actions.addSubModule(data).then(response => {
                    console.log(response)
                    if (!response.error) {
                        this.fetchSubModules(this.state.moduleId)
                    }
                })
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
                let data = {
                    name: values.tasknames,
                    description: values.taskdetails,
                    submoduleId: this.state.submoduleId,
                    date: moment()._d.toISOString(),
                    status:'New'
                }
                console.log(data);
                this.props.actions.addTask(data).then(response=>{
                    console.log(response)
                    if(!response.error){
                        this.fetchTasks(this.state.submoduleId);
                    }
                })
               
                this.props.form.setFieldsValue({
                    ['tasknames']: '',
                    ['taskdetails']: '',
                })
                this.setState({ modal4Visible: false });
            }
        })
    }
    //*********ADD TASK ENDS********

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
        console.log(data);

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
            this.setState({ disableSelect: false });
            this.setState({ developer: false })
            this.gettaskInfo(data);


        }

    }

    // GET TASK INFO
    gettaskInfo = (data) => {
        this.setState({ formstyle: { display: 'none' } });
        this.setState({ projectstyle: { display: 'none' } });
        this.setState({ taskformstyle: { display: 'block' } });
        this.setState({ Status: data.status });
        this.props.form.setFieldsValue({
            ['taskname']: data.name,
            ['taskdescription']: data.description,
            ['assign']: data.assignTo.length != 0 ? data.assignTo[0].userId.name : ''
        })
        if (data.assignTo.length != 0) {
            this.setState({ disableSelect: true });
            this.setState({ developer: true })
        }


        if (this.props.loggeduserDetails.tags.indexOf("VerticalLead") > -1) {
            this.setState({ showselect: { display: 'block' } })
        }
        // else {
            let arr = []
            arr = data.assignTo.filter(element => { return element.userId != null && element.userId._id == this.state.loginId });
            console.log(arr)

            if (arr.length != 0) {
                // this.setState({ endTaskStyle: { display: 'block' } })
                // this.setState({ endTaskStyle: { display: 'block' } })
                if (data.status && data.status == 'New') {
                    this.setState({ endTaskStyle: { display: 'none' } })
                    this.setState({ startTaskStyle: { display: 'block' } })
                }
                else if (data.status && data.status == 'InProgress') {
                    this.setState({ startTaskStyle: { display: 'none' } })
                    this.setState({ endTaskStyle: { display: 'block' } })
                }
                else if (data.status && data.status == 'Completed') {
                    this.setState({ endTaskStyle: { display: 'none' } })
                    this.setState({ startTaskStyle: { display: 'none' } })
                }
            }
else{
    this.setState({ endTaskStyle: { display: 'none' } })
        this.setState({ startTaskStyle: { display: 'none' } })
}
        // }

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


    // GET TASK DETAIL
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



    edit_Module_Submodule = (e) => {
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
        let data = {
            startDate: moment()._d.toISOString(),
            date: moment()._d.toISOString(),
            status: 'InProgress',
            submoduleId:this.state.submoduleId
        }
        this.props.actions.UpdateTask(data, this.state.taskId).then(response => {
            console.log(response)
            if (!response.error) {
                this.setState({ startTaskStyle: { display: 'none' } })
                this.setState({ endTaskStyle: { display: 'block' } })
                this.setState({ Status: response.result.status });
            }

        })

    }

    endTask = () => {
        let data = {
            endDate: moment()._d.toISOString(),
            date: moment()._d.toISOString(),
            status: 'Completed',
            submoduleId:this.state.submoduleId
        }
        this.props.actions.UpdateTask(data, this.state.taskId)
            .then(response => {
                console.log(response)
                this.setState({ showloader: false })
                if (!response.error) {
                    this.setState({ startTaskStyle: { display: 'none' } })
                    this.setState({ endTaskStyle: { display: 'none' } })
                    this.setState({ Status: response.result.status });
                }
            }, err => {

            })


    }
    goback = () => {
        console.log("backbutton triggered");
        if (this.state.showsubmodule && !this.state.showtask) {
            this.fetchModules();
        }
        else if (this.state.showtask && this.state.showsubmodule) {
            this.getsubModules();
        }
        else {
            this.props.history.push('../dashboard/projectlist');
        }
    }

    // SELECT MEMBER TO BE ASSIGNED TO TASK
    selectMember = (value) => {
        console.log(value);
        this.setState({ assignMemberId: value }, function () {
            console.log(this.state.assignMemberId)
        })
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });

    }


    editTask = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (values.taskname && values.taskdescription) {
                console.log('Received values of form: ', values);
                if (this.state.developer) {
                    let data = {
                        name: values.taskname,
                        description: values.taskdescription,
                        submoduleId: this.state.submoduleId
                    }
                    console.log(data)
                    console.log('fffffffffffff only and update')
                    this.props.actions.UpdateTask(data, this.state.taskId, this.state.submoduleId).then(response => {
                        console.log(response)
                        if (!response.error) {
                            this.props.actions.getTaskList(this.state.submoduleId).then(result => {
                                console.log(result)
                                if (!result.error && result.result.length != 0) {
                                    this.setState({ moduleList: result.result })
                                }
                            })
                        }
                    })
                }
                else {
                    let editdata = {
                        name: values.taskname,
                        description: values.taskdescription,
                        submoduleId: this.state.submoduleId
                    }
                    if (values.assign) {
                        var devdata = {
                            userId: values.assign
                        }
                        console.log('fffffffffffff assign and update')
                        this.props.actions.assignDevelopersandUpdate(devdata, editdata, this.state.taskId)
                            .then(response => {
                                console.log(response)
                                if (!response.error) {
                                    this.props.actions.getTaskList(this.state.submoduleId).then(result => {
                                        console.log(result)
                                        if (!result.error && result.result.length != 0) {
                                            this.setState({ moduleList: result.result })
                                        }
                                    })
                                }
                            })
                    }
                    else {
                        console.log('fffffffffffff only update')
                        this.props.actions.UpdateTask(editdata, this.state.taskId, this.state.submoduleId).then(response => {
                            console.log(response)
                            if (!response.error) {
                                this.props.actions.getTaskList(this.state.submoduleId).then(result => {
                                    console.log(result)
                                    if (!result.error && result.result.length != 0) {
                                        this.setState({ moduleList: result.result })
                                    }
                                })
                            }
                        })
                    }


                }

            }
        })
    }
    render() {
        const { size } = this.props;
        const state = this.state;
        const { getFieldDecorator } = this.props.form;
        const { disableSelect, namefieldlabel, descriptionfieldlabel, formstyle, projectstyle, taskformstyle, showloader, modulestyle,
            submodulestyle, taskstyle, showselect, endTaskStyle, startTaskStyle, addStyle, saveStyle } = this.state;
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
                                                <Button onClick={() => { this.goback() }} type="primary"><img src={backbtn} /></Button>
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
                                                    </Menu>}
                                                        placement="bottomCenter" trigger={['click']}>
                                                        {/* <span>hghfg</span> */}
                                                        <Button style={addStyle}><img className="plus" src={addbtn} /></Button>
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

                                <Form onSubmit={this.editTask} className="projectForm">
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
                                        {/* {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: 'Please select your status!' }],
                                        })(
                                            <Select
                                                placeholder="Status"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="Statusa">Status</Option>
                                                <Option value="Status">Status</Option>
                                            </Select>
                                        )} */}
                                        <p>{this.state.Status}</p>
                                    </FormItem>

                                    <FormItem className="taskbtn" style={startTaskStyle}
                                        {...formItemLayout}>
                                        {/* // {getFieldDecorator('date-picker', config)(
                                            <DatePicker />
                                        )} */}
                                        <Button className="task" onClick={this.startTask}>Start Task</Button>

                                    </FormItem>
                                    <FormItem style={endTaskStyle}
                                        {...formItemLayout}>
                                        <Button className="taskPicker" onClick={this.endTask}>End Task</Button>
                                        {/* {getFieldDecorator('date-picker', config)(
                                            <DatePicker />
                                        )} */}
                                    </FormItem>
                                    <FormItem label="Assigned To" style={showselect}>
                                        {getFieldDecorator('assign', {
                                            rules: [{ required: false, message: 'Please select your assignee!' }],
                                        })(

                                            <Select
                                                placeholder="Assigned To"
                                                onChange={this.selectMember}
                                                disabled={disableSelect}

                                            >
                                                {this.state.members.map((item, index) => {
                                                    return <Option key={index} value={item.userId._id}>{item.userId.name}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <div style={saveStyle} className="savebtn modalbtn">
                                            <Button htmlType="submit">Save</Button>

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

                                <Form onSubmit={this.edit_Module_Submodule} className="projectForm">
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
                                            <div style={saveStyle} className="savebtn modalbtn">
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