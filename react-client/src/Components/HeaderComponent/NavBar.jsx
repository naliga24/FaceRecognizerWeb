import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  writeLogLogout,
  callSetPermission,
  getUserName
} from './../Actions/Login'

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTypePermission: '00000000',
      userName: '',
    }
  }

  componentWillMount = async () => {
    let auth = sessionStorage.getItem('token');
    if (auth) {
      await this.props.callSetPermission()
      await this.props.getUserName()
      this.setState({ userTypePermission: this.props.menu.userTypePermission, userName: this.props.login.userName })
    }
  }

  removeStroage = () => {
    let keysToRemove =
      ["stateClassAttendanceSearch",
        "stateSemesterSearch",
        "stateStudentSearch",
        "stateSubjectSearch",
        "stateTeacherSearch",
        "stateUserSearch"];
    keysToRemove.forEach(i => localStorage.removeItem(i))
    sessionStorage.removeItem('token')
  }

  logout = () => {
    this.props.writeLogLogout('9')
  }

  openPageSubject = () => {
    this.props.history.push('/Subject');
  }

  openPageSemester = () => {
    this.props.history.push('/Semester');
  }

  openPageStudent = () => {
    this.props.history.push('/Student');
  }

  openPageTeacher = () => {
    this.props.history.push('/Teacher');
  }

  openPageClassAttendanceSearch = () => {
    this.props.history.push('/ClassAttendanceSearch');
  }

  openPageUser = () => {
    this.props.history.push('/User');
  }

  openPageReport = () => {
    this.props.history.push('/Report');
  }

  openPageConfiguration = () => {
    this.props.history.push('/Configuration');
  }

  clear = () => {
    this.setState({ userTypePermission: '00000000', userName: '' });
    this.removeStroage()
  }

  render() {
    return (
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <ul class="nav nav-tabs">
            {this.state.userTypePermission ? this.state.userTypePermission[0] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageSubject}> <a class="nav-link" href="#">วิชาเปิดสอน</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[1] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageSemester}> <a class="nav-link" href="#">ภาคการศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[2] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageStudent}><a class="nav-link" href="#">นักศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[3] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageTeacher}><a class="nav-link" href="#">อาจารย์</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[4] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageClassAttendanceSearch}> <a class="nav-link" href="#">การเข้าชั้นเรียนนักศึกษา</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[5] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageUser}> <a class="nav-link" href="#">ผู้ใช้งานระบบ</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[6] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageReport}><a class="nav-link" href="#">รายงาน</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission ? this.state.userTypePermission[7] === '1' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={this.openPageConfiguration}><a class="nav-link" href="#">การตั่งค่า</a></li>) : (<li></li>) : (<li></li>)}
            {this.state.userTypePermission !== '00000000' ? (<li class="nav-item" style={linkStyle} role="presentation" onClick={() => { this.logout(); this.clear() }}><a class="nav-link" href="#">ออกจากระบบ</a></li>) : (<li></li>)}</ul>
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

const mapStateToProps = state => ({
  menu: state.menu,
  login: state.login
});

export default connect(mapStateToProps,
  {
    writeLogLogout,
    callSetPermission,
    getUserName
  })
  (withRouter(NavBar))