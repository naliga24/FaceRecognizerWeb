import { Redirect, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    callCheckUserLogin,
    callCheckUserPassword,
    callCheckUserStatus,
    callGetPermissionDetail,
    writeLogLogin,
    writeLogLoginError,
    callGetLoginNo,
    writeLogLogout
} from './../Actions/Login'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            userLogin: '',
            userPassword: '',
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = async () => {
        console.log('login')
        if (this.state.userLogin && this.state.userPassword) {
            try {
                await this.props.callCheckUserLogin(this.state.userLogin)
                if (this.props.user.userLoginFlag === 1) {
                    await this.props.callCheckUserPassword(this.state.userLogin, this.state.userPassword)
                    if (this.props.user.userPasswordFlag === 1) {
                        await this.props.callCheckUserStatus(this.state.userLogin, this.state.userPassword)
                        if (this.props.user.userStatusFlag === 1) {
                            await this.props.callGetPermissionDetail(this.state.userLogin, this.state.userPassword)
                            sessionStorage.setItem('token', this.props.userType.token)
                            await this.props.writeLogLogin('1')
                            window.location.reload()
                        } else if (this.props.user.userStatusFlag === 0) {
                            alertify.alert('เข้าระบบ', `สถานะผู้ใช้ระบบเท่ากับ “ไม่ใช้งาน”`, () => {
                                alertify.error('ไม่สามารถเข้าระบบ')
                            }).show()
                        }
                    } else if (this.props.user.userPasswordFlag === 0) {
                        alertify.alert('เข้าระบบ', `ชื่อ password ไม่ถูกต้อง`, () => {
                            alertify.error('ไม่สามารถเข้าระบบ')
                        }).show()
                        await this.props.callGetLoginNo(this.state.userLogin)
                        this.props.writeLogLoginError('11', this.props.user.userNo)
                    }
                } else if (this.props.user.userLoginFlag === 0) {
                    alertify.alert('เข้าระบบ', `ชื่อ username ไม่ถูกต้อง`, () => {
                        alertify.error('ไม่สามารถเข้าระบบ')
                    }).show()
                }
            }
            catch (err) {
                alertify.alert('เข้าระบบ', err, () => {
                    alertify.error('ไม่สามารถเข้าระบบ')
                }).show()
            }
        } else {
            alertify.alert('เข้าระบบ', `กรอกข้อมูลไม่ครบ`, () => {
                alertify.error('ไม่สามารถเข้าระบบ')
            }).show()
        }
    }

    render() {
        if (sessionStorage.getItem('token')) { return (<Redirect to={'/HomePage'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_login'><h3>เข้าระบบ</h3></div>
                <div class='login'>
                    <h1>เข้าสู่ระบบ</h1><br />
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon" id="sizing-addon1">@</span>
                        <input type="text" class="form-control" maxLength='4' placeholder="Username" aria-describedby="sizing-addon1" name="userLogin" onChange={this.onChange} required />
                    </div><br />
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon" id="sizing-addon1">#</span>
                        <input type="text" class="form-control" maxLength='4' placeholder="Password" aria-describedby="sizing-addon1" name="userPassword" onChange={this.onChange} required />
                    </div><br />
                    <button type="submit" class="btn btn-default navbar-btn" onClick={this.login}>เข้าสู่ระบบ</button>
                </div >
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userType: state.userType,
});

export default connect(mapStateToProps,
    {
        callCheckUserLogin,
        callCheckUserPassword,
        callCheckUserStatus,
        callGetPermissionDetail,
        writeLogLogin,
        writeLogLoginError,
        callGetLoginNo,
        writeLogLogout
    })
    (withRouter(Login))
