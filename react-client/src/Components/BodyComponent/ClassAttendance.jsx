import { Map } from 'immutable'

import { Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import classAttendance from './../Prototype/classAttendance';
import login from './../Prototype/login';

const imagenotfound = require('./../../../../server/image_assets/notfound(280&280).gif')

class ClassAttendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showClassAttendanceCode: this.props.location.classAttendanceCode,
            showClassAttendanceDate: this.props.location.classAttendanceDate,
            showClassAttendanceTime: this.props.location.classAttendanceTime,
            showClassAttendanceLat: this.props.location.classAttendanceLat,
            showClassAttendanceLng: this.props.location.classAttendanceLng,
            showClassAttendanceImage: this.props.location.classAttendanceImage,
            showClassAttendanceStudentKeyCodeName: this.props.location.classAttendanceStudentKeyCodeName,
            showStudentImage: this.props.location.studentImage,
            showStudentCodeName: this.props.location.studentCodeName,
            showStudentFirstName: this.props.location.studentFirstName,
            showStudentLastName: this.props.location.studentLastName,
            showUseStatusDescription: this.props.location.useStatusDescription,
            showSubjectCodeName: this.props.location.subjectCodeName,
            showTeacherFirstName: this.props.location.teacherFirstName,
            showTeacherLastName: this.props.location.teacherLastName,
            showSemesterName: this.props.location.semesterName,
            showSemesterStatusDescription: this.props.location.semesterStatusDescription,
            showConfirmStatusDescription: this.props.location.confirmStatusDescription,
            studentImageFromKeyCodeName: '',
            studentNo: this.props.location.studentNo, //update
            studentNoFromClassAttendanceStudentKeyCodeName: '',//update
            studentNoFromSearch: '',//update
            confirmStatusNo: '',//update
                studentCodeName: '',//search
                studentFirstName: '',//search
                studentLastName: '',//search
                studentStatus: '',//search    
            flagEdit: this.props.location.flagEdit,
            flagConfirm: this.props.location.flagConfirm,
        };
    }

    componentWillMount = () => {
        this.getStudentNoByClassAttendanceStudentKeyCodeName()
    }

    searchStudent = async () => {
        try {
            let classAttendanceObj = new classAttendance()
            let dataListStudent = await classAttendanceObj.callListSearchStudent(this.state)
            this.setState({ dataListStudent })
            this.state.dataListStudent.length === 0 && alertify.alert('ไม่พบข้อมูลนักศึกษาที่ค้นหา')
        } catch (err) {
            alertify.alert('ค้นหาการเข้าชั้นเรียน', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            let log = new login()
            log.writeLogLogout('10')
        }
    }

    getStudentNoByClassAttendanceStudentKeyCodeName = async () => {
        try {
            let classAttendanceObj = new classAttendance()
            let studentNoFromClassAttendanceStudentKeyCodeName = await classAttendanceObj.callGetStudentNoByClassAttendanceStudentKeyCodeName(this.state.showClassAttendanceStudentKeyCodeName)
            studentNoFromClassAttendanceStudentKeyCodeName && this.setState({
                studentNoFromClassAttendanceStudentKeyCodeName: studentNoFromClassAttendanceStudentKeyCodeName.STUDENT_NO,
                studentImageFromKeyCodeName: studentNoFromClassAttendanceStudentKeyCodeName.STUDENT_IMAGE
            })
        } catch (err) {
            console.log(err)
        }
    }

    saveClassAttendance = async (studentNo, confirmStatusNo) => {
        try {
            this.setState({ confirmStatusNo })
            let classAttendanceObj = new classAttendance()
            let updateClassAttendanceFlag = await classAttendanceObj.updateClassAttendance(studentNo, confirmStatusNo, this.state.showClassAttendanceCode)
            if (this.state.flagConfirm) {
                if (updateClassAttendanceFlag === '1') {
                    alertify.alert('ยืนยันการเข้าชั้นเรียนเรียบร้อย')
                }
                else if (updateClassAttendanceFlag === '0') {
                    alertify.alert('ไม่สามารถยืนยันการเข้าชั้นเรียนได้(เกิดข้อผิดพลาด)')
                }
            } else if (this.state.flagEdit) {
                if (updateClassAttendanceFlag === '1') {
                    alertify.alert('แก้ไขการยืนยันการเข้าชั้นเรียนเรียบร้อย')
                }
                else if (updateClassAttendanceFlag === '0') {
                    alertify.alert('ไม่สามารถแก้ไขการยืนยันการเข้าชั้นเรียนได้(เกิดข้อผิดพลาด)')
                }
            }
            this.gotoClassAttendanceSearch()
        } catch (err) {
            alertify.alert('การเข้าชั้นเรียน', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            let log = new login()
            log.writeLogLogout('10')
        }
    }

    clear = () => {
        this.setState({ state: null })
    }

    gotoClassAttendanceSearch = () => {
        this.props.history.push('/ClassAttendanceSearch');
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_configuration'><h3 onClick={this.gotoClassAttendanceSearch}><span class="glyphicon glyphicon-backward" aria-hidden="true"> ย้อนกลับ</span> การแก้ไขข้อมูล > การเข้าชั้นเรียนนักศึกษา</h3></div>
                <div class='classattendance'>
                    <div class='status'>
                        <div class='top'>
                            <label id='label'>รหัสการเข้าชั้นเรียน<input value={this.state.showClassAttendanceCode} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label>
                            <label id='label1'>วันที่เข้าเรียน<input value={this.state.showClassAttendanceDate} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label>
                            <label id='label2'>เวลาเข้าเรียน<input value={this.state.showClassAttendanceTime} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label3'>ลาทิจูด<input value={this.state.showClassAttendanceLat} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label4'>ลองทิจูด<input value={this.state.showClassAttendanceLng} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label5'>แผนที่
                            <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/search/?api=1&query=" + this.state.showClassAttendanceLat + ',' + this.state.showClassAttendanceLng}>{"https://www.google.com/maps/search/"}</a></label>
                        </div>
                        <div class='middle'>
                            <label id='label'>รหัสนักศึกษา<input value={this.state.showStudentCodeName} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label1'>ชื่อนักศึกษา<input value={this.state.showStudentFirstName + ' ' + this.state.showStudentLastName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label2'>สถานะนักศึกษา<input value={this.state.showUseStatusDescription} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label3'>รหัสวิชา<input value={this.state.showSubjectCodeName} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label4'>อาจารย์ผู้สอน<input value={this.state.showTeacherFirstName + ' ' + this.state.showTeacherLastName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                        </div>
                        <div class='bottom'>
                            <label id='label'>ภาคการศึกษา<input value={this.state.showSemesterName} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label1'>สถานะภาคการศึกษา<input value={this.state.showSemesterStatusDescription} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label2'>รหัสการกรอกของนักศึกษา<input value={this.state.showClassAttendanceStudentKeyCodeName} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                            <label id='label3'>สถานะการเข้าชั้นเรียน<input value={this.state.showConfirmStatusDescription} type="text" class="form-control" aria-describedby="sizing-addon1" disabled /></label >
                        </div>
                    </div>
                    <div class='status1'>
                        <div class='top'>
                            <div class="alert alert-primary" role="alert">
                                <h3>รูปยืนยันการเข้าห้องเรียนเริ่มต้น</h3>
                                <img
                                    src={this.state.flagConfirm || this.state.flagEdit ? this.state.showStudentImage : imagenotfound}>
                                </img>
                                <button id='button1' type="button" class="btn btn-default navbar-btn" onClick={() => this.saveClassAttendance(this.state.studentNo, '2')} disabled={false}>ยืนยันตัวตนด้วยค่าเริ่มต้น</button>
                            </div>
                            <div class="alert alert-secondary" role="alert">
                                <h3>รูปจากการกรอกรหัสนักศึกษา</h3>
                                <img
                                    src={(this.state.flagConfirm || this.state.flagEdit) && this.state.showClassAttendanceStudentKeyCodeName ? this.state.studentImageFromKeyCodeName : imagenotfound}>
                                </img>
                                <button id='button2' type="button" class="btn btn-default navbar-btn" onClick={() => this.saveClassAttendance(this.state.studentNoFromClassAttendanceStudentKeyCodeName, '2')} disabled={!this.state.studentNoFromClassAttendanceStudentKeyCodeName || (this.state.studentNo === this.state.studentNoFromClassAttendanceStudentKeyCodeName)}>ยืนยันตัวต้นจากการกรอกรหัสของนักศึกษา</button>
                                {!this.state.studentNoFromClassAttendanceStudentKeyCodeName ? <span class="badge badge-pill badge-danger">ไม่พบข้อมูลรหัสที่นักศึกษากรอก</span> : ''}
                                {this.state.studentNo === this.state.studentNoFromClassAttendanceStudentKeyCodeName ?
                                    <span class="badge badge-pill badge-danger">
                                        รูปยืนยันเริ่มต้นและรูปจากการกรอกตรงกัน!</span> : ''}
                            </div>
                            <div class="alert alert-danger" role="alert">
                                <h3>รูปจริงที่ตรวจจับได้</h3>
                                <img
                                    src={this.state.flagConfirm || this.state.flagEdit ? this.state.showClassAttendanceImage : imagenotfound}>
                                </img>
                            </div>
                            <div id='search' class="alert alert-warning" role="alert">
                                <div>
                                    <h3>รูปจากการค้นหา</h3>
                                    <img
                                        src={(this.state.flagConfirm || this.state.flagEdit) && this.state.tmpStudentImage ? this.state.tmpStudentImage : imagenotfound}>
                                    </img>
                                    <div>
                                        <button id='button3' type="button" class="btn btn-default navbar-btn" onClick={() => this.saveClassAttendance(this.state.studentNoFromSearch, '2')} >ยืนยันตัวตนจากการค้นหา</button>
                                        <button id='button4' type="button" class="btn btn-default navbar-btn" onClick={() => this.saveClassAttendance(this.state.studentNo, '3')} >ไม่สามารถยืนยันตัวตน</button>
                                    </div>
                                </div>
                                <div id='searchinput'>
                                    <legend id=''>ข้อมูลค้นหา</legend>
                                    <label id='label'>รหัส<br />น.ศ.<input type="text" maxLength="10" class="form-control" aria-describedby="sizing-addon1" name="studentCodeName" onChange={this.onChange} /></label >
                                    <label id='label1'>ชื่อ<br />น.ศ.<input type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="studentFirstName" onChange={this.onChange} /></label >
                                    <label id='label2'>นาม<br />สกุล<input type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="studentLastName" onChange={this.onChange} /></label >
                                    <label id='label3'>สถานะ<select class="selectpicker" name="studentStatus" onChange={this.onChange}>
                                        <option value='' selected={this.state.studentStatus == '' ? true : false}>ทั้งหมด</option>
                                        <option value='1' selected={this.state.studentStatus == '1' ? true : false}>ใช้งาน</option>
                                        <option value='2' selected={this.state.studentStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                                    </select></label>
                                    <button type="button" class="btn btn-default navbar-btn" onClick={this.searchStudent}>ค้นหา</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-wrapper-scroll-y">
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class='stickyusersearch' scope="col" width="130">รหัสนักศึกษา</th>
                                    <th class='stickyusersearch' scope="col" width="350">ชื่อ</th>
                                    <th class='stickyusersearch' scope="col" width="350">นามสกุล</th>
                                    <th class='stickyusersearch' scope="col" width="130">สถานะ</th>
                                    <th class='stickyusersearch' scope="col" width="130">ดูรูปนักศึกษา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataListStudent ? this.state.dataListStudent.map((item, index) => (
                                        <tr>
                                            <td>{item.STUDENT_CODE_NAME}</td>
                                            <td>{item.STUDENT_FIRST_NAME}</td>
                                            <td>{item.STUDENT_LAST_NAME}</td>
                                            <td>{item.USE_STATUS_DESCRIPTION}</td>
                                            <td onClick={() => { this.setState({ tmpStudentImage: item.STUDENT_IMAGE, studentNoFromSearch: item.STUDENT_NO }) }}>
                                                <p data-placement="top" data-toggle="tooltip" title="Select">
                                                    <button class="btn btn-primary btn-xs" data-title="Select" data-toggle="modal" data-target="#select">
                                                        <span class="glyphicon glyphicon-pencil"></span>
                                                    </button>
                                                </p>
                                            </td>
                                        </tr>
                                    )) : (<tr></tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(ClassAttendance)