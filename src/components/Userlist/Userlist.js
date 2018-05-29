import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as userlistActions from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './Userlist.css';
import Loading from 'react-loading-bar'

import { Card, Table, Button, Icon, Row, Input, Col, Modal, span, Menu, Dropdown } from 'antd';
import user from '../../Images/wkon-2-21.png';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
const menu = (
    <Menu>
        <Menu.Item key="0">
            <Button className="edit1" ><a href="javascript:;"><Icon type="edit" /></a></Button>
        </Menu.Item>
        <Menu.Item key="1">
            <Button className="delete" ><a href="javascript:;"><Icon type="delete" /></a></Button>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"><Button className="email1" ><a href="javascript:;"><Icon type="mail" /></a></Button></Menu.Item>
    </Menu>
);


class Userlist extends Component {
    state = {
        loading: false,
        visible: false,
        selectedId: ''
    }
    constructor(props) {
        console.log(props);
        super(props);

        this.state = {
            userList: [],
            show: true,  //loading-bar
            selectedRowKeys: [],


        }

    }

    componentDidMount() {
        console.log(this.props)
        this.setState({ show: true });
        this.commonFunction();
    }

    componentWillReceiveProps() {
        this.commonFunction();
    }

    // COMMON FUNCTION FOR PROPS FOR COMPONENT DID MOUNT AND COMPONENT WILL RECEIVE PROPS
    commonFunction() {
        /** FETCH USER LIST FROM REDUCEr */
        if (this.props.userList.length > 0) {
            this.setState({ userList: (this.props.userList) });
            this.setState({ show: false });
        }

        /*HIDE FULL LOADER */
        // if (this.props.fullloader == false) {
        //     this.setState({ show: this.props.fullloader })
        // }
        /*HIDE FULL LOADER ENDS */
    }

    //edit client
    editUser = (data) => {
        this.props.actions.menuKeys('create_user');
        this.props.history.push({
            pathname: '/dashboard/edituser',
            userData: data
        })

    }

    //delete user
    deleteUser = (id) => {
        console.log(id);
        this.setState({ show: true });
        this.props.actions.deleteUser(id, this.props.history)
    }

    //  APICALL FOR SENDING MAIL TO USER
    SendEmail = (user) => {
        console.log(user);
        let data = {
            name: user.name,
            email: user.email,
            subject: 'Please Login To Your Account'
        }
        this.props.actions.emailService(data)
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <div className="userlist">
                {this.props.fullloader == true ? <div className="loader">
                    <Loader className="ldr" fullPage loading />
                </div> : ""}

                <Loading
                    show={this.props.fullloader}
                    color="red"
                    showSpinner={false}
                />
                <h1>USER LIST</h1>
                <div className="user1">
                    <Row>
                        {this.state.userList.map((item, index) => {
                            return <div key={item._id}>
                                <Col lg={11} className="firstuser">
                                    <Row className="btnedit">
                                        {/* <Col lg={20}></Col>
                                        <Col lg={2}>
                                            <Button className="edit" onClick={() => { this.editUser(item) }}>
                                                <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                        {/* <Col lg={{ span: 8 }}></Col> */}
                                        {/* <Col lg={2}>
                                            <Button className="delete" onClick={() => { this.deleteUser(item._id) }}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                        </Col>
                                        <Col lg={2}>
                                        <Button className="email" onClick={() => { this.SendEmail(item) }}>
                             <a href="javascript:;"><Icon type="mail" /></a></Button>
                                           </Col> */}
                                        <h1 className="nametxt">{item.name}</h1>
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="#">
                                                <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </Row>
                                    <Row>
                                        <div className="extraline"></div>
                                    </Row>
                                    <Row className="padng20">
                                        <Col lg={4} className="resalign">
                                            <img src={user} />
                                        </Col>
                                        <Col lg={1}></Col>
                                        <Col lg={19}>
                                            <Col lg={24}>
                                                {/* <p><span className="span1">Name </span>:{item.name} </p> */}
                                                <p><span className="span1">Phone </span>: {item.phoneNumber}</p>
                                            </Col>
                                            <Col lg={24}>
                                                <p><span className="span1">Email</span>: {item.email}</p>
                                            </Col>
                                            <Row><p><span className="span1">Reporting Manager </span>: {item.manager ? item.manager.name : ""}</p></Row>
                                            <Row>
                                                <Col lg={12}> <p><span className="span1">Roles </span>: {item.role}</p></Col>
                                                {item.tags.length != 0 ?
                                                    <p><span className="span1">Tag:</span>{item.tags.map(((tag, index) => {
                                                        return index < item.tags.length - 1 ? tag + ',' : tag
                                                    }))} </p>
                                                    : ''
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                        })
                        }
                        <Col lg={1}></Col>
                    </Row>
                </div>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return state
}
function mapDispatchToProps(dispatch, state) {
    return ({
        actions: bindActionCreators(userlistActions, dispatch)
    })
}
// const  Userlist= Form.create()(NewProject);
export default connect(mapStateToProps, mapDispatchToProps)(Userlist)
