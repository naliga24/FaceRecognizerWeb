import { Redirect, Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import  login  from './../Prototype/login'
import  teacher  from './../Prototype/teacher'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacherNo: this.props.location.teacherNo,
            teacherFirstName: this.props.location.teacherFirstName,
            teacherLastName: this.props.location.teacherLastName,
            teacherClassCount: this.props.location.teacherClassCount ? this.props.location.teacherClassCount : '0',
            teacherStatus: this.props.location.teacherStatus ? this.props.location.teacherStatus : '1',
            oldTeaherFirstName: this.props.location.teacherFirstName,
            oldTeaherLastName: this.props.location.teacherLastName,
            oldTeaherStatus: this.props.location.teacherStatus,
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
        };
    }

    saveTeacher=async()=> {
        if (this.state.teacherFirstName && this.state.teacherLastName) {
            let teacherObj = new teacher()
            if ((this.state.teacherFirstName !== this.state.oldTeaherFirstName)
                || (this.state.teacherLastName !== this.state.oldTeaherLastName)
                || (this.state.teacherStatus !== this.state.oldTeaherStatus)) {
                if ((this.state.teacherFirstName !== this.state.oldTeaherFirstName)
                    || (this.state.teacherLastName !== this.state.oldTeaherLastName)) {
                        try{
                            let TeacherFirstNameAndLastNameFlag = await teacherObj.checkTeacherFirstNameAndLastName(this.state.teacherFirstName, this.state.teacherLastName)
                            if (TeacherFirstNameAndLastNameFlag === '0') {
                                if (this.state.flagEdit) {
                                    teacherObj.editTeacher(this.state.teacherFirstName, this.state.teacherLastName, this.state.teacherStatus, this.state.teacherNo, this.clear)
                                         alertify.alert('แก้ไข',`แก้ไขข้อมูลอาจารย์ "${this.state.teacherFirstName} ${this.state.teacherLastName}" เรียบร้อย`,()=>{
                                    this.gotoTeacherSearch()
                                    }).show()
                                } else {
                                    teacherObj.addTeacher(this.state.teacherFirstName, this.state.teacherLastName, this.clear)
                                    alertify.alert('เพิ่ม',`เพิ่มข้อมูลอาจารย์ "${this.state.teacherFirstName} ${this.state.teacherLastName}" เรียบร้อย`,()=>{
                                        alertify.success(`เพิ่มข้อมูลเรียบร้อย`)
                                    }).show()
                                }
                            } else if (TeacherFirstNameAndLastNameFlag === '1' && this.state.flagEdit) {
                                alertify.alert('แก้ไข',`ไม่สามารถเแก้ไขข้อมูลอาจารย์ "${this.state.teacherFirstName} ${this.state.teacherLastName}" ชื่อมีในระบบแล้ว`,()=>{
                                    alertify.error('ไม่สามารถเแก้ไขข้อมูล')
                                }).show()   
                            }
                            else if (TeacherFirstNameAndLastNameFlag === '1' && !this.state.flagEdit) {
                                alertify.alert('เพิ่ม',`ไม่สามารถเพิ่มข้อมูลอาจารย์ "${this.state.teacherFirstName} ${this.state.teacherLastName}" ชื่อมีในระบบแล้ว`,()=>{
                                    alertify.error('ไม่สามารถเพิ่มข้อมูล')
                                }).show() 
                            }
                        }catch(err){
                            alertify.alert('อาจารย์', err, () => {
                                alertify.error('เกิดข้อผิดพลาด')
                            }).show()
                        }
                } else if (this.state.flagEdit) {
                    teacherObj.editTeacher(this.state.teacherFirstName, this.state.teacherLastName, this.state.teacherStatus, this.state.teacherNo, this.clear)
                    alertify.alert('แก้ไข',`แก้ไขข้อมูลอาจารย์ "${this.state.teacherFirstName} ${this.state.teacherLastName}" เรียบร้อย`,()=>{
                        this.gotoTeacherSearch()
                        }).show()
                }
            } else if (this.state.flagEdit) {
                alertify.alert('แก้ไข',`ข้อมูลไม่มีการเปลี่ยนแปลง`,()=>{
                    alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
                }).show()
            }
        }
        else if (!this.state.teacherFirstName) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุชื่ออาจรย์',()=>{
                alertify.error('โปรดระบุชื่ออาจรย์')
            }).show()

        } else if (!this.state.teacherLastName) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุนามสกุลอาจารย์',()=>{
                alertify.error('โปรดระบุนามสกุลอาจารย์')
            }).show()
        }

        let log = new login()
        log.writeLogLogout('5')
    }

    add=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble });
    }

    clear=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, teacherFirstName: '', teacherLastName: '', teacherClassCount: '', teacherStatus: '1' })
    }

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoTeacherSearch=()=> {
        this.props.history.push('/TeacherSearch');
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_teacher'><h3>การเพิ่มข้อมูล > อาจารย์</h3></div>
                <div class='teacher'>
                    <div class='button'>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.add} disabled={this.state.buttonDisble}>เพิ่มข้อมูล</button>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveTeacher} disabled={!this.state.buttonDisble}>บันทึกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.clear} disabled={!this.state.buttonDisble}>ยกเลิกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.gotoTeacherSearch}>ค้นหาข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>ชื่ออาจารย์<input value={this.state.teacherFirstName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="teacherFirstName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label>นามสกุล<input value={this.state.teacherLastName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="teacherLastName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label>จำนวนวิชาที่สอน<input value={this.state.teacherClassCount} type="text" class="form-control" aria-describedby="sizing-addon1" name="teacherClassCount" disabled /></label>
                            <label id='status'><div onClick={() => { (this.state.teacherClassCount > 0) && alertify.alert('ไม่สามารถแก้ไขสถานะเป็น "ไม่ใช้งาน"! จำนวนวิชาสอนต้องเท่ากับ 0') }}  >
                                สถานะ<select class="selectpicker" name="teacherStatus" onChange={this.onChange} disabled={!this.state.flagEdit || this.state.teacherClassCount > '0'}>
                                    <option value='1' selected={this.state.teacherStatus == '1' ? true : false}>ใช้งาน</option>
                                    <option value='2' selected={this.state.teacherStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                                </select>
                            </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Teacher);