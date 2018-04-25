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
            count: '',
            clientcount: ''


        }
    }

    componentDidMount() {
        console.log('component did mount')
        this.getdashboarddata();
        this.dashboardCustomer();

    }
    //GET DASHBOARD PROJECT COUNT  DATA
    getdashboarddata = () => {
        this.props.dashboardData(sessionStorage.getItem('id')).then(response => {
            console.log('dashboardview', response)
            if (!response.error) {
                this.setState({ count: response.result });

            }

            console.log(this.state.count);
        })
    }
    //GET DASHBOARD CUSTOERS COUNT DATA
    dashboardCustomer = () => {
        this.props.dashboardCustomer(sessionStorage.getItem('id')).then(response => {
            console.log('customerview', response)
            if (!response.error) {
                this.setState({ clientcount: response.result });
            }
        })
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
                            <div className="cusTotal" >
                                <p>
                                    <img src={total} className="totalImg" alt="Customer"  /><span className="totalContent">Total</span> 
                                    
                                   
                                </p>
                                
                                <h1 className="totalNumber">{this.state.clientcount.Total}</h1>
                                {/*<NavLink to="../dashboard/projectlist"></NavLink>*/}
                                { this.props.history.push('/dashboard/clientcreate') }
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={convert} className="totalImg" alt="Convert" /><span className="totalContent">Committed</span>
                                     {/*<NavLink to="../dashboard/projectlist" activeClassName="active"></NavLink>*/}
                                </p>
                                <h1 className="totalNumber">{this.state.clientcount.Committed ? this.state.clientcount.Committed : 0}</h1>
                            </div>


                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={pipeline} className="totalImg" alt="Pipeline" /><span className="totalContent">Pipeline</span>
                                </p>
                                <h1 className="totalNumber">{this.state.clientcount.Pipeline ? this.state.clientcount.Pipeline : 0}</h1>
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
                            <div className="cusTotal">
                                <p>
                                    <img src={projecttotal} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 className="totalNumber">{this.state.count.Total}</h1>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={progress} className="totalImg" alt="Convert" /><span className="totalContent"> Completed</span>
                                </p>
                                <h1 className="totalNumber">{this.state.count.Completed?this.state.count.Completed:0}</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={projectpipe} className="totalImg" alt="Customer" /><span className="totalContent">InProgess</span>
                                </p>
                                <h1 className="totalNumber">{this.state.count.InProgess ? this.state.count.InProgess : 0}</h1>
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
    
    return state
}
const WrappedDashboardView = Form.create()(DashboardView);
export default connect(mapStateToProps, actioncreators)(WrappedDashboardView);
