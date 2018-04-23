import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Userlist.css';
import { Card, Table, Button, Icon, Row, Input, Col, Modal, span } from 'antd';
import user from '../../Images/wkon-2-22.png';
import usertwo from '../../Images/wkon-2-21.png';

class Userlist extends Component {


    render() {
        return (
            <div className="userlist">

                <h1>USER LIST</h1>

                <div className="user1">

                    <Row>
                        <Col lg={11} className="firstuser">
                        
                            <Row className="btnedit">
                           
                                <Col lg={20}></Col>
                                <Col lg={4}>
                                <div className="btndltedt">
                                <Row>
                                    <Col lg={12}>
                                        <Button className="edit" >
                                            <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                    {/* <Col lg={{ span: 8 }}></Col> */}
                                    <Col lg={12}>
                                        <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                    </Col>
                                    </Row>
                                    </div>
                                    </Col>
                            </Row>
                          
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
                        
                            <Row className="btnedit">
                           
                                <Col lg={20}></Col>
                                <Col lg={4}>
                                <div className="btndltedt">
                                <Row>
                                    <Col lg={12}>
                                        <Button className="edit" >
                                            <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                    {/* <Col lg={{ span: 8 }}></Col> */}
                                    <Col lg={12}>
                                        <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                    </Col>
                                    </Row>
                                    </div>
                                    </Col>
                            </Row>
                          
                            <Row className="padng20">
                                <Col lg={4} className="resalign">
                                    <img src={usertwo} />
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

                </div>
                <div className="user1">

                    <Row>
                        <Col lg={11} className="firstuser">
                        
                            <Row className="btnedit">
                           
                                <Col lg={20}></Col>
                                <Col lg={4}>
                                <div className="btndltedt">
                                <Row>
                                    <Col lg={12}>
                                        <Button className="edit" >
                                            <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                    {/* <Col lg={{ span: 8 }}></Col> */}
                                    <Col lg={12}>
                                        <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                    </Col>
                                    </Row>
                                    </div>
                                    </Col>
                            </Row>
                          
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
                        
                            <Row className="btnedit">
                           
                                <Col lg={20}></Col>
                                <Col lg={4}>
                                <div className="btndltedt">
                                <Row>
                                    <Col lg={12}>
                                        <Button className="edit" >
                                            <a href="javascript:;"><Icon type="edit" /></a></Button></Col>
                                    {/* <Col lg={{ span: 8 }}></Col> */}
                                    <Col lg={12}>
                                        <Button className="delete" onClick={this.showModal}><a href="javascript:;"><Icon type="delete" /></a></Button>
                                    </Col>
                                    </Row>
                                    </div>
                                    </Col>
                            </Row>
                          
                            <Row className="padng20">
                                <Col lg={4} className="resalign">
                                    <img src={usertwo} />
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

                </div>
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

export default Userlist;
