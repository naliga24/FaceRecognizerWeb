import { Redirect, Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import login from './../Prototype/login'
import student from './../Prototype/student'

const imagenotfound = require('./../../../../server/image_assets/notfound(450&450).gif')

class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentNo: this.props.location.studentNo,
            studentCodeName: this.props.location.studentCodeName ? this.props.location.studentCodeName : '',
            studentFirstName: this.props.location.studentFirstName,
            studentLastName: this.props.location.studentLastName,
            studentStatus: this.props.location.studentStatus,
            studentImage: this.props.location.studentImage,
            oldStudentNo: this.props.location.studentNo,
            oldStudentCodeName: this.props.location.studentCodeName,
            oldStudentFirstName: this.props.location.studentFirstName,
            oldStudentLastName: this.props.location.studentLastName,
            oldStudentStatus: this.props.location.studentStatus,
            oldStudentImage: this.props.location.studentImage,
            studentImagePreview: null,
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
        };
    }

    saveStudent = async () => {
        try {
            if ((this.state.studentCodeName.length === 10 && !isNaN(this.state.studentCodeName))
                && this.state.studentFirstName && this.state.studentLastName && this.state.studentImage) {
                let studentObj = new student()
                if ((this.state.studentCodeName !== this.state.oldStudentCodeName)
                    || (this.state.studentFirstName !== this.state.oldStudentFirstName)
                    || (this.state.studentLastName !== this.state.oldStudentLastName)
                    || (this.state.studentStatus !== this.state.oldStudentStatus)
                    || (this.state.studentImage !== this.state.oldStudentImage)) {
                    if (this.state.studentCodeName !== this.state.oldStudentCodeName) {
                        let studentCodeNameFlag = await studentObj.checkStudentCodeName(this.state.studentCodeName)
                        if (studentCodeNameFlag === '0') {
                            if (this.state.flagEdit) {
                                studentObj.editStudent(this.state, this.clear)
                                alertify.alert('แก้ไข', `แก้ไขข้อมูลนักศึกษา "${this.state.studentCodeName}" เรียบร้อย`, () => {
                                    this.gotoStudentSearch()
                                }).show()
                            } else {
                                studentObj.addStudent(this.state, this.clear)
                                alertify.alert(`เพิ่มข้อมูลนักศึกษา "${this.state.studentCodeName}" เรียบร้อย`)
                            }
                        } else if (studentCodeNameFlag === '1' && this.state.flagEdit) {
                            alertify.alert('แก้ไข', `ไม่สามารถเแก้ไขข้อมูลนักศึกษา "${this.state.studentCodeName}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถเแก้ไขข้อมูล')
                            }).show()
                        }else if (studentCodeNameFlag === '1' && !this.state.flagEdit) {
                            alertify.alert('เพิ่ม', `ไม่สามารถเพิ่มข้อมูลนักศึกษา "${this.state.studentCodeName}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถเพิ่มข้อมูล')
                            }).show()
                        }
                    } else if (this.state.flagEdit) {
                        studentObj.editStudent(this.state, this.clear)
                        alertify.alert('แก้ไข', `แก้ไขข้อมูลนักศึกษา "${this.state.studentCodeName}" เรียบร้อย`, () => {
                            this.gotoStudentSearch()
                        }).show()
                    }
                } else if (this.state.flagEdit) {
                    alertify.alert('แก้ไข', `ข้อมูลไม่มีการเปลี่ยนแปลง`, () => {
                        alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
                    }).show()
                }
            } else if (!(this.state.studentCodeName.length === 10)) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุรหัสนักศึกษาจำนวน 10 หลัก', () => {
                    alertify.error('โปรดระบุรหัสนักศึกษาจำนวน 10 หลัก')
                }).show()
            } else if (isNaN(this.state.studentCodeName)) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุรหัสนักศึกษาเป็นรูปแบบตัวเลข', () => {
                    alertify.error('โปรดระบุรหัสนักศึกษาเป็นรูปแบบตัวเลข')
                }).show()
            } else if (!this.state.studentFirstName) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุชื่อนักศึกษา', () => {
                    alertify.error('โปรดระบุชื่อนักศึกษา')
                }).show()

            } else if (!this.state.studentLastName) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุนามสกุลนักศึกษา', () => {
                    alertify.error('โปรดระบุนามสกุลนักศึกษา')
                }).show()

            } else if (!this.state.studentImage) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุรูปภาพนักศึกษา', () => {
                    alertify.error('โปรดระบุรูปภาพนักศึกษา')
                }).show()
            }
        } catch (err) {
            alertify.alert('วิชาเปิดสอน', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            let log = new login()
            log.writeLogLogout('5')
        }
    }

    add = () => {
        this.setState({ buttonDisble: !this.state.buttonDisble });
    }

    clear = () => {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, studentCodeName: '', studentFirstName: '', studentLastName: '', studentStatus: '1', studentImage: null, studentImagePreview: null })
    }

    onChange = (e) => {
        if (e.target.name === "studentImage") {
            this.setState({ [e.target.name]: e.target.files[0], studentImagePreview: URL.createObjectURL(e.target.files[0]) })
            console.log(e.target.files[0])
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    gotoStudentSearch = () => {
        this.props.history.push('/StudentSearch');
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_student'><h3>การเพิ่มข้อมูล > นักศึกษา</h3></div>
                <div class='student'>
                    <div class='button'>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.add} disabled={this.state.buttonDisble}>เพิ่มข้อมูล</button>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveStudent} disabled={!this.state.buttonDisble}>บันทึกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.clear} disabled={!this.state.buttonDisble}>ยกเลิกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.gotoStudentSearch}>ค้นหาข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>รหัสนักศึกษา<input value={this.state.studentCodeName} type="number" maxLength="10" class="form-control" aria-describedby="sizing-addon1" name="studentCodeName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label id="name">ชื่อ<input value={this.state.studentFirstName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="studentFirstName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label>
                            <label id="lastname">นามสกุล<input value={this.state.studentLastName} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="studentLastName" onChange={this.onChange} disabled={!this.state.buttonDisble} required /></label >
                            <label id='status'>สถานะ<select class="selectpicker" name="studentStatus" onChange={this.onChange} disabled={!this.state.flagEdit}>
                                <option value='1' selected={this.state.studentStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.studentStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label >
                            <label id="studentImage">รูปภาพ:
                            <input type='file' class="form-control-file" id="studentImage" name="studentImage" accept="image/png, image/jpeg, image/gif" onChange={this.onChange} />
                            </label>
                        </div>
                        <div class='bottom'>
                            <img id='img' alt={this.flagEdit ? 'ไม่พบรูปนักศึกษา' : ''}
                                src={this.state.flagEdit ? (this.state.studentImagePreview ? this.state.studentImagePreview : (this.state.studentImage ? this.state.studentImage : imagenotfound)) : (this.state.studentImage ? this.state.studentImagePreview : imagenotfound)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Student);