import React, { Component } from 'react';
import './ProjectTab.css';
import { Layout, Modal, Input, Menu, Row, Col, List, TimePicker, Avatar, DatePicker, Card, Form, Select, Spin, Dropdown, Button, Icon, Breadcrumb } from 'antd';
import chats from '../../Images/chats.svg';
import projct from '../../Images/projects.svg';
import upload from '../../Images/upload.svg';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { bindActionCreators } from 'redux';
const { Header, Content, Footer, Sider } = Layout;

class ProjectTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDetails: '',
            projectdata: {}
        }
    }

    componentDidMount() {
        if (this.props.location.data) {
            this.setState({ projectdata: this.props.location.data })
            this.setState({ projectName: this.props.location.data.record.name1 })
            this.setState({ projectDetails: this.props.location.data.record.requirement1 })
        }
        console.log(this.props);
    }

    // NAVIGATE TO PROJECT DETAILS PAGE
    navigateToProject = () => {
        console.log('kjghj')
        this.props.history.push({
            pathname: '/dashboard/singleproject',
            data: this.state.projectdata
        }


        )
    }

    // NAVIGATE TO PROJECT CHAT SCREEN
    navigateToChat = () => {
        this.props.actions.getWall( this.props.location.data.record._id)
        this.props.history.push({
            pathname: '../dashboard/chat',
            data: this.state.projectdata
        })
    }
    render() {

        return (
            <div className="prjcttabalign">
                <div className="projecttabWindow">
                    <Layout>
                        <div className="prjctcontent">
                            <p className="prjctnameheading">Project Name : &nbsp; <span className="prjctnm">&nbsp;{this.state.projectName}</span></p>
                            <p className="prjctdesc">Project Description : &nbsp;  <span className="prjcdtl">
                                {this.state.projectDetails}
                            </span>
</p>
                           

                        </div>
                        <Row>
                            <Col span={7} className="cardblock" onClick={this.navigateToProject}>
                                <div className="cardcontent" >
                                    <img src={projct} className="prjct" />
                                    <p className="prjcttxt">Project</p>

                                </div>


                            </Col>
                            <Col span={1} ></Col>

                            <Col span={8} className="cardblock" onClick={this.navigateToChat}>
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

const mapStateToProps = (state) => {
    // console.log(state);
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(actioncreators, dispatch)
    })
}
//export default ClientList;
export default connect(mapStateToProps, mapDispatchToProps)(ProjectTab);



