import React, { Component } from 'react';
import { Modal, Button, AutoComplete, Select, Input, Form, Icon, Checkbox, Row, Col } from 'antd';
import './DashboardView.css';
import total from '../../Images/total.png';
import convert from '../../Images/convert.png';
import pipeline from '../../Images/pipeline.png';
import projecttotal from '../../Images/projecttotal.png';
import progress from '../../Images/progress.png';
import projectpipe from '../../Images/projectpipe.png';
import man from '../../Images/wkon-2-21.png';
import mantwo from '../../Images/wkon-2-22.png';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
const Option = Select.Option;

const FormItem = Form.Item;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clienttotal: {},
            clientpipeline: {},
            clientcommitted: {},
            projecttotal: {},
            projectinprogress: {},
            projectcompleted: {}
        }
    }

    componentDidMount() {
        console.log('component did mount')
        this.getdashboarddata();
        this.dashboardCustomer();

    }

    //GET DASHBOARD PROJECT COUNT  DATA
    getdashboarddata = () => {

        if (sessionStorage.getItem("id")) {
            this.props.dashboardData(sessionStorage.getItem('id')).then(response => {

                console.log('dashboardview', response)
                if (!response.error) {
                    this.startCounter(response.result.Total, 'projectTotal')
                    if (response.result.Completed)
                        this.startCounter(response.result.Completed, 'projectcompleted')

                    if (response.result.InProgess)
                        this.startCounter(response.result.InProgess, 'projectinprogress')
                }
                console.log(this.state.count);
            })
        }
        else {
            if (localStorage.getItem('id')) {
                this.props.dashboardData(localStorage.getItem('id')).then((response) => {
                    console.log('dashboardview', response);
                    if (!response.error) {
                        this.startCounter(response.result.Total, 'projectTotal')
                        if (response.result.Completed)
                            this.startCounter(response.result.Completed, 'projectcompleted')

                        if (response.result.InProgess)
                            this.startCounter(response.result.InProgess, 'projectinprogress')
                    }
                    console.log(this.state.count);
                }, err => {
                    console.log(this.state.count);
                })
            }

        }
    }
    //GET DASHBOARD CUSTOERS COUNT DATA
    dashboardCustomer = () => {
        if (sessionStorage.getItem("id")) {
            console.log('data')
            this.props.dashboardCustomer(sessionStorage.getItem('id')).then((response) => {
                console.log('customerview', response);
                if (!response.error) {
                    this.startCounter(response.result.Total, 'clientTotal')
                    if (response.result.Pipeline)
                        this.startCounter(response.result.Pipeline, 'clientpipeline')
                    if (response.result.Committed)
                        this.startCounter(response.result.Committed, 'clientcommitted')
                }
            }, err => {

            })
        }
        else if(localStorage.getItem('id')){
            this.props.dashboardCustomer(localStorage.getItem('id')).then(response => {
                console.log('data...')
                console.log('customerview', response)
                if (!response.error) {
                    this.startCounter(response.result.Total, 'clientTotal')
                    if (response.result.Pipeline)
                        this.startCounter(response.result.Pipeline, 'clientpipeline')
                    if (response.result.Committed)
                        this.startCounter(response.result.Committed, 'clientcommitted')
                }
            })
        }
    }


    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
   
    // START COUNTER FOR DASHBOARD NUMBER SHOWN
    startCounter(maxcount, type) {
        let _base = this;
        switch (type) {
            case 'clientTotal':
                let clienttotal = Object.assign({}, this.state.clienttotal)
                clienttotal.Total = 0;
                setInterval(function () {
                    if (clienttotal.Total == maxcount) {
                        clearInterval();
                    }
                    else {
                        clienttotal.Total = clienttotal.Total + 1;
                        _base.setState({ clienttotal })
                        console.log(clienttotal)

                    }
                }, 40)
                break;
            case 'clientcommitted':
                let clientcommitted = Object.assign({}, this.state.clientcommitted)

                clientcommitted.Committed = 0;
                setInterval(function () {

                    if (clientcommitted.Committed == maxcount) {
                        clearInterval();
                    }
                    else {
                        clientcommitted.Committed = clientcommitted.Committed + 1;
                        _base.setState({ clientcommitted })
                        console.log(clientcommitted)

                    }
                }, 40)
                break;
            case 'clientpipeline':
                let clientpipeline = Object.assign({}, this.state.clientpipeline)
                clientpipeline.Pipeline = 0;
                setInterval(function () {
                    if (clientpipeline.Pipeline == maxcount) {
                        clearInterval();
                    }
                    else {
                        clientpipeline.Pipeline = clientpipeline.Pipeline + 1;
                        _base.setState({ clientpipeline })
                        console.log(clientpipeline)

                    }
                }, 40)
                break;
            case 'projectinprogress':
                let projectinprogress = Object.assign({}, this.state.projectinprogress)
                projectinprogress.InProgess = 0;
                setInterval(function () {
                    if (projectinprogress.InProgess == maxcount) {
                        clearInterval();
                    }
                    else {
                        projectinprogress.InProgess = projectinprogress.InProgess + 1;
                        _base.setState({ projectinprogress })
                        console.log(projectinprogress)

                    }
                }, 40)
                break;
            case 'projectTotal':
                let projecttotal = Object.assign({}, this.state.projecttotal)
                projecttotal.Total = 0;
                setInterval(function () {
                    if (projecttotal.Total == maxcount) {
                        clearInterval();
                    }
                    else {
                        projecttotal.Total = projecttotal.Total + 1;
                        _base.setState({ projecttotal })
                        console.log(projecttotal)

                    }
                }, 40)
                break;
            case 'projectcompleted':
                let projectcompleted = Object.assign({}, this.state.projectcompleted)
                projectcompleted.Completed = 0;
                setInterval(function () {
                    if (projectcompleted.Completed == maxcount) {
                        clearInterval();
                    }
                    else {
                        projectcompleted.Completed = projectcompleted.Completed + 1;
                        _base.setState({ projectcompleted })
                        console.log(projectcompleted)

                    }
                }, 40)
                break;
            default: console.log('not used')
                break;
        }

    }

    filterClient=(data)=>{

        this.props.history.push({
            pathname: '/dashboard/clientlist',
            filterValue:data
             
             
          })
        console.log("commited");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <div className="dashboardMain">
                {/* dashboardviewcustomer */}
                <div className="dashboardView">
                    <h1 className="customer">CLIENTS</h1>
                    <Row>
                        <div className="addButton btnplace">
                            <Button onClick={() => { this.props.history.push('/dashboard/clientcreate') }}>+</Button>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={()=>{this.filterClient('All')}}>
                 
                                <p> 
                                    <img src={total} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                               
                                   
                                </p>
                                <h1 className="totalNumber">{this.state.clienttotal.Total ? this.state.clienttotal.Total : 0}</h1>
                
                            </div>
                        
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal"onClick={()=>{this.filterClient('Committed')}}>
                                <p>
                                    <img src={convert} className="totalImg" alt="Convert" /><span className="totalContent">Committed</span>
                                </p>
                                <h1 className="totalNumber">{this.state.clientcommitted.Committed ? this.state.clientcommitted.Committed : 0}</h1>
                            </div>


                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={()=>{this.filterClient('Pipeline')}}>
                                <p>
                                    <img src={pipeline} className="totalImg" alt="Pipeline" /><span className="totalContent">Pipeline</span>
                                </p>
                                <h1 className="totalNumber">{this.state.clientpipeline.Pipeline ? this.state.clientpipeline.Pipeline : 0}</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* dashboardviewcustomer */}
                {/* Project section start */}
                <div className="dashboardView">
                    <h1 className="customer">PROJECTS</h1>
                    <Row>
                        <div className="addButton btnplace">
                            <Button onClick={() => { this.props.history.push('/dashboard/newproject') }}>+</Button>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal"><NavLink to="../dashboard/projectlist" >
                                <p>
                                    <img src={projecttotal} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 className="totalNumber">{this.state.projecttotal.Total ? this.state.projecttotal.Total : 0}</h1>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={progress} className="totalImg" alt="Convert" /><span className="totalContent"> Completed</span>
                                </p>
                                <h1 className="totalNumber">{this.state.projectcompleted.Completed ? this.state.projectcompleted.Completed : 0}</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={projectpipe} className="totalImg" alt="Customer" /><span className="totalContent">InProgess</span>
                                </p>
                                <h1 className="totalNumber">{this.state.projectinprogress.InProgess ? this.state.projectinprogress.InProgess : 0}</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* Project section end */}
                {/* Recentactivity start*/}
                <div className="recentactivity">
                    <h1>RECENT ACTIVITY</h1>

                    <div className="firstman1">
                        <Row>
                            <Col lg={11} className="firstman">
                                <Row className="padng20">
                                    <Col lg={4} className="resalign">
                                        <img src={man} />
                                    </Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey R.Eshelman our recently converted customer.</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={11} className="firstman">
                                <Row>
                                    <Col lg={4} className="resalign">
                                        <img src={man} /></Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey R.Eshelman our recently converted customer.</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                        </Row>

                    </div>
                    <div className="firstman1">
                        <Row>
                            <Col lg={11} className="firstman">
                                <Row className="padng20">
                                    <Col lg={4} className="resalign">
                                        <img src={man} />
                                    </Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey R.Eshelman our recently converted customer.</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={11} className="firstman">
                                <Row>
                                    <Col lg={4} className="resalign">
                                        <img src={man} /></Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey R.Eshelman our recently converted customer.</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                        </Row>

                    </div>



                </div>
                {/* Recentactivity end*/}
                {/* payment area start*/}
                <div className="recentactivity">
                    <h1>PAYMENT</h1>

                    <div className="firstman1">
                        <Row>
                            <Col lg={11} className="firstman">
                                <Row className="padng20">
                                    <Col lg={4} className="resalign">
                                        <img src={man} />
                                    </Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey successfully paided</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={11} className="firstman">
                                <Row>
                                    <Col lg={4} className="resalign">
                                        <img src={man} /></Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey successfully paided</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                        </Row>

                    </div>
                    <div className="firstman1">
                        <Row>
                            <Col lg={11} className="firstman">
                                <Row className="padng20">
                                    <Col lg={4} className="resalign">
                                        <img src={man} />
                                    </Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey successfully paided</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={11} className="firstman">
                                <Row>
                                    <Col lg={4} className="resalign">
                                        <img src={man} /></Col>
                                    <Col lg={20}>
                                        <p>Mr. Stacey successfully paided</p></Col>

                                </Row>
                                <Row>
                                    <Col lg={22}><p className="date">09.04.2018</p></Col>
                                </Row>

                            </Col>
                        </Row>

                    </div>



                </div>
                {/* payment area end*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('dashboard view state data', state)
    // this.state.count.total=this.state.count.total+1;
    return state
}



const WrappedDashboardView = Form.create()(DashboardView);
export default connect(mapStateToProps, actioncreators)(WrappedDashboardView);
