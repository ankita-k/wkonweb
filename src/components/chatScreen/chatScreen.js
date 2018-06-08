import React, { Component } from 'react';
import { Upload, message, Row, Col, Icon, Radio, Button, Modal, Select, notification, Input, Tooltip, Badge, Menu, Dropdown, Spin, Avatar } from 'antd';
import Waypoint from 'react-waypoint';
import './chatScreen.css';
import { connect } from "react-redux";
import * as actioncreators from '../../redux/action';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import io from 'socket.io-client';
import proimg from '../../Images/wkon-2-21.png';
import proimgself from '../../Images/wkon-2-22.png';
import dropdownn from '../../Images/morebtn.svg';
import attach from '../../Images/attachfile.svg';
import placeholderHuman from '../../Images/person-placeholder.jpg';
import profilePlacholder from '../../Images/profile-placeholder.png';
import projectIcon from '../../Images/projectIcon.png';
import Scroll from "react-scroll";
import * as ReactDOM from 'react-dom';
import CustomScroll from 'react-custom-scroll';
const socket = io('http://mitapi.memeinfotech.com:5088/');

const Option = Select.Option;
const { TextArea } = Input;

// const menu = (
//     <Menu>
//         <Menu.Item key="0">
//             <a >Clients</a>
//         </Menu.Item>
//         <Menu.Item key="1">
//             <a>Management</a>
//         </Menu.Item>
//         <Menu.Divider />
//         <Menu.Item key="3">Sales</Menu.Item>
//     </Menu>
// );
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
            textValue: '',
            projectName: '',
            target: [],
            messagesEnd: ''
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
            },
                this.setState({ projectName: this.props.location.data.record.name1 })
                // , function () {
                //     // this.getWallData();
                // }
            );
        }
        this.connectWallSocket();

    }

    // CONNECT SOCKET FOR Bill CREATE
    connectWallSocket = () => {
        socket.on('chatCreated', (interval) => {
            console.log('......Chat created.......', interval)

            console.log('......Chat created session.......', interval)
            this.props.actions.getWall(this.state.projectId);

        });
    }
    // componentWillReceiveProps(props) { 
    //     console.log(props, this.props)
    // }
    // GET API CALL 
    getWallData = () => {
        this.props.actions.getWall(this.state.projectId);
    }

    getText = (e) => {
        // e.preventDefault()
        // console.log('text value', e, e.target.value)
        this.setState({ textValue: e.target.value })
    }

    // GET SELECTED TARGET VALUE
    handleChange = (value) => {
        console.log(value)
        this.setState({ target: value })
    }
    // CREATE WALL API CALLING
    createWall = () => {
        console.log('createwwall')
        let data = {
            type: "text",
            target: this.state.target.length > 0 ? this.state.target : ["Everyone"],
            userId: this.state.userId,
            projectId: this.state.projectId,
            text: this.state.textValue
        }
        console.log(data)
        // .replace(/\n/g,'')
        this.props.actions.createchat(data);
        this.setState({ textValue: '' });
        console.log(Scroll.scroller)
        Scroll.scroller.scrollTo("target", { smooth: true })
        // scroll.scrollToBottom();

    }

    sendChat = (e) => {
        // console.log('evet key',e.nativeEvent.keyCode+'value of key'+e.shiftKey)
        if (e.nativeEvent.keyCode === 13 && !e.nativeEvent.shiftKey) {
            console.log('call function')
            e.preventDefault()
            this.createWall();
        }
        else if (e.nativeEvent.keyCode === 13 && e.nativeEvent.shiftKey) {
        }
    }
    scrollToBottom = () => {
        const { container } = this.refs;
        console.log(container);
        let scrollHeight = container.scrollHeight;
        console.log(scrollHeight);
        let height = container.clientHeight;
        console.log(height);
        let maxScrollTop = scrollHeight - height;
        console.log(maxScrollTop);
        ReactDOM.findDOMNode(container).scrollTop = 100;
    }

    render() {

        console.log('RENDERRR', this.props)
        const { userId, projectName } = this.state;
        return (
            <div>
                <div className="chatscrn">
                    <Row className="chattitle">
                        <Col lg={2}>
                            <div className="proimg">
                                <img src={projectIcon} />
                            </div>

                        </Col>
                        <Col lg={10}>
                            <div className="frndnm" onClick={this.scrollToBottom}>
                                <h1>{projectName}</h1>
                                {/* <p>Online &nbsp; <Badge status="success" /></p> */}
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="actionbtns">
                                {/* <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                                    <Button type="default" shape="circle" className="dropdownbtn"><img src={dropdownn} /></Button>
                                </Dropdown> */}

                                <Select mode="multiple" placeholder="Target Viewers" defaultValue="Everyone" style={{ width: 90 }} onChange={this.handleChange}>
                                    <Option value="Client">Clients</Option>
                                    <Option value="Everyone">Everyone</Option>
                                    <Option value="Sales">Sales</Option>
                                    <Option value="Developers">Developers</Option>
                                </Select>
                                {/* "q1w2e3r4"  passwor*/}

                            </div>
                        </Col>
                    </Row>
                    <Row className="blank"></Row>
                    <div ref="container" >

                        {/* <CustomScroll keepAtBottom={true} heightRelativeToParent="calc(100% - 20px)">  */}

                        {this.props.projectWallList.length > 0 ? this.props.projectWallList.map((item, index) => {
                            if (userId == item.userId._id) {
                                return (
                                    <Row className="chatrowself" key={index}>
                                        <Col lg={2}>
                                            <div className="proimg">
                                                {/* <img src={placeholderHuman} /> */}
                                                <Tooltip title={item.userId.role}>
                                                    <Avatar
                                                        style={{ backgroundColor: '#FF0000' }}
                                                        size="large" shape="circle"
                                                    >
                                                        {/* {item.userId.name} */}
                                                        {(item.userId.name).split(' ')[0].split('')[0].toUpperCase() + ((item.userId.name).split(' ')[1] ? (item.userId.name).split(' ')[1].split('')[0] : '').toUpperCase()}
                                                    </Avatar>
                                                </Tooltip>

                                            </div>
                                            <p className="usernm">{item.userId.name.length < 13 ? item.userId.name : item.userId.name.slice(0, 13)}</p>
                                        </Col>
                                        <Col lg={10}>
                                            <Row className="txtself">
                                                <div className="triangleself"></div>
                                                <pre>{item.text}</pre>
                                                <p className="timeself">{moment(item.createdDate).format('lll')}</p>
                                            </Row>

                                        </Col>
                                        <Col lg={2} >

                                        </Col>
                                    </Row>
                                )
                            }
                            else {
                                return (
                                    <Row className="chatrow" key={index}  >

                                        <Col lg={2}>
                                            <div className="proimg">
                                                {/* <img src={profilePlacholder} /> */}
                                                <Tooltip title={item.userId.role}>
                                                    <Avatar
                                                        style={{ backgroundColor: '#800000' }}
                                                        size="large" shape="circle"
                                                    >
                                                        {/* {item.userId.name} */}
                                                        {(item.userId.name).split(' ')[0].split('')[0].toUpperCase() + ((item.userId.name).split(' ')[1] ? (item.userId.name).split(' ')[1].split('')[0] : '').toUpperCase()}
                                                    </Avatar>
                                                </Tooltip>

                                            </div>
                                            <p className="usernm">{item.userId.name.length < 13 ? item.userId.name : item.userId.name.slice(0, 13)}</p>
                                        </Col>
                                        <Col lg={10}>
                                            <Row className="txt">
                                                <div className="triangle"></div>
                                                <pre>{item.text}</pre>
                                                <p className="time">{item.createdDate ? moment(item.createdDate).format('lll') : ''}</p>
                                            </Row>
                                            {/* <Row className="txt">
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
                                    </Row> */}
                                        </Col>
                                        <Col lg={2} >

                                        </Col>
                                    </Row>
                                )
                            }


                        }) :
                            <div><span>No Chat </span></div>
                        }
                        {/* </CustomScroll>  */}
                        <div name="target" ></div>

                    </div>

                    <Row className="blank"></Row>
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
                                <TextArea placeholder="Type your message here.." value={this.state.textValue} onChange={this.getText}
                                    onKeyPress={this.sendChat} autosize={{ minRows: 1, maxRows: 3 }}
                                />

                            </div>
                        </Col>

                        <Col lg={2}>
                            <Button className="sendbtn" shape="circle" type="default" onClick={this.createWall}>
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
                    {this.props.projectWallList.map((item, index) => {
                        return (
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


// "q1w2e3r4"
