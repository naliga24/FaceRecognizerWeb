import { Redirect } from 'react-router-dom'
import React, { Component } from 'react'

import login from './../Prototype/login'


class Login extends Component {
    constructor() {
        super()

        this.state = {
            userLogin: '',
            userPassword: '',
        };

    }

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    }

    login=() =>{
        if(this.state.userLogin && this.state.userPassword){
            let tmp = new login()
            tmp.callCheckUserLogin(this.state.userLogin)
            setTimeout(() => {
                if (tmp.data3.data3 === '1') {
                    tmp.callCheckUserPassword(this.state.userLogin,this.state.userPassword)
                    setTimeout(() => {
                        if (tmp.data4.data4 === '1') {
                            tmp.callCheckUserStatus(this.state.userLogin,this.state.userPassword)
                            setTimeout(() => {
                                if(tmp.data5.data5 === '1'){
                                    tmp.callGetPermissionDetail(this.state.userLogin,this.state.userPassword)
                                    setTimeout(() => {
                                        tmp.writeLogLogin('1')
                                        window.location.reload()
                                    }, 2000);
                                }else if(tmp.data5.data5 === '0'){
                                    alertify.alert('เข้าระบบ',`สถานะผู้ใช้ระบบเท่ากับ “ไม่ใช้งาน”`,()=>{
                                        alertify.error('ไม่สามารถเข้าระบบ')
                                    }).show()
                                }
                            }, 2000);
                        } else if(tmp.data4.data4 === '0'){
                            alertify.alert('เข้าระบบ',`ชื่อ password ไม่ถูกต้อง`,()=>{
                                alertify.error('ไม่สามารถเข้าระบบ')
                            }).show()
                            tmp.writeLogLoginError('11',this.state.userLogin)
                        }
                    }, 2000);
                } else if(tmp.data3.data3 === '0') {
                    alertify.alert('เข้าระบบ',`ชื่อ username ไม่ถูกต้อง`,()=>{
                        alertify.error('ไม่สามารถเข้าระบบ')
                    }).show()
                }
            }, 2000);
        }else{
            alertify.alert('เข้าระบบ',`กรอกข้อมูลไม่ครบ`,()=>{
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

export default Login;