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
const Option = Select.Option;

const FormItem = Form.Item;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class DashboardView extends Component {
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
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <div className="dashboardMain">
                {/* dashboardviewcustomer */}
                <div className="dashboardView">
                    <h1 className="customer">CUSTOMERS</h1>
                    <Row>
                        <div className="addButton">
                            <Button onClick={this.showModal}>+</Button>

                            <Modal
                                title="Add New Customer"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                className="modalcustom">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                <div className="inputModal">
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('email', {
                                                    rules: [{ required: true, message: 'Please input your Email!' }],
                                                })(
                                                    <Input placeholder="Email" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('phone', {
                                                    rules: [{ required: true, message: 'Please input your Phone No.!' }],
                                                })(
                                                    <Input placeholder="Phone No." />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(
                                                    <Input placeholder="Name" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('domain', {
                                                    rules: [{ required: true, message: 'Please input your Domain!' }],
                                                })(
                                                    <Input placeholder="Domain" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('country', {
                                                    rules: [{ required: true, message: 'Please input your Country!' }],
                                                })(
                                                    <Input placeholder="Country" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('status', {
                                                    rules: [{ required: true, message: 'Please select your status!' }],
                                                })(
                                                    <Select className="statuspipeline"
                                                        placeholder="Status"
                                                        onChange={this.handleSelectChange}
                                                    >
                                                        <Option value="Interested">Interested</Option>
                                                        <Option value="Pipeline">Pipeline</Option>
                                                        <Option value="Committed">Committed</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    </div>
                                    <FormItem>
                                        <div className="savebutton">
                                            <Button htmlType="submit" className="modalbuttonSave login-form-button">Submit</Button>
                                        </div>
                                    </FormItem>
                                  
                                </Form>
                            </Modal>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={total} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 className="totalNumber">1833</h1>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={convert} className="totalImg" alt="Convert" /><span className="totalContent">Converted</span>
                                </p>
                                <h1 className="totalNumber">1000</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={pipeline} className="totalImg" alt="Pipeline" /><span className="totalContent">Pipeline</span>
                                </p>
                                <h1 className="totalNumber">500</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* dashboardviewcustomer */}
                {/* Project section start */}
                <div className="dashboardView">
                    <h1 className="customer">PROJECTS</h1>
                    <Row>
                        {/* <div className="addButton">
                            <Button onClick={this.showModal}>+</Button>

                            <Modal
                                title="New Project"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                className="modalcustom">
                                <p><Input placeholder="Project Name" /></p>
                                <p><Input placeholder="Project Description" /></p>
                                <Row>
                                    <div className="savebutton">
                                        <Button className="modalbuttonSave" loading={this.state.iconLoading} onClick={this.IndividualSubscription}>Save</Button>
                                    </div>
                                </Row>
                            </Modal>
                        </div> */}
                        
                    </Row>
                     {/* <Row>
                        <div className="addButton">
                            <Button onClick={this.showModal}>+</Button>

                            <Modal
                                title="New Project"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                className="modalcustom">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                <div className="inputModal">
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('Name', {
                                                    rules: [{ required: true, message: 'Please input your Name!' }],
                                                })(
                                                    <Input placeholder="Name" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('requirement', {
                                                    rules: [{ required: true, message: 'Please input your Requirement!' }],
                                                })(
                                                    <Input placeholder="Brief Requirement" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                        <FormItem>
                                                {getFieldDecorator('status', {
                                                    rules: [{ required: true, message: 'Please select your status!' }],
                                                })(
                                                    <Select className="statuspipeline"
                                                        placeholder="Status"
                                                        onChange={this.handleSelectChange}
                                                    >
                                                        <Option value="Interested">Interested</Option>
                                                        <Option value="Pipeline">Pipeline</Option>
                                                        <Option value="Committed">Committed</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('technology', {
                                                    rules: [{ required: true, message: 'Please input your Technology!' }],
                                                })(
                                                    <Input placeholder="Technology" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <FormItem>
                                                {getFieldDecorator('start', {
                                                    rules: [{ required: true, message: 'Please input !' }],
                                                })(
                                                    <Input placeholder="Expected Start Date" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                        <FormItem>
                                                {getFieldDecorator('actual', {
                                                    rules: [{ required: true, message: 'Please input !' }],
                                                })(
                                                    <Input placeholder="Actual Start Date" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    </div>
                                    <FormItem>
                                        <div className="savebutton">
                                            <Button htmlType="submit" className="modalbuttonSave login-form-button">Log in</Button>
                                        </div>
                                    </FormItem>
                                  
                                </Form>
                            </Modal>
                        </div>
                    </Row> */}
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={projecttotal} className="totalImg" alt="Customer" /><span className="totalContent">Total</span>
                                </p>
                                <h1 className="totalNumber">300</h1>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={progress} className="totalImg" alt="Convert" /><span className="totalContent">In Progress</span>
                                </p>
                                <h1 className="totalNumber">250</h1>
                            </div>

                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <div className="cusTotal">
                                <p>
                                    <img src={projectpipe} className="totalImg" alt="Customer" /><span className="totalContent">Pipeline</span>
                                </p>
                                <h1 className="totalNumber">200</h1>
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
const WrappedDashboardView = Form.create()(DashboardView);
export default WrappedDashboardView;
