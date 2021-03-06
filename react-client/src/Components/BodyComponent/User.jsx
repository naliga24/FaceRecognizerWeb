import { Redirect, Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    getInactiveInfo,
    checkUserLogin,
    editUser,
    addUser
} from './../Actions/User';
import {
    writeLogLogout
} from './../Actions/Login'

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
            oldInactiveDetail: '',
            userStatus: this.props.location.userStatus ? this.props.location.userStatus : '1',
            oldUserStatus: this.props.location.userStatus,
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
            tmpDate: new Date(),
            time:null
        };
    }

    componentDidMount = () => {
        if (this.state.flagEdit && this.state.userStatus == '2') {
            this.userInactiveInfo()
        }
        this.getCurrentDate()
    }

    userInactiveInfo = async () => {
        try {
            await this.props.getInactiveInfo(this.state.userNo)
            this.props.user.inactiveInfo && this.setState({
                inactiveDate: this.props.user.inactiveInfo.INACTIVE_DATE,
                inactiveTime: this.props.user.inactiveInfo.INACTIVE_TIME,
                inactiveDetail: this.props.user.inactiveInfo.INACTIVE_DETAIL
            })
        } catch (err) {
            alertify.alert('ผู้ใช้ระบบ', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        }
    }

    saveUser = async () => {
        try {
            if (this.state.userLogin && this.state.userPassword && this.state.userName && this.state.userType && this.state.userStatus) {
                if ((this.state.userLogin !== this.state.oldUserLogin)
                    || (this.state.userPassword !== this.state.oldUserPassword)
                    || (this.state.userName !== this.state.oldUserName)
                    || (this.state.userType !== this.state.oldUserType)
                    || (this.state.inactiveDetail !== this.state.oldInactiveDetail)
                    || (this.state.userStatus !== this.state.oldUserStatus)) {
                    if (this.state.userLogin !== this.state.oldUserLogin) {
                        await this.props.checkUserLogin(this.state.userLogin)
                        if (this.props.user.userLoginFlag === 0) {
                            if (this.state.flagEdit) {
                                this.props.editUser(this.state, this.clear)
                                alertify.alert('แก้ไข', `แก้ข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`, () => {
                                    this.gotoUserSearch()
                                }).show()
                            } else {
                                this.props.addUser(this.state, this.clear)
                                alertify.alert('เพิ่ม', `เพิ่มข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`, () => {
                                    alertify.success(`เพิ่มข้อมูลเรียบร้อย`)
                                }).show()
                            }
                        } else if (this.props.user.userLoginFlag === 1 && this.state.flagEdit) {
                            alertify.alert('แก้ไข', `ไม่สามารถเแก้ไขข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถเแก้ไขข้อมูล')
                            }).show()
                        } else if (this.props.user.userLoginFlag === 1 && !this.state.flagEdit) {
                            alertify.alert('เพิ่ม', `ไม่สามารถเพิ่มข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถเพิ่มข้อมูล')
                            }).show()
                        }
                    } else if (this.state.flagEdit) {
                        this.props.editUser(this.state, this.clear)
                        alertify.alert('แก้ไข', `แก้ข้อมูลผู้ใช้งานระบบ "${this.state.userLogin}" เรียบร้อย`, () => {
                            this.gotoUserSearch()
                        }).show()
                    }
                } else if (this.state.flagEdit) {
                    alertify.alert('แก้ไข', `ข้อมูลไม่มีการเปลี่ยนแปลง`, () => {
                        alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
                    }).show()
                }
            } else if (!this.state.userLogin) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุชื่อในการเข้าระบบ', () => {
                    alertify.error('โปรดระบุชื่อในการเข้าระบบ')
                }).show()
            } else if (!this.state.userPassword) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุรหัสผ่าน', () => {
                    alertify.error('โปรดระบุรหัสผ่าน')
                }).show()
            } else if (!this.state.userName) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุชื่อผู้ใช้งาน', () => {
                    alertify.error('โปรดระบุชื่อผู้ใช้งาน')
                }).show()
            } else if (!this.state.userType) {
                alertify.alert('เพิ่ม/แก้ไข', 'โปรดระบุประเภทผู้ใช้งาน', () => {
                    alertify.error('โปรดระบุประเภทผู้ใช้งาน')
                }).show()
            }
        } catch (err) {
            alertify.alert('ผู้ใช้ระบบ', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            this.props.writeLogLogout('6')
        }
    }

    add = () => {
        this.setState({ buttonDisble: !this.state.buttonDisble })
    }

    clear = () => {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, userLogin: '', userPassword: '', userName: '', userType: '', userStatus: '1' })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoUserSearch = () => {
        this.props.history.push('/UserSearch');
    }

    getCurrentDate = () => {
        this.setState({
            time: setInterval(() => {
                this.state.tmpDate.setSeconds(this.state.tmpDate.getSeconds() + 1);
                this.setState({ tmpDate: this.state.tmpDate })
                console.log(this.state.tmpDate)
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.time)
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
                            <select id='second' class="selectpicker" name="userStatus" onChange={this.onChange} disabled={!this.state.flagEdit}>
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps,
    {
        getInactiveInfo,
        checkUserLogin,
        editUser,
        addUser,
        writeLogLogout
    })(withRouter(User))        