import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import configuration from './../Prototype/configuration';
import login from './../Prototype/login';

class Configuration extends Component {
    constructor() {
        super();
        this.state = {
            input: {
                subject: null,
                semester: null,
                student: null,
                teacher: null,
                classAttendance: null,
                user: null,
                report: null,
                admin: null,
            },
            data: null,
            data1: null,
            userTypeNo: null,
            userTypeName: null,
            inputDisable: true,
        };
    }

    componentWillMount=()=> {
        this.selectUserTypeInfo()
    }

    selectUserTypeInfo=()=> {
        let tmp = new configuration()
        tmp.callListPermission()
        window.setTimeout(() => {
            this.setState({ data: tmp, data1: tmp.data1.data })
        }, 1000);
    }

    saveConfiguration=()=> {
        let userTypePermission = '';
        let tmp = [this.state.subject, this.state.semester, this.state.student, this.state.teacher, this.state.classAttendance, this.state.user, this.state.report, this.state.admin, this.state.userTypeNo]
        for (let i = 0; i <= 7; i++) {
            if (tmp[i]) {
                userTypePermission += '1'
            } else {
                userTypePermission += '0'
            }
        }
        if (userTypePermission[0] === '1' || userTypePermission[1] === '1' || userTypePermission[2] === '1' || userTypePermission[3] === '1' || userTypePermission[4] === '1' || userTypePermission[5] === '1' || userTypePermission[6] === '1') {
            this.state.data.editUserType(userTypePermission, this.state.userTypeNo)
            alertify.alert('แก้ไข', `แก้ไขสิทธิ์ในการเข้าใช้งานของ "${this.state.userTypeName}" เรียบร้อย`, () => {
                alertify.success(`แก้ไขสิทธิ์เรียบร้อย`)
            }).show()
            this.selectUserTypeInfo()
            this.setState({ subject: null, semester: null, student: null, teacher: null, classAttendance: null, user: null, report: null, inputDisable: true })

        } else {
            alertify.alert('แก้ไข', `ต้องกำหนดสิทธิ์ในการเข้าใช้งานอย่างน้อย 1 เมนู`, () => {
                alertify.error('ไม่สามารถแก้ไขสิทธิ์')
            }).show()
        }
        let log = new login()
        log.writeLogLogout('8')
    }

    edit=(index)=> {
        let tmp = this.state.data1[index].USER_TYPE_PERMISSION
        let i = 0
        for (let obj in this.state.input) {
            if (tmp[i] === '1') {
                this.setState({ [obj]: true })
            } else if (tmp[i] === '0') {
                this.setState({ [obj]: false })
            }
            i += 1
        }
        let x = document.getElementById("userTypeName")
        x.value = this.state.data1[index].USER_TYPE_NAME
        this.setState({ userTypeNo: this.state.data1[index].USER_TYPE_NO, userTypeName: this.state.data1[index].USER_TYPE_NAME, inputDisable: false })
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_configuration'><h3>การตั่งค่า</h3></div>
                <div class='configuration'>
                    <div class='button'>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveConfiguration} disabled={this.state.inputDisable} >บันทึกข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div id='top'>
                            <label>ประเภทผู้ใช้งาน<input type="text" class="form-control" aria-describedby="sizing-addon1" id="userTypeName" disabled /></label>
                            <li class="list-group-item">
                                <input type="checkbox" checked={this.state.subject} onClick={() => { this.setState({ subject: !this.state.subject }) }} disabled={this.state.inputDisable} /><span>วิชาเปิดสอน</span>
                            </li>
                            <li class="list-group-item">
                                <input type="checkbox" checked={this.state.semester} onClick={() => { this.setState({ semester: !this.state.semester }) }} disabled={this.state.inputDisable} /><span>ภาคการศึกษา</span>
                            </li>
                            <li class="list-group-item">
                                <input type="checkbox" checked={this.state.student} onClick={() => { this.setState({ student: !this.state.student }) }} disabled={this.state.inputDisable} /><span>นักศึกษา</span>
                            </li>
                            <li class="list-group-item">
                                <input type="checkbox" checked={this.state.teacher} onClick={() => { this.setState({ teacher: !this.state.teacher }) }} disabled={this.state.inputDisable} /><span>อาจารย์</span>
                            </li>
                        </div>
                        <div id='bottom'>
                            <li id='first' class="list-group-item">
                                <input type="checkbox" checked={this.state.classAttendance} onClick={() => { this.setState({ classAttendance: !this.state.classAttendance }) }} disabled={this.state.inputDisable} /><span>การเข้าชั้นเรียน</span>
                            </li>
                            <li id='second' class="list-group-item">
                                <input type="checkbox" checked={this.state.user} onClick={() => { this.setState({ user: !this.state.user }) }} disabled={this.state.inputDisable} /><span>การจัดการผู้ใช้ระบบ</span>
                            </li>
                            <li id='third' class="list-group-item">
                                <input type="checkbox" checked={this.state.report} onClick={() => { this.setState({ report: !this.state.report }) }} disabled={this.state.inputDisable} /><span>รายงาน</span>
                            </li>
                        </div>
                    </div>
                    <div class="table-wrapper-scroll-y">
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ลำดับที่</th>
                                    <th scope="col">ประเภทผู้ใช้งานระบบ</th>
                                    <th scope="col">แก้ไข</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data1 ? this.state.data1.map((item, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.USER_TYPE_NAME}</td>
                                            <td onClick={() => this.edit(index)}><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                                        </tr>
                                    )) : (<p></p>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Configuration