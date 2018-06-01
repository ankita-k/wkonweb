import React, { Component } from 'react';
import Avatar, { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select, notification, Spin } from 'antd';
import Waypoint from 'react-waypoint';
import './chatScreen.css';

const { TextArea } = Input;

class ChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <div>
                    {/* wall view section start */}
                    <div className="postarticlesec">
                        <div className="wallcard">
                            <div className="usercard">
                                <div className="postsec clearfix">
                                    <Row>
                                        <div>
                                            <Col span={3}>

                                                <div className="userprflimg">
                                                    {/* <img src={this.state.imageUrl} /> */}
                                                </div>
                                            </Col>
                                            <Col span={21}>
                                                <div className="usrview">
                                                    <h3>Pushpendu Ghosh</h3>
                                                    <p>Software Developer</p>
                                                </div>

                                            </Col>
                                        </div>
                                    </Row>
                                </div>
                                <div className="textSection">
                                    <Row>
                                        <Col span={24}>

                                            <TextArea rows={4} />
                                            {/* <ReactQuill ref="quill_content" id="editor-content" className="textareheadng" placeholder="Write an article here" name="content" onChange={this.postContent} /> */}

                                        </Col>
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
                                            <Col span={10}>
                                                {/* ************************ UPLOAD SECTION FOR IMAGE****************** */}
                                                <Upload className='upload-list-inline' onChange={this.imageUpload}
                                                    showUploadList={() => { this.state.showPreviewIcon }}
                                                    multiple={true} listType="picture" fileList={this.state.imageUploadList}
                                                    accept="image/*" >
                                                    <Button className="upldbtnwall">
                                                        <Icon type="upload" />Upload Image
                     </Button>
                                                </Upload>
                                                {/* ************************ UPLOAD SECTION FOR IMAGE ENDS****************** */}

                                            </Col>
                                        </div>
                                        <Col span={14}>

                                            <Button className="post" title="Post" loading={false}>Post</Button>
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="postedpartcard">
                        <div className="mitpic">
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 19 }}>
                                    <p>Pushpendu Ghosh</p>
                                    <h3>Software Developer</h3>
                                </Col>
                            </Row>

                            <div className="postedimg onlytext">
                                <img src="https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426" />
                                <p className="sub_content" contentEditable='false' dangerouslySetInnerHTML={{ __html: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).' }} ></p>
                            </div>

                        </div>
                        <div style={{ marginLeft: '3px' }}>
                            28 th July,2018
                        </div>
                    </div>

                </div>

                <div>
                    <Waypoint onEnter={() => { console.log('Waypoint visible'); }} onLeave={() => { console.log("Waypoint left"); }} />

                    <Icon type="loading" spinning={true} style={{ fontSize: 40 }} />
                </div>
            </div >
        )
    }
}

export default (ChatScreen);