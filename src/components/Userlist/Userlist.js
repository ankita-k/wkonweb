import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as actioncreators from '../../redux/action';
import { connect } from "react-redux";
import './Userlist.css';
import { Card, Table, Button, Icon, Row, Input, Col, Modal, span } from 'antd';
import user from '../../Images/wkon-2-21.png';

class Userlist extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.getUser();
        this.state = {
            userList:[]
        }
    }

    // get user list
    getUser = () => {
        this.props.userlist().then(result => {
            console.log(result);
            this.setState({userList: result.result});
            console.log(this.state.userList)
        })
    }
    render() {
        return (
            <div className="userlist">

                <h1>USER LIST</h1>
                <div className="user1">

                    <Row>
                    {this.state.userList.map((item,index) => {
          return <div key={item._id}>
                        <Col lg={11} className="firstuser">
                        
                            <Row className="btnedit">
                                <Col lg={20}></Col>
                                <Col lg={2}>
                                    <Button className="edit" >
                                        <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                {/* <Col lg={{ span: 8 }}></Col> */}
                                <Col lg={2}>
                                    <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
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
                                    <Row><p><span className="span1">Reporting Manager </span>: {item.}</p></Row></Col>
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

// const  Userlist= Form.create()(NewProject);
export default connect(mapStateToProps, actioncreators)(Userlist);
