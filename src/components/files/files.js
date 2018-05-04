import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import './files.css';
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
              <h1>File Upload </h1>
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
                </section>
              </div> 
            </div>
        );
    }
}

export default Files;