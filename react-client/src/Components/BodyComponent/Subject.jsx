import { Redirect, Link ,withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import  login  from './../Prototype/login'
import  subject  from './../Prototype/subject'

class Subject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectNo: this.props.location.subjectNo,
            subjectCodeName: this.props.location.subjectCodeName?this.props.location.subjectCodeName:'',
            subjectName: this.props.location.subjectName,
            subjectDescription: this.props.location.subjectDescription,
            teacherNo: this.props.location.teacherNo,
            subjectStatus: this.props.location.subjectStatus,
            oldSubjectNo: this.props.location.subjectNo,
            oldSubjectCodeName: this.props.location.subjectCodeName,
            oldSubjectName: this.props.location.subjectName,
            oldSubjectDescription: this.props.location.subjectDescription,
            oldTeacherNo: this.props.location.teacherNo,
            oldSubjectStatus: this.props.location.subjectStatus,
            listTeacher: '',
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
        };
    }

    componentDidMount=async()=> {
        let subjectObj = new subject()
        let listTeacher = await subjectObj.callListTeacher()
        listTeacher.length > 0 && this.setState({ listTeacher })
    }

    saveSubject=async()=> {
        if (this.state.subjectCodeName.length === 7 && this.state.subjectName && this.state.teacherNo) {
            let subjectObj = new subject()
            if ((this.state.subjectCodeName !== this.state.oldSubjectCodeName)
                || (this.state.subjectName !== this.state.oldSubjectName)
                || (this.state.studentLastName !== this.state.oldStudentLastName)
                || (this.state.subjectDescription !== this.state.oldSubjectDescription)
                || (this.state.teacherNo !== this.state.oldTeacherNo)
                || (this.state.subjectStatus !== this.state.oldSubjectStatus)) {
                if (this.state.subjectCodeName !== this.state.oldSubjectCodeName) {
                        if (await subjectObj.checkSubjectId(this.state.subjectCodeName) === '0') {
                            if (this.state.flagEdit) {
                                subjectObj.editSubject(this.state.subjectCodeName, this.state.subjectName, this.state.subjectDescription, this.state.teacherNo, this.state.subjectStatus, this.state.subjectNo, this.clear)
                                alertify.alert('แก้ไข',`แก้ไขข้อมูลวิชาเปิดสอน "${this.state.subjectCodeName}" เรียบร้อย`,()=>{
                                    this.gotoSubjectSearch()
                                }).show()
                            } else {
                                subjectObj.addSubject(this.state.subjectCodeName, this.state.subjectName, this.state.subjectDescription, this.state.teacherNo, this.clear)
                                alertify.alert('เพิ่ม',`เพิ่มข้อมูลวิชาเปิดสอน "${this.state.subjectCodeName}" เรียบร้อย`,()=>{
                                    alertify.success(`เพิ่มข้อมูลเรียบร้อย`)
                                }).show()
                            }
                        } else if (await subjectObj.checkSubjectId(this.state.subjectCodeName) === '1' && this.state.flagEdit) {
                            alertify.alert('แก้ไข',`ไม่สามารถเแก้ไขข้อมูลวิชาเปิดสอน "${this.state.subjectCodeName}" ชื่อมีในระบบแล้ว`,()=>{
                                alertify.error('ไม่สามารถเแก้ไขข้อมูล')
                            }).show()                
                        }
                        else if (await subjectObj.checkSubjectId(this.state.subjectCodeName) === '1' && !this.state.flagEdit) {
                            alertify.alert('เพิ่ม',`ไม่สามารถเพิ่มข้อมูลวิชาเปิดสอน "${this.state.subjectCodeName}" ชื่อมีในระบบแล้ว`,()=>{
                                alertify.error('ไม่สามารถเพิ่มข้อมูล')
                            }).show()   
                        }
                } else if (this.state.flagEdit) {
                    subjectObj.editSubject(this.state.subjectCodeName, this.state.subjectName, this.state.subjectDescription, this.state.teacherNo, this.state.subjectStatus, this.state.subjectNo, this.clear)
                    alertify.alert('แก้ไข',`แก้ไขข้อมูลวิชาเปิดสอน "${this.state.subjectCodeName}" เรียบร้อย`,()=>{
                        this.gotoSubjectSearch()
                    }).show()
                }
            } else if (this.state.flagEdit) {
                alertify.alert('แก้ไข',`ข้อมูลไม่มีการเปลี่ยนแปลง`,()=>{
                    alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
                }).show()
            }
        }
        else if(!(this.state.subjectCodeName.length === 7) ){
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุรหัสวิชาจำนวน 7 หลัก',()=>{
                alertify.error('โปรดระบุรหัสวิชาจำนวน 7 หลัก')
            }).show()

        }else if(!this.state.subjectName){
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุชื่อวิชา',()=>{
                alertify.error('โปรดระบุชื่อวิชา')
            }).show()

        }else if(!this.state.teacherNo){
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุอาจารย์ประจำวิชา',()=>{
                alertify.error('โปรดระบุอาจารย์ประจำวิชา')
            }).show()

        }
        let log = new login()
        log.writeLogLogout('2')
    }
    add=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble });
    }

    clear=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, subjectCodeName: '', subjectName: '', subjectDescription: '', teacherNo: '', subjectStatus: '1' })
    }

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoSubjectSearch=()=> {
        this.props.history.push('/SubjectSearch');
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_subject'><h3>การเพิ่มข้อมูล > วิชาเปิดสอน</h3></div>
                <div class='subject'>
                    <div class='button'>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.add} disabled={this.state.buttonDisble}>เพิ่มข้อมูล</button>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveSubject} disabled={!this.state.buttonDisble}>บันทึกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.clear} disabled={!this.state.buttonDisble}>ยกเลิกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.gotoSubjectSearch}>ค้นหาข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>รหัสวิชา<input value={this.state.subjectCodeName} type="text" minLength="7" maxLength="7" class="form-control" aria-describedby="sizing-addon1" name="subjectCodeName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label>ชื่อวิชา<input value={this.state.subjectName} type="text" maxLength="40" class="form-control" aria-describedby="sizing-addon1" name="subjectName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label>รายละเอียดวิชา<input value={this.state.subjectDescription} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="subjectDescription" onChange={this.onChange} disabled={!this.state.buttonDisble} /></label>
                            <label id='status'>สถานะ<select class="selectpicker" name="subjectStatus" onChange={this.onChange} disabled={!this.state.flagEdit} >
                                <option value='1' selected={this.state.subjectStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.subjectStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label>
                        </div>
                        <div class='bottom'>
                            <label id='first'>อาจารย์ประจำวิชา
                            <select class="selectpicker" name="teacherNo" onChange={this.onChange} disabled={!this.state.buttonDisble}>
                                    <option hidden>เลือกอาจารย์ประจำวิชา</option>
                                    {
                                        this.state.listTeacher ? this.state.listTeacher.map((item, index) => (
                                            <option value={item.TEACHER_NO} selected={this.state.teacherNo == item.TEACHER_NO ? true : false}>{item.TEACHER_FIRST_NAME}  {item.TEACHER_LAST_NAME}</option>
                                        )) : (<option selected>ไม่มีข้อมูลอาจารย์ประจำวิชา</option>)
                                    }
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Subject)