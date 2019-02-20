import { Redirect, Link,withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import  login  from './../Prototype/login'
import  user  from './../Prototype/user'

let dateFormat = require('dateformat')

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNo: this.props.location.userNo,
            userLogin: this.props.location.userLogin,
            oldUserLogin: this.props.location.userLogin,
            userPassword: this.props.location.userPassword,
            oldUserPassword: this.props.location.userPassword,
            userName: this.props.location.userName,
            oldUserName: this.props.location.userName,
            userType: this.props.location.userType,
            oldUserType: this.props.location.userType,
            inactiveDate: new Date().toISOString().split('T')[0],
            inactiveTime: new Date().toISOString().split('T')[1].slice(0, 8),
            inactiveDetail: '',
            oldInactiveDetail:'',
            userStatus: this.props.location.userStatus ? this.props.location.userStatus : '1',
            oldUserStatus: this.props.location.userStatus,
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
            tmpDate: new Date(),
        };
        this.add = this.add.bind(this)
        this.clear = this.clear.bind(this)
        this.onChange = this.onChange.bind(this)
        this.userInactiveInfo = this.userInactiveInfo.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.gotoUserSearch = this.gotoUserSearch.bind(this) 
        this.getCurrentDate = this.getCurrentDate.bind(this)

    }

    componentDidMount() {
        if (this.state.flagEdit && this.state.userStatus == '2') {
            this.userInactiveInfo()
        }
        this.getCurrentDate()
    }

    userInactiveInfo() {
        let tmp = new user()
        tmp.getInactiveInfo(this.state.userNo)
        window.setTimeout(() => {
            tmp.data2 && this.setState({ inactiveDate: tmp.data2.INACTIVE_DATE, inactiveTime: tmp.data2.INACTIVE_TIME, inactiveDetail: tmp.data2.INACTIVE_DETAIL })
        }, 1000);
    }

    saveUser() {
        if (this.state.userLogin && this.state.userPassword && this.state.userName && this.state.userType && this.state.userStatus) {
            let tmp = new user()
            if ((this.state.userLogin !== this.state.oldUserLogin)
                || (this.state.userPassword !== this.state.oldUserPassword)
                || (this.state.userName !== this.state.oldUserName)
                || (this.state.userType !== this.state.oldUserType)
                || (this.state.inactiveDetail !== this.state.oldInactiveDetail)
                || (this.state.userStatus !== this.state.oldUserStatus)) {
            if (this.state.userLogin !== this.state.oldUserLogin) {
                tmp.checkUserLogin(this.state.userLogin)
                setTimeout(() => {
                    if (tmp.data3 === '0') {
                        if (this.state.flagEdit) {
                            tmp.editUser(this.state, this.clear)
                            alertify.alert('แก้ไข',`แก้ข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`,()=>{
                                this.gotoUserSearch()
                            }).show()
                        } else {
                            tmp.addUser(this.state, this.clear)
                            alertify.alert('เพิ่ม',`เพิ่มข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`,()=>{
                                alertify.success(`เพิ่มข้อมูลเรียบร้อย`)
                            }).show()
                        }
                    } else if (tmp.data3 === '1' && this.state.flagEdit) {
                        alertify.alert('แก้ไข',`ไม่สามารถเแก้ไขข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" ชื่อมีในระบบแล้ว`,()=>{
                            alertify.error('ไม่สามารถเแก้ไขข้อมูล')
                        }).show()  
                    }
                    else if (tmp.data3 === '1' && !this.state.flagEdit) {
                        alertify.alert('เพิ่ม',`ไม่สามารถเพิ่มข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" ชื่อมีในระบบแล้ว`,()=>{
                            alertify.error('ไม่สามารถเพิ่มข้อมูล')
                        }).show() 
                    }
                }, 1000);
            } else if (this.state.flagEdit) {
                tmp.editUser(this.state, this.clear)
                alertify.alert('แก้ไข',`แก้ข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`,()=>{
                    this.gotoUserSearch()
                }).show()
            }
        } else if (this.state.flagEdit) {
            alertify.alert('แก้ไข',`ข้อมูลไม่มีการเปลี่ยนแปลง`,()=>{
                alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
            }).show()
        }
        } else if (!this.state.userLogin) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุชื่อในการเข้าระบบ',()=>{
                alertify.error('โปรดระบุชื่อในการเข้าระบบ')
            }).show()
        } else if (!this.state.userPassword) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุรหัสผ่าน',()=>{
                alertify.error('โปรดระบุรหัสผ่าน')
            }).show()
        } else if (!this.state.userName) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุชื่อผู้ใช้งาน',()=>{
                alertify.error('โปรดระบุชื่อผู้ใช้งาน')
            }).show()
        } else if (!this.state.userType) {
            alertify.alert('เพิ่ม/แก้ไข','โปรดระบุประเภทผู้ใช้งาน',()=>{
                alertify.error('โปรดระบุประเภทผู้ใช้งาน')
            }).show()
        }
        let log = new login()
        log.writeLogLogout('6')
    }

    add() {
        this.setState({ buttonDisble: !this.state.buttonDisble })
    }

    clear() {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, userLogin: '', userPassword: '', userName: '', userType: '', userStatus: '1' })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoUserSearch() {
        this.props.history.push('/UserSearch');
    }

    getCurrentDate() {
        setInterval(() => {
            this.state.tmpDate.setSeconds(this.state.tmpDate.getSeconds() + 1);
            this.setState({ tmpDate: this.state.tmpDate })
        }, 1000)
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_user'><h3>การเพิ่มข้อมูล > ผู้ใช้งานระบบ</h3></div>
                <div class='user'>
                    <div class='button'>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.add} disabled={this.state.buttonDisble}>เพิ่มข้อมูล</button>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveUser} disabled={!this.state.buttonDisble}>บันทึกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.clear} disabled={!this.state.buttonDisble}>ยกเลิกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.gotoUserSearch}>ค้นหาข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>ชื่อในการเข้าใช้ระบบ<input value={this.state.userLogin} type="text" maxLength="4" class="form-control" aria-describedby="sizing-addon1" name="userLogin" onChange={this.onChange} disabled={!this.state.buttonDisble || (this.state.userStatus == '2' && this.state.inactiveDate)} required /></label>
                            <label>รหัสผ่าน<input value={this.state.userPassword} type="text" maxLength="4" class="form-control" aria-describedby="sizing-addon1" name="userPassword" onChange={this.onChange} disabled={!this.state.buttonDisble || (this.state.userStatus == '2' && this.state.inactiveDate)} required /></label>
                            <label>ชื่อผู้ใช้งานระบบ<input value={this.state.userName} type="text" maxLength="30" class="form-control" aria-describedby="sizing-addon1" name="userName" onChange={this.onChange} disabled={!this.state.buttonDisble || (this.state.userStatus == '2' && this.state.inactiveDate)} required /></label>
                        </div>
                        <div class='bottom'>
                            <label>ประเภทผู้ใช้งาน
                                <select id='first' class="selectpicker" name="userType" onChange={this.onChange} disabled={!this.state.buttonDisble || (this.state.userStatus == '2' && this.state.inactiveDate)} required>
                                    <option></option>
                                    <option value='1' selected={this.state.userType == '1' ? true : false}>อาจารย์</option>
                                    <option value='2' selected={this.state.userType == '2' ? true : false}>พนักงานหมาวิทยาลัย</option>
                                </select>
                            </label>
                            <label id='status'>สถานะ
                            <select  id='second'  class="selectpicker" name="userStatus" onChange={this.onChange} disabled={!this.state.flagEdit}>
                                <option value='1' selected={this.state.userStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.userStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label>
                        </div>
                    </div>
                    <div class='status1'>
                        <div class='top'>
                            <label>รายละเอียดในการไม่ใช้งาน<input value={this.state.inactiveDetail && this.state.userStatus == '2' ? this.state.inactiveDetail : ''} type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="inactiveDetail" onChange={this.onChange} disabled={!this.state.flagEdit || this.state.userStatus == '1'} required /></label>
                        </div>
                        <div class='bottom'>
                            <label>วันหยุดใช้งาน<input value={this.state.inactiveDate && this.state.userStatus == '2' ? this.state.inactiveDate.slice(0, 10) : dateFormat(this.state.tmpDate, "yyyy-mm-dd")} type="text" class="form-control" aria-describedby="sizing-addon1" name="inactiveDate" disabled /></label>
                            <label id='inactivetime' >เวลาหยุดใช้งาน<input value={this.state.inactiveTime && this.state.userStatus == '2' ? this.state.inactiveTime : dateFormat(this.state.tmpDate, "HH:MM:ss")} type="text" class="form-control" aria-describedby="sizing-addon1" name="inactiveTime" disabled /></label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(User);