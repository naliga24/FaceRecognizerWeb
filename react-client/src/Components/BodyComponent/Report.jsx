import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Provider } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
let dateFormat = require('dateformat')

import login from './../Prototype/login'
import report from './../Prototype/report'

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectNo: '',
            subjectCodeName: '',
            semesterNo: '',
            semesterName: '',
            userTypeNo: '',
            userTypeName: 'ทุกประเภทผู้ใช้งาน',
            startDate: new Date(),
            startDateSTR: '',
            endDate: new Date(),
            endDateSTR: '',
            listSubject: '',
            listSemester: '',
            listUserType: '',
            flagReport: 0
        }
    }

    componentDidMount = () => {
        this.selectSemesterInfo()
        this.selectSubjectInfo()
        this.selectUserTypeInfo()
    }

    selectSemesterInfo = async () => {
        let reportObj = new report()
        let listSemester = await reportObj.callListSemester()
        listSemester.length > 0 && this.setState({ listSemester })
    }

    selectSubjectInfo = async () => {
        let reportObj = new report()
        let listSubject = await reportObj.callListSubject()
        listSubject.length > 0 && this.setState({ listSubject })
    }

    selectUserTypeInfo = async () => {
        let tmp = new report()
        let listUserType = await tmp.callListPermissionAll()
        this.setState({ listUserType })
    }

    onChange = (e) => {
        let tmp = e.target.value.split(',')
        if (e.target.name === "subjectNo") {
            this.setState({ [e.target.name]: tmp[0], subjectCodeName: tmp[1] })
        } else if (e.target.name === "semesterNo") {
            this.setState({ [e.target.name]: tmp[0], semesterName: tmp[1] })
        } else if (e.target.name === "userTypeNo") {
            this.setState({ [e.target.name]: tmp[0], userTypeName: tmp[1] })
        }
    }

    getDataReportAttendance =async () => {
        if (this.state.subjectNo && this.state.semesterNo) {
            let reportObj = new report()
           let dataReport = await reportObj.callListReportAttendance(this.state)
                if (dataReport) {
                    reportObj.displayReportAttendance(dataReport, this.state.subjectCodeName, this.state.semesterName)
                    setTimeout(() => {
                        window.open("/ShowPdfAttendance");
                    }, 3000);
                } else {
                    alertify.alert('รายงาน', 'ไม่พบรายการการเข้าชั้นเรียน', () => {
                        alertify.error('ไม่พบข้อมูล')
                    })
                }
        } else if (!this.state.subjectNo) {
            alertify.alert('โปรดระบุรหัสวิชา')
        } else if (!this.state.semesterNo) {
            alertify.alert('โปรดระบุภาคการศึกษา')
        }
        let log = new login()
        log.writeLogLogout('7')
    }

    getDataReportTransaction = async() => {
        if (this.state.startDateSTR && this.state.endDateSTR) {
            let reportObj = new report()
            let dataReport = await reportObj.callListReportTransaction(this.state)
                if (dataReport) {
                    reportObj.displayReportTransaction(dataReport, this.state.startDateSTR, this.state.endDateSTR, this.state.userTypeName)
                    setTimeout(() => {
                        window.open("/ShowPdfTransaction");
                    }, 3000);
                } else {
                    alertify.alert('รายงาน', 'ไม่พบรายการการเข้าใช้ระบบ', () => {
                        alertify.error('ไม่พบข้อมูล')
                    })
                }
        }
        let log = new login()
        log.writeLogLogout('7')
    }

    handleChange = (name, date) => {
        let change1 = {}
        change1[name] = date
        this.setState(change1);

        let change2 = {}
        change2[name + 'STR'] = dateFormat(date, "yyyy-mm-dd")
        this.setState(change2);
    }

    setDateString = () => {
        this.setState({ startDateSTR: dateFormat(this.state.startDate, "yyyy-mm-dd") });
        this.setState({ endDateSTR: dateFormat(this.state.endDate, "yyyy-mm-dd") });
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_product'><h3>รายงาน</h3></div>
                <div class='report'>
                    <div class='status'>
                        {
                            this.state.flagReport === 0 ? (
                                <div id='top'>
                                    <label id='status'>รหัสวิชา
                                        <select class="selectpicker" name="subjectNo" onChange={this.onChange}>
                                            <option hidden>เลือกข้อมูลรหัสวิชา</option>
                                            {
                                                this.state.listSubject ? this.state.listSubject.map((item, index) => (
                                                    <option value={item.SUBJECT_NO + ',' + item.SUBJECT_CODE_NAME}>{item.SUBJECT_CODE_NAME}</option>
                                                )) : (<option selected>ไม่มีข้อมูลรหัสวิชา</option>)
                                            }
                                        </select>
                                    </label>
                                    <label id='second'>ภาคการศึกษา
                                        <select class="selectpicker" name="semesterNo" onChange={this.onChange}>
                                            <option hidden>เลือกข้อมูลภาคการศึกษา</option>
                                            {
                                                this.state.listSemester ? this.state.listSemester.map((item, index) => (
                                                    <option value={item.SEMESTER_NO + ',' + item.SEMESTER_NAME} >{item.SEMESTER_NAME} {item.SEMESTER_STATUS_NO === '1' ? item.SEMESTER_STATUS_DESCRIPTION : ''}</option>
                                                )) : (<option selected>ไม่มีข้อมูลภาคการศึกษา</option>)
                                            }
                                        </select>
                                    </label>
                                    <button id='first' type="button" class="btn btn-default navbar-btn" onClick={this.getDataReportAttendance}>พิมพ์รายงาน</button>
                                </div>
                            ) : this.state.flagReport === 1 ? (
                                <div id='top'>
                                    <label>วันที่เริ่มต้น<DatePicker name="startDate" selected={this.state.startDate} onChange={(date) => this.handleChange("startDate", date)} dateFormat="yyyy/MM/dd" /></label>
                                    <label>วันที่สิ้นสุด<DatePicker name="endDate" selected={this.state.endDate} onChange={(date) => this.handleChange("endDate", date)} dateFormat="yyyy/MM/dd" /></label>
                                    <label id='status'>ประเภทผู้ใช้งานระบบ
                                        <select class="selectpicker" name="userTypeNo" onChange={this.onChange}>
                                            <option value=',ทุกประเภทผู้ใช้งาน'>เลือกทั้งหมด</option>
                                            {
                                                this.state.listUserType ? this.state.listUserType.map((item, index) => (
                                                    <option value={item.USER_TYPE_NO + ',' + item.USER_TYPE_NAME}>{item.USER_TYPE_NAME}</option>
                                                )) : (<option selected>ไม่มีประเภทผู้ใช้งานระบบ</option>)
                                            }
                                        </select>
                                    </label>
                                    <button type="button" class="btn btn-default navbar-btn" onClick={this.getDataReportTransaction}>พิมพ์รายงาน</button>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div class="table-wrapper-scroll-y">
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ลำดับที่</th>
                                    <th scope="col">ชื่อรายงาน</th>
                                    <th scope="col">ดูรายงาน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>รายงานสรุปการเข้าชั้นเรียน</td>
                                    <td onClick={() => this.setState({ flagReport: 0 })}><p data-placement="top" data-toggle="tooltip" title="SearchReport1"><button class="btn btn-info btn-xs" data-title="SearchReport1" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-search"></span></button></p></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>รายงานสรุปการเข้าใช้ระบบ</td>
                                    <td onClick={() => { this.setState({ flagReport: 1 }); this.setDateString(); }}><p data-placement="top" data-toggle="tooltip" title="SearchReport2"><button class="btn btn-info btn-xs" data-title="SearchReport2" data-toggle="modal" data-target="#search" ><span class="glyphicon glyphicon-search"></span></button></p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Report;