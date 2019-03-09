import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import ClassAttendance from './BodyComponent/ClassAttendance';
import ClassAttendanceSearch from './BodyComponent/ClassAttendanceSearch';
import Configuration from './BodyComponent/Configuration';
import Footer from './FooterComponent/Footer';
import HomePage from './HomePage';
import Login from './BodyComponent/Login';
import NavBar from './HeaderComponent/NavBar';
import Report from './BodyComponent/Report';
import Semester from './BodyComponent/Semester';
import SemesterSearch from './BodyComponent/SemesterSearch';
import Student from './BodyComponent/Student';
import StudentSearch from './BodyComponent/StudentSearch';
import Subject from './BodyComponent/Subject';
import SubjectSearch from './BodyComponent/SubjectSearch';
import Teacher from './BodyComponent/Teacher';
import TeacherSearch from './BodyComponent/TeacherSearch';
import User from './BodyComponent/User';
import UserSearch from './BodyComponent/UserSearch';
import ShowPdfTransaction from './BodyComponent/ShowPdfTransaction';
import ShowPdfAttendance from './BodyComponent/ShowPdfAttendance';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pdf: false
    }
  }
  hide=()=> {
    this.setState({ pdf: true })
  }
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>
          {!this.state.pdf && <NavBar />}
          <Route name="login" exact path="/" component={Login} />
          <Route name="home" exact path="/HomePage" component={HomePage} />
          <Route name="subject" exact path="/Subject" component={Subject} />
          <Route name="subjectSearch" exact path="/SubjectSearch" component={SubjectSearch} />
          <Route name="semester" exact path="/Semester" component={Semester} />
          <Route name="semesterSearch" exact path="/SemesterSearch" component={SemesterSearch} />
          <Route name="student" exact path="/Student" component={Student} />
          <Route name="studentSearch" exact path="/StudentSearch" component={StudentSearch} />
          <Route name="teacher" exact path="/Teacher" component={Teacher} />
          <Route name="teacherSearch" exact path="/TeacherSearch" component={TeacherSearch} />
          <Route name="classAttendance" exact path="/ClassAttendance" component={ClassAttendance} />
          <Route name="classAttendanceSearch" exact path="/ClassAttendanceSearch" component={ClassAttendanceSearch} />
          <Route name="user" exact path="/User" component={User} />
          <Route name="userSearch" exact path="/UserSearch" component={UserSearch} />
          <Route name="configuration" exact path="/Configuration" component={Configuration} />
          <Route name="report" exact path="/Report" component={Report} />
          <Route name="showPdfTransaction" path="/ShowPdfTransaction" render={() => <ShowPdfTransaction hide={this.hide} />} />
          <Route name="showPdfAttendance" path="/ShowPdfAttendance" render={() => <ShowPdfAttendance hide={this.hide} />} />
          {!this.state.pdf && <Footer />}
        </div>
      </Router>
      </Provider>
    )
  }
}
export default App;