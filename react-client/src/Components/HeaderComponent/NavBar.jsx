import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import  login  from './../Prototype/login'

let auth = sessionStorage.getItem('token');

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '00000000',
      userName:'',
    }

    this.logout = this.logout.bind(this);
    this.openPageSubject = this.openPageSubject.bind(this);
    this.openPageSemester = this.openPageSemester.bind(this);
    this.openPageStudent = this.openPageStudent.bind(this);
    this.openPageTeacher = this.openPageTeacher.bind(this);
    this.openPageClassAttendanceSearch = this.openPageClassAttendanceSearch.bind(this);
    this.openPageUser = this.openPageUser.bind(this);
    this.openPageReport = this.openPageReport.bind(this);
    this.openPageConfiguration = this.openPageConfiguration.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillMount() {
    let tmp = new login()
    if (auth) {
      tmp.callSetPermission()
      tmp.getUserName()
      this.setState({ data: tmp.data2.data, userName:tmp.data7})
    }
  }

  logout() {
    let tmp = new login()
    tmp.writeLogLogout('9')
  }

  openPageSubject() {
    this.props.history.push('/Subject');
  }

  openPageSemester() {
    this.props.history.push('/Semester');
  }

  openPageStudent() {
    this.props.history.push('/Student');
  }

  openPageTeacher() {
    this.props.history.push('/Teacher');
  }

  openPageClassAttendanceSearch() {
    this.props.history.push('/ClassAttendanceSearch');
  }

  openPageUser() {
    this.props.history.push('/User');
  }

  openPageReport() {
    this.props.history.push('/Report');
  }

  openPageConfiguration() {
    this.props.history.push('/Configuration');
  }

  clear() {
    this.setState({ data: '00000000',userName:'' });
    sessionStorage.removeItem('token')
  }

  render() {
    return (
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <ul class="nav nav-tabs">
          {this.state.data ? this.state.data[0] === '1' ?  (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageSubject}> <a class="nav-link" href="#">วิชาเปิดสอน</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[1] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageSemester}> <a class="nav-link" href="#">ภาคการศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[2] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageStudent}><a class="nav-link" href="#">นักศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[3] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageTeacher}><a class="nav-link" href="#">อาจารย์</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[4] === '1' ?  (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageClassAttendanceSearch}> <a class="nav-link" href="#">การเข้าชั้นเรียนนักศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[5] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageUser}> <a class="nav-link" href="#">ผู้ใช้งานระบบ</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[6] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageReport}><a class="nav-link" href="#">รายงาน</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data ? this.state.data[7] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageConfiguration}><a class="nav-link" href="#">การตั่งค่า</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.data !== '00000000' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={()=>{this.logout();this.clear()}}><a class="nav-link" href="#">ออกจากระบบ</a></li>) : (<li></li>)}</ul>
        </div>
        <h3><b><i><mark>{this.state.userName}</mark></i></b></h3>
      </nav>
    )
  }
}

let linkStyle = {
  color: "#777",
  fontWeight: "bold",
  textDecorationLine: "none",
  letterSpacing: 0.25,
};

export default withRouter(NavBar);