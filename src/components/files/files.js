import React, { Component } from 'react';


class Files extends Component {
    constructor(props) {
        super(props)
    }
componentDidMount(){
    console.log(this.props)
}
    render() {
        return (
            <div>
                <span>FILE UPLOAD SECTION</span>
            </div>
        );
    }
}

export default Files;