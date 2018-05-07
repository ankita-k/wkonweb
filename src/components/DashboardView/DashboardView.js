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
import ProjectlistView from '../ProjectlistView/ProjectlistView';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Loading from 'react-loading-bar';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


const Option = Select.Option;

const FormItem = Form.Item;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class DashboardView extends Component {
    state = {
        loading: false,
        visible: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            clienttotal: {},
            clientpipeline: {},
            clientcommitted: {},
            projecttotal: {},
            projectinprogress: {},
            projectcompleted: {},
            show: true,  //loading-bar
            loading: true,
            dashboardCustomerData: {},
            dashboardProjectData: {}
        }
    }

    componentDidMount() {
        console.log('==========component did moun======t', this.props);
        // this.setState({show:true})
        // this.commonFunction();
    }

    componentWillReceiveProps(newprops) {
        this.commonFunction(newprops);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',newprops)
    }

    // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
    commonFunction(newprops) {
        /*SHOW COUNTER FOR PROJECT DASHBOARD NUMBERS*/
        if (!Object.is(newprops.dashboardProjectData, this.props.dashboardProjectData)) {
            console.log('project dashboard')
            if (newprops.dashboardProjectData.Total)
                this.startCounter(newprops.dashboardProjectData.Total, 'projectTotal')
            if (newprops.dashboardProjectData.Completed)
                this.startCounter(newprops.dashboardProjectData.Completed, 'projectcompleted')

            if (newprops.dashboardProjectData.InProgess)
                this.startCounter(newprops.dashboardProjectData.InProgess, 'projectinprogress')
        }
        /*SHOW COUNTER FOR PROJECT DASHBOARD NUMBER ENDS*/

        /*SHOW COUNTER FOR CUSTOMER DASHBOARD NUMBERS*/
        if (!Object.is(newprops.dashboardCustomerData, this.props.dashboardCustomerData)) {
            console.log('customer dashboard')
            if (newprops.dashboardCustomerData.Total)
                this.startCounter(newprops.dashboardCustomerData.Total, 'clientTotal')
            if (newprops.dashboardCustomerData.Pipeline)
                this.startCounter(newprops.dashboardCustomerData.Pipeline, 'clientpipeline')
            if (newprops.dashboardCustomerData.Committed)
                this.startCounter(newprops.dashboardCustomerData.Committed, 'clientcommitted')
        }
        /*SHOW COUNTER FOR CUSTOMER DASHBOARD NUMBERS*/

        /*HIDE FULL LOADER */
        if (newprops.fullloader == false) {
            this.setState({ show: newprops.fullloader })
        }
        /*HIDE FULL LOADER ENDS */
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
                        // console.log(clienttotal)
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
                    }
                }, 40)
                break;
            default: console.log('not used')
                break;
        }

    }

    filterClient = (data) => {

        this.props.history.push({
            pathname: '/dashboard/clientlist',
            filterValue: data


        })
        console.log("commited");
    }
    //function for project dashboard (passing data)

    filterProject = (data) => {

        this.props.history.push({
            pathname: '/dashboard/projectlist',
            filterValue: data


        })
        console.log("navigated");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, loading } = this.state;
        return (


            <div className="dashboardMain">
                {this.state.show == true ? <div className="loader">
                    <Loader className="ldr" fullPage loading />
                </div> : ""}

                <Loading
                    show={this.state.show}
                    color="red"
                    showSpinner={false}
                />
                {/* dashboardviewcustomer */}
                <div className="dashboardView">
                    <h1 className="customer">Clients</h1>
                    <Row>
                        <div className="addButton btnplace">
                            <Button onClick={() => { this.props.history.push('/dashboard/clientcreate') }}>+</Button>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterClient('All') }}>

                                <p>
                                    <img src={total} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>


                                </p>
                                <h1 className="totalNumber">{this.state.clienttotal.Total ? this.state.clienttotal.Total : 0}</h1>

                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterClient('Committed') }}>
                                <p>
                                    <img src={convert} className="totalImg" alt="Convert" /><span className="totalContent">Committed</span>
                                    {/*<NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>*/}
                                </p>
                                <h1 className="totalNumber">{this.state.clientcommitted.Committed ? this.state.clientcommitted.Committed : 0}</h1>
                            </div>


                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterClient('Pipeline') }}>
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
                    <h1 className="customer">Projects</h1>
                    <Row>
                        <div className="addButton btnplace">
                            <Button onClick={() => { this.props.history.push('/dashboard/newproject') }}>+</Button>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterProject('All') }}>
                                <p>
                                    <img src={projecttotal} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 className="totalNumber">{this.state.projecttotal.Total ? this.state.projecttotal.Total : 0}</h1>

                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterProject('Completed') }}>
                                <p>
                                    <img src={progress} className="totalImg" alt="Convert" /><span className="totalContent"> Completed</span>
                                </p>
                                <h1 className="totalNumber">{this.state.projectcompleted.Completed ? this.state.projectcompleted.Completed : 0}</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal" onClick={() => { this.filterProject('InProgess') }}>
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
                    <h1>Recent Activity</h1>

                    <div className="firstman1">
                        <Row>
                            <Col lg={7} className="firstman">
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

                            <Col lg={7} className="firstman">
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
                            <Col lg={7} className="firstman">
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
                            <Col lg={7} className="firstman">
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

                            <Col lg={7} className="firstman">
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
                            <Col lg={7} className="firstman">
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
                <div className="recentactivity recentPaymentactivity">
                    <h1>Payment</h1>

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
    return state
}

function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(actioncreators, dispatch)
    })
}

const WrappedDashboardView = Form.create()(DashboardView);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDashboardView);
