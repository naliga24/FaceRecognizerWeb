import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';


class ShowPdfAttendance extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    componentWillMount(){
         this.props.hide();
      }
    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
                <embed id='plugin' src='https://storage.cloud.google.com/reportfacerecognizer/ReportAttendance.pdf' />
        );
    }
}

export default ShowPdfAttendance;