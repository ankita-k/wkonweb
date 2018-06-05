import React, { Component } from 'react';
import Avatar, { Upload,message, Row, Col, Icon, Radio, Button, Modal, Select, notification,Input, Badge, Menu, Dropdown, Spin } from 'antd';
import Waypoint from 'react-waypoint';
import './chatScreen.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import proimg from '../../Images/wkon-2-21.png';
import proimgself from '../../Images/wkon-2-22.png';
import send from '../../Images/send.svg';
import dropdownn from '../../Images/morebtn.svg';
import attach from '../../Images/attachfile.svg';

const { TextArea } = Input;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a >Clients</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a>Management</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">Sales</Menu.Item>
    </Menu>
);
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class ChatScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : localStorage.getItem('id'),
            projectId: '',
            userRole: '',
            userName: '',
            textValue: ''
        }
    }

    componentDidMount() {
        console.log(this.props)
        // FETCH LOGGED USER NAME AND ROLE
        if (this.props.loggeduserDetails) {
            this.setState({ userName: this.props.loggeduserDetails.name })
            this.setState({ userRole: this.props.loggeduserDetails.role })
        }
        // FETCH WALL PAGE PREVIOUS LIST
        if (this.props.location.data) {
            this.setState({
                projectId: this.props.location.data.record._id
            }, function () {
                this.getWallData();
            });
        }
    }

    componentWillReceiveProps(props) {
        console.log(props, this.props)
    }
    // GET API CALL 
    getWallData = () => {
        this.props.actions.getWall(this.state.projectId);
    }

    getText = (e) => {
        console.log('text value', e.target.value)
        this.setState({ textValue: e.target.value })
    }
    // CREATE WALL API CALLING
    createWall = () => {
        console.log('createwwall')
        let data = {
            type: "text",
            target: ["Everyone"],
            userId: this.state.userId,
            projectId: this.state.projectId,
            text: this.state.textValue,
        }
        console.log(data)
        this.props.actions.createchat(data);
        this.setState({ textValue: '' });
    }

    render() {

        console.log('RENDERRR')
        return (
            <div>
                <div className="chatscrn">
                    <Row className="chattitle">
                        <Col lg={2}>
                            <div className="proimg">
                                <img src={proimg} />
                            </div>
                            
                        </Col>
                        <Col lg={10}>
                            <div className="frndnm">
                                <h1>Nicky Franceska</h1>
                                <p>Online &nbsp; <Badge status="success" /></p>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="actionbtns">
                                <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                                    <Button type="default" shape="circle" className="dropdownbtn"><img src={dropdownn} /></Button>
                                </Dropdown>

                            </div>
                        </Col>


                    </Row>
                    <Row className="chatrow">

                        <Col lg={2}>
                            <div className="proimg">
                                <img src={proimg} />
                            </div>
                            <p className="usernm">Nicky</p>
                            </Col>
                        <Col lg={10}>
                            <Row className="txt">
                                <div className="triangle"></div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <p className="time">10:50</p>
                            </Row>
                            <Row className="txt">
                                <div className="triangle"></div>
                                <p>Lorem Ipsum is simply dummy text</p>
                                <p className="time">10:54</p>
                            </Row>
                            <Row className="txt">
                                <div className="triangle"></div>
                                <p>It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its
                                 layout. The point of using Lorem Ipsum</p>
                                <p className="time">10:55</p>
                            </Row>
                        </Col>
                        <Col lg={2} >

                        </Col>
                    </Row>
                    <Row className="chatrowself">
                        <Col lg={2}>
                            <div className="proimg">
                                <img src={proimgself} />
                            </div>
                            <p className="usernm">Me</p>
                            </Col>
                        <Col lg={10}>
                            <Row className="txtself">
                                <div className="triangleself"></div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <p className="timeself">10:58</p>
                            </Row>
                            <Row className="txtself">
                                <div className="triangleself"></div>
                                <p>Lorem Ipsum is simply dummy text</p>
                                <p className="timeself">11:00</p>
                            </Row>

                        </Col>
                        <Col lg={2} >

                        </Col>
                    </Row>
                    <Row className="chatrow">

                        <Col lg={2}>
                            <div className="proimg">
                                <img src={proimg} />
                            </div>
                            <p className="usernm">Nicky</p>
                            </Col>
                        <Col lg={10}>
                         
                            
                            <Row className="txt">
                                <div className="triangle"></div>
                                <p>It is a long established fact that a reader will be distracted by
                                    the readable</p>
                                <p className="time">11:05</p>
                            </Row>
                        </Col>
                        <Col lg={2} >

                        </Col>
                    </Row>
{/* // CHAT FOOTER AREA */}
<Row className="chatfooterarea">
 <Col lg={2}>
 <Upload {...props}>
 <Button type="primary" shape="circle" className="attachbtn" ><Icon type="paper-clip" /></Button>
 </Upload>
 </Col>
<Col lg={20}>
<div>
{/* <Icon type="message" /> */}
    <TextArea placeholder="Type your message here.."
    autosize={{ minRows: 1, maxRows: 3 }}
     />
    
  </div>
  </Col>
  
  <Col lg={2}>
  <Button className="sendbtn" shape="circle" type="default">
  {/* <img src={send} /> */}
  <Icon type="arrow-right" />
  </Button>
  </Col>
 
</Row>


                    {/* wall view section start */}
                    {/* <div className="postarticlesec">
                        <div className="wallcard">
                            <div className="usercard">
                                <div className="postsec clearfix">
                                    <Row>
                                        <div>
                                            <Col span={3}>

                                                <div className="userprflimg"> */}
                    {/* <img src={this.state.imageUrl} /> */}
                    {/* </div>
                                            </Col>
                                            <Col span={21}>
                                                <div className="usrview">
                                                    <h3>{this.state.userName}</h3>
                                                    <p>{this.state.userRole}</p>
                                                </div>

                                            </Col>
                                        </div>
                                    </Row>
                                </div>
                                <div className="textSection">
                                    <Row>
                                        <Col span={24}>

                                            <TextArea rows={4} onChange={this.getText} /> */}
                    {/* <ReactQuill ref="quill_content" id="editor-content" className="textareheadng" placeholder="Write an article here" name="content" onChange={this.postContent} /> */}

                    {/* </Col>
                                    </Row>
                                </div>
                                <Row type="flex" justify="center">

                                    <Col span={24}>
                                        <div placeholder="Write here .." className="showpostall" >
                                        </div>

                                    </Col>
                                </Row>


                                <hr className="dividerwall" />
                                <div className="uploadimgsec">
                                    <Row >

                                        <div className="uploadalign">
                                            <Col span={10}> */}
                    {/* ************************ UPLOAD SECTION FOR IMAGE****************** */}
                    {/* <Upload className='upload-list-inline' onChange={this.imageUpload}
                                                    showUploadList={() => { this.state.showPreviewIcon }}
                                                    multiple={true} listType="picture" fileList={this.state.imageUploadList}
                                                    accept="image/*" >
                                                    <Button className="upldbtnwall">
                                                        <Icon type="upload" />Upload Image
                     </Button>
                                                </Upload> */}
                    {/* ************************ UPLOAD SECTION FOR IMAGE ENDS****************** */}

                    {/* </Col>
                                        </div>
                                        <Col span={14}>

                                            <Button onClick={this.createWall} className="post" title="Post" loading={false}>Post</Button>
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </div>

                    </div>

                    {this.props.projectWallList.map((item,index) => {
                        return(
                            <div className="postedpartcard" key={index}>
                            <div className="mitpic">
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 19 }}>
                                        <p>{item.userId.name}</p>
                                        <h3>{item.userId.role}</h3>
                                    </Col>
                                </Row>

                                <div className="postedimg onlytext"> */}
                    {/* <img src="https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426" /> */}
                    {/* <p className="sub_content">{item.text}</p>
                                </div> */}
                    {/* contentEditable='false' dangerouslySetInnerHTML={{ __html: {item.text}} */}
                    {/* </div>
                            <div style={{ marginLeft: '3px' }}>
                                {moment(item.createdDate).format('ll')}
                            </div>
                        </div> */}
                    {/* )
                       
                    })} */}

                </div>

                {/* <div>
                    <Waypoint onEnter={() => { console.log('Waypoint visible'); }} onLeave={() => { console.log("Waypoint left"); }} />

                    <Icon type="loading" spinning={true} style={{ fontSize: 40 }} />
                </div> */}

            </div >
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);