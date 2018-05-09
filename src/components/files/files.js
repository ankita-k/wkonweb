import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uploadfile from '../../Images/cloud.svg';

import fileicon3 from '../../Images/fileicon3.svg';
import fileicon4 from '../../Images/fileicon4.svg';
import cross from '../../Images/cross.svg';
import './files.css';
import { Card, Table, Button, Icon, Row, Input, Col, Modal, Progress } from 'antd';
class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectname: this.props.match.params.projectname,
            files: []
        }
    }
    componentDidMount() {
        console.log('files component did mount')
        console.log(this.props)
    }

    onDrop(files) {
        this.setState({
            files
        });
    }
    render() {
        return (
            <div>
                {/* <div>
                    <span>PROJECT NAME{this.state.projectname}</span>
                </div>
                <section>
                    <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
                    </div>
                    <aside>
                        <h2>Dropped files</h2>
                        <ul>
                            {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                    </aside>
                </section> */}
                <div className="uploadFile">
                    {/* <h1>File Upload </h1> */}
                    <section>
                        <div className="dropzone">
                            <Dropzone className="upload" onDrop={this.onDrop.bind(this)}>
                                <p><img className="fileIcon" src={uploadfile} /></p>
                                <h1>Drag and drop files here</h1>
                                <h1>Or</h1>
                                <Button>Browse files</Button>
                            </Dropzone>
                        </div>
                        <aside>
                            <h2>Dropped files</h2>
                            <ul>
                                {
                                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                        </aside>

                        <div className="uploadedfile">
                            <Row>
                                <Col lg={1}></Col>
                                <Col lg={2}>
                                    <div className="psd"><img src={fileicon3}/></div>

                                </Col>
                                <Col lg={21}>
                                    <div className="uploadinfo">
                                        <Row>
                                            <Col lg={12}>
                                                <h1>Design a day.Psd</h1>
                                            </Col>
                                            <Col lg={9}>
                                                <p>2.4 Mb</p>
                                            </Col>
                                            <Col lg={2}>
                                                <div>
                                                    <a className="crossbtn"><img src={cross} /></a></div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col lg={22}>
                                            <Progress percent={90} status="active" showInfo={false} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </div>
                        <div className="uploadedfile">
                            <Row>
                                <Col lg={1}></Col>
                                <Col lg={2}>
                                    <div className="psd"><img src={fileicon3}/></div>

                                </Col>
                                <Col lg={21}>
                                    <div className="uploadinfo">
                                        <Row>
                                            <Col lg={12}>
                                                <h1>a tree.Jpg</h1>
                                            </Col>
                                            <Col lg={9}>
                                                <p>247Kb</p>
                                            </Col>
                                            <Col lg={2}>
                                                <div>
                                                    <a className="crossbtn"><img src={cross} /></a></div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col lg={22}>
                                            <Progress percent={30} status="active" showInfo={false} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </div>
                        <div className="uploadedfile">
                            <Row>
                                <Col lg={1}></Col>
                                <Col lg={2}>
                                    <div className="psd"><img src={fileicon3}/></div>

                                </Col>
                                <Col lg={21}>
                                    <div className="uploadinfo">
                                        <Row>
                                            <Col lg={12}>
                                                <h1>Document.Pdf</h1>
                                            </Col>
                                            <Col lg={9}>
                                                <p>2.4 Mb</p>
                                            </Col>
                                            <Col lg={2}>
                                                <div>
                                                    <a className="crossbtn"><img src={cross} /></a></div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col lg={22}>
                                            <Progress percent={45} status="active" showInfo={false} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </div>
                        <div className="uploadedfile">
                            <Row>
                                <Col lg={1}></Col>
                                <Col lg={2}>
                                    <div className="psd"><img src={fileicon4}/></div>

                                </Col>
                                <Col lg={21}>
                                    <div className="uploadinfo">
                                        <Row>
                                            <Col lg={12}>
                                                <h1>Design a day.Psd</h1>
                                            </Col>
                                            <Col lg={9}>
                                                <p>2.4 Mb</p>
                                            </Col>
                                            <Col lg={2}>
                                                <div>
                                                    <a className="crossbtn"><img src={cross} /></a></div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col lg={22}>
                                            <Progress percent={70} showInfo={false} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Files;