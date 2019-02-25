import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';


class ShowPdfAttendance extends Component {
    componentWillMount=()=>{
         this.props.hide();
      }
    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
                <embed id='plugin' src='https://storage.cloud.google.com/report_facerecognizer/ReportAttendance.pdf' />
        );
    }
}

export default ShowPdfAttendance;