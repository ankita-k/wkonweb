import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as userlistActions from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './Userlist.css';
import Loading from 'react-loading-bar'

import { Card, Table, Button, Icon, Row, Input, Col, Modal, span } from 'antd';
import user from '../../Images/wkon-2-21.png';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';

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
        console.log(data);
        this.props.history.push({
            pathname: '/dashboard/edituser',
            userData: data
        })

    }

    //delete user
    deleteUser = (id) => {
        console.log(id);
        this.setState({ show: true });
        this.props.deleteUser(id).then(response => {
            console.log(response);
            this.setState({ show: false });
            this.setState({ visible: false })
            if (!response.error) {
                this.props.opentoast('success', 'User Deleted Successfully!');
                this.getUser();
            }
            else {
                this.props.opentoast('warning', response.messsage);
            }
        }, err => {
            this.setState({ show: false });
            this.props.opentoast('success', 'User Not  Deleted Successfully!');
        })
    }

    render() {
        const { visible, loading } = this.state;
        return (
            <div className="userlist">
                {this.state.show == true ? <div className="loader">
                    <Loader className="ldr" fullPage loading />
                </div> : ""}
                <Loading
                    show={this.state.show}
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
                                        <Col lg={20}></Col>
                                        <Col lg={2}>
                                            <Button className="edit" onClick={() => { this.editUser(item) }}>
                                                <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                        {/* <Col lg={{ span: 8 }}></Col> */}
                                        <Col lg={2}>
                                            <Button className="delete" onClick={() => { this.deleteUser(item._id) }}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                        </Col>

                                    </Row>
                                    <Row className="padng20">
                                        <Col lg={4} className="resalign">
                                            <img src={user} />
                                        </Col>
                                        <Col lg={1}></Col>
                                        <Col lg={19}>
                                            <Col lg={12}>
                                                <p><span className="span1">Name </span>:{item.name} </p>

                                                <p><span className="span1">Phone </span>: {item.phoneNumber}</p>

                                            </Col>
                                            <Col lg={12}>

                                                <p><span className="span1">Email</span>: {item.email}</p>

                                                <p><span className="span1">Roles </span>: {item.role}</p>
                                            </Col>
                                            <Row><p><span className="span1">Reporting Manager </span>: {item.manager ? item.manager.name : ""}</p></Row>
                                            <Row>
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
                        {/* <Col lg={11} className="firstuser">
                            <Row className="padng20">
                                <Col lg={4} className="resalign">
                                    <img src={user} />
                                </Col>
                                <Col lg={1}></Col>
                                <Col lg={19}>
                                    <Col lg={12}>
                                        <p><span className="span1">Name </span>: jhon</p>

                                        <p><span className="span1">Phone </span>: 123456789</p>

                                    </Col>
                                    <Col lg={12}>

                                        <p><span className="span1">Email</span>: jhon@mail.com</p>

                                        <p><span className="span1">Roles </span>: Sales</p>
                                    </Col>
                                    <Row><p><span className="span1">Reporting Manager </span>: Pushpendu</p></Row></Col>
                            </Row>


                        </Col> */}

                    </Row>

                </div>
                {/* <div className="user1">
                    <Row>
                        <Col lg={11} className="firstuser">
                            <Row className="padng20">
                                <Col lg={4} className="resalign">
                                    <img src={user} />
                                </Col>
                                <Col lg={1}></Col>
                                <Col lg={19}>
                                    <Col lg={12}>
                                        <p><span className="span1">Name </span>: jhon</p>

                                        <p><span className="span1">Phone </span>: 123456789</p>

                                    </Col>
                                    <Col lg={12}>

                                        <p><span className="span1">Email</span>: jhon@mail.com</p>

                                        <p><span className="span1">Roles </span>: Sales</p>
                                    </Col>
                                    <Row><p><span className="span1">Reporting Manager </span>: Pushpendu</p></Row></Col>
                            </Row>


                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={11} className="firstuser">
                            <Row className="padng20">
                                <Col lg={4} className="resalign">
                                    <img src={user} />
                                </Col>
                                <Col lg={1}></Col>
                                <Col lg={19}>
                                    <Col lg={12}>
                                        <p><span className="span1">Name </span>: jhon</p>

                                        <p><span className="span1">Phone </span>: 123456789</p>

                                    </Col>
                                    <Col lg={12}>

                                        <p><span className="span1">Email</span>: jhon@mail.com</p>

                                        <p><span className="span1">Roles </span>: Sales</p>
                                    </Col>
                                    <Row><p><span className="span1">Reporting Manager </span>: Pushpendu</p></Row></Col>
                            </Row>


                        </Col>
                    </Row>

                </div> */}

                {/* <Col lg={12}>
<Row>
<Col lg={8}>
<img src={user}/>
</Col>
<Col lg={12}>
<p>Name : Jhon</p>
</Col>
</Row>


</Col>
<Col lg={12}></Col> */}


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
