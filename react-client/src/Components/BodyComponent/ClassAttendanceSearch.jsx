import { Link, Redirect } from 'react-router-dom';
import { Map } from 'immutable';
import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import ReactTable from 'react-table';
let dateFormat = require('dateformat')

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';

import classAttendance from './../Prototype/classAttendance';
import login from './../Prototype/login';

class ClassAttendanceSearch extends Component {
    constructor() {
        super();
        this.state = {
            search: Map({
                classAttendanceCode: '',
                startDateSTR: '',
                endDateSTR: '',
                studentCodeName: '',
                confirmStatusNo: '',
                subjectNo: '',
                studentNo: '',
                teacherNo: '',
                semesterNo: ''
            }),
            tmpClassAttendanceCode: '',
            tmpStartDate: new Date(),
            tmpStartDateSTR: '',
            tmpEndDate: new Date(),
            tmpEndDateSTR: '',
            tmpStudentCodeName: '',
            tmpConfirmStatusNo: '',
            tmpSubjectNo: '',
            tmpStudentNo: '',
            tmpTeacherNo: '',
            tmpSemesterNo: '',
            dataListClassAttendance: '',
            listSemester: '',
            listSubject: '',
        };
        //stateLocal && (this.state = Object.assign({}, this.state, JSON.parse(stateLocal)))
        this.searchClassAttendance = this.searchClassAttendance.bind(this);
        this.searchClassAttendance1 = this.searchClassAttendance1.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getStudentNo = this.getStudentNo.bind(this);
        this.getListSemester = this.getListSemester.bind(this);
        this.getListSubject = this.getListSubject.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.searchClassAttendance1()
        this.getListSemester()
        this.getListSubject()
    }

    getStudentNo() {
        let classAttendanceObj = new classAttendance()
        classAttendanceObj.callGetStudentNoByStudentCodeName(this.state.search)
        window.setTimeout(() => {
            if (classAttendanceObj.student.returnStudentNo) {
                let search = this.state.search.set('studentNo', classAttendanceObj.student.returnStudentNo)
                this.setState({ search });
            }
        }, 1000);
    }

    getListSemester() {
        let classAttendancetObj1 = new classAttendance()
        classAttendancetObj1.callListSemester()
        setTimeout(() => {
            classAttendancetObj1.semester.listSemester.length > 0 && this.setState({ listSemester: classAttendancetObj1.semester.listSemester })
        }, 1000)
    }

    getListSubject() {
        let classAttendancetObj2 = new classAttendance()
        classAttendancetObj2.callListSubject()
        setTimeout(() => {
            classAttendancetObj2.subject.listSubject.length > 0 && this.setState({ listSubject: classAttendancetObj2.subject.listSubject })
        }, 1000)

    }

    clear() {
        this.setState({ tmpStartDate: new Date(), tmpEndDate: new Date() })
    }

    searchClassAttendance() {
        let search = this.state.search.set('classAttendanceCode', this.state.tmpClassAttendanceCode)
            .set('studentCodeName', this.state.tmpStudentCodeName)
            .set('confirmStatusNo', this.state.tmpConfirmStatusNo)
            .set('subjectNo', this.state.tmpSubjectNo)
            .set('studentNo', this.state.tmpStudentNo)
            .set('teacherNo', this.state.tmpTeacherNo)
            .set('semesterNo', this.state.tmpSemesterNo)
            .set('startDateSTR', dateFormat(this.state.tmpStartDate, "yyyy-mm-dd"))
            .set('endDateSTR', dateFormat(this.state.tmpEndDate, "yyyy-mm-dd"));
            this.setState({ search });
            this.getStudentNo()
            setTimeout(() => {
                let classAttendanceObj = new classAttendance()
                console.log(this.state.search)
                classAttendanceObj.listSearchClassAttendance(this.state.search)
                window.setTimeout(() => {
                    this.setState({ dataListClassAttendance: classAttendanceObj.returnListSearchClassAttendance })
                    if (classAttendanceObj.returnListSearchClassAttendance.length === 0) {
                       alertify.alert('ค้นหา','ไม่พบข้อมูลที่ค้นหา',()=>{
                            //alertify.success('ไม่พบข้อมูล')
                            this.clear()
                            alertify.error('ไม่พบข้อมูล')
                        }).show()
                    }
                    localStorage.setItem('stateClassAttendanceSearch', JSON.stringify(this.state.search));
                }, 1000)
            }, 1000);
   

        let log = new login()
        log.writeLogLogout('10')
    }

    searchClassAttendance1() {
        let stateLocal = localStorage.getItem('stateClassAttendanceSearch')
        let search = Map(JSON.parse(stateLocal))
        this.setState({ search })
        setTimeout(() => {
            let classAttendanceObj = new classAttendance()
            classAttendanceObj.listSearchClassAttendance(this.state.search)
            window.setTimeout(() => {
                this.setState({ dataListClassAttendance: classAttendanceObj.returnListSearchClassAttendance })
            }, 1000);
        }, 1000);
        let log = new login()
        log.writeLogLogout('10')
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(name, date) {
        let change1 = {}
        change1[name] = date
        this.setState(change1);

        let change2 = {}
        change2[name + 'STR'] = dateFormat(date, "yyyy-mm-dd")
        this.setState(change2);
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_configuration'><h3>การค้นหาข้อมูล > การเข้าชั้นเรียนนักศึกษา</h3></div>
                <div class='classattendance_search'>
                    <div class='status'>
                        <div class='top'>
                            <label>รหัสการเข้าชั้นเรียน<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpClassAttendanceCode" onChange={this.onChange} /></label>
                            <label>วันที่เริ่มต้น<DatePicker name="tmpStartDate" selected={this.state.tmpStartDate} onChange={(date) => this.handleChange("tmpStartDate", date)} dateFormat="yyyy/MM/dd" /></label>
                            <label>วันที่สิ้นสุด<DatePicker name="tmpEndDate" selected={this.state.tmpEndDate} onChange={(date) => this.handleChange("tmpEndDate", date)} dateFormat="yyyy/MM/dd" /></label>
                            <label id='status'>ชื่อวิชา
                            <select class="selectpicker" name="tmpSubjectNo" onChange={this.onChange}>
                                    <option hidden>เลือกข้อมูลชื่อวิชา</option>
                                    <option value=''>เลือกทั้งหมด</option>
                                    {
                                        this.state.listSubject ? this.state.listSubject.map((item, index) => (
                                            <option value={item.SUBJECT_NO}>{item.SUBJECT_CODE_NAME}</option>
                                        )) : (<option selected>ไม่มีข้อมูลชื่อวิชา</option>)
                                    }
                                </select>
                            </label>
                            <label>รหัสนักศึกษา<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpStudentCodeName" onChange={this.onChange} /></label>
                        </div>
                        <div class='bottom'>
                            <label id='status'>สถานะการยืนยันตัวตน<select class="selectpicker" name="tmpConfirmStatusNo" onChange={this.onChange}>
                                <option value=''>เลือกทั้งหมด</option>
                                <option value='1'>รอการยืนยันตัวตน</option>
                                <option value='2'>ยืนยันตัวตนแล้ว</option>
                                <option value='3'>ไม่สามารถยืนยันตัวตน</option>
                            </select></label>
                            <label id='second'>สอนภาคการศึกษา
                            <select class="selectpicker" name="tmpSemesterNo" onChange={this.onChange}>
                                    <option hidden>เลือกข้อมูลภาคการศึกษา</option>
                                    <option value=''>เลือกทั้งหมด</option>
                                    {
                                        this.state.listSemester ? this.state.listSemester.map((item, index) => (
                                            <option value={item.SEMESTER_NO} >{item.SEMESTER_NAME} {item.SEMESTER_STATUS_NO === '1' ? item.SEMESTER_STATUS_DESCRIPTION : ''}</option>
                                        )) : (<option selected>ไม่มีข้อมูลภาคการศึกษา</option>)
                                    }
                                </select>
                            </label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchClassAttendance}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
                                Header: 'รหัสการเข้าชั้น',
                                accessor: 'CLASS_ATTENDANCE_CODE',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 110,
                                maxWidth: 110,
                                minWidth: 110,
                            },
                            {
                                Header: 'วันที่',
                                accessor: 'CLASS_ATTENDANCE_DATE',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                Header: 'เวลา',
                                accessor: 'CLASS_ATTENDANCE_TIME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                id: 'classAttendancePosition',
                                Header: 'พิกัด',
                                filterable: true,
                                accessor: d => `${d.CLASS_ATTENDANCE_LAT},${d.CLASS_ATTENDANCE_LNG}`,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 180,
                                maxWidth: 180,
                                minWidth: 180,
                            },
                            {
                                Header: 'รหัสวิชา',
                                accessor: 'SUBJECT_CODE_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                id: 'teacherFullName',
                                Header: 'อาจารย์ผู้สอน',
                                filterable: true,
                                accessor: d => `${d.TEACHER_FIRST_NAME} ${d.TEACHER_LAST_NAME}`,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'รหัสนักศึกษา',
                                accessor: 'STUDENT_CODE_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                id: 'studentFullName',
                                Header: 'ชื่อนักศึกษา',
                                filterable: true,
                                accessor: d => `${d.STUDENT_FIRST_NAME} ${d.STUDENT_LAST_NAME}`,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'สถานะนักศึกษา',
                                accessor: 'USE_STATUS_DESCRIPTION',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                Header: 'ภาค',
                                accessor: 'SEMESTER_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 50,
                                maxWidth: 50,
                                minWidth: 50,
                            },
                            {
                                Header: 'สถานะภาค',
                                accessor: 'SEMESTER_STATUS_DESCRIPTION',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 100,
                                maxWidth: 100,
                                minWidth: 100,
                            },
                            {
                                Header: 'สถานะการเข้าชั้น',
                                accessor: 'CONFIRM_STATUS_DESCRIPTION',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                                width: 130,
                                maxWidth: 130,
                                minWidth: 130,
                            },
                            {
                                Header: 'ยืนยัน',
                                style: {
                                    textAlign: 'center'
                                },
                                width: 50,
                                maxWidth: 50,
                                minWidth: 50,
                                Cell: props => {
                                    return (
                                        <Link to={{
                                            pathname: "/ClassAttendance",
                                            classAttendanceCode: props.original.CLASS_ATTENDANCE_CODE,
                                            classAttendanceDate: props.original.CLASS_ATTENDANCE_DATE,
                                            classAttendanceTime: props.original.CLASS_ATTENDANCE_TIME,
                                            classAttendanceLat: props.original.CLASS_ATTENDANCE_LAT,
                                            classAttendanceLng: props.original.CLASS_ATTENDANCE_LNG,
                                            classAttendanceImage: props.original.CLASS_ATTENDANCE_IMAGE,
                                            classAttendanceStudentKeyCodeName: props.original.CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME,
                                            studentNo: props.original.STUDENT_NO,
                                            studentImage: props.original.STUDENT_IMAGE,
                                            studentCodeName: props.original.STUDENT_CODE_NAME,
                                            studentFirstName: props.original.STUDENT_FIRST_NAME,
                                            studentLastName: props.original.STUDENT_LAST_NAME,
                                            useStatusDescription: props.original.USE_STATUS_DESCRIPTION,
                                            subjectCodeName: props.original.SUBJECT_CODE_NAME,
                                            teacherFirstName: props.original.TEACHER_FIRST_NAME,
                                            teacherLastName: props.original.TEACHER_LAST_NAME,
                                            semesterName: props.original.SEMESTER_NAME,
                                            semesterStatusDescription: props.original.SEMESTER_STATUS_DESCRIPTION,
                                            confirmStatusNo: props.original.CONFIRM_STATUS_NO,
                                            confirmStatusDescription: props.original.CONFIRM_STATUS_DESCRIPTION,
                                            flagConfirm: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" disabled={props.original.CONFIRM_STATUS_NO != '1'}><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            {
                                Header: 'แก้ไข',
                                style: {
                                    textAlign: 'center'
                                },
                                width: 50,
                                maxWidth: 50,
                                minWidth: 50,
                                Cell: props => {
                                    return (
                                        <Link to={{
                                            pathname: "/ClassAttendance",
                                            classAttendanceCode: props.original.CLASS_ATTENDANCE_CODE,
                                            classAttendanceDate: props.original.CLASS_ATTENDANCE_DATE,
                                            classAttendanceTime: props.original.CLASS_ATTENDANCE_TIME,
                                            classAttendanceLat: props.original.CLASS_ATTENDANCE_LAT,
                                            classAttendanceLng: props.original.CLASS_ATTENDANCE_LNG,
                                            classAttendanceImage: props.original.CLASS_ATTENDANCE_IMAGE,
                                            classAttendanceStudentKeyCodeName: props.original.CLASS_ATTENDANCE_STUDENT_KEY_CODE_NAME,
                                            studentNo: props.original.STUDENT_NO,
                                            studentImage: props.original.STUDENT_IMAGE,
                                            studentCodeName: props.original.STUDENT_CODE_NAME,
                                            studentFirstName: props.original.STUDENT_FIRST_NAME,
                                            studentLastName: props.original.STUDENT_LAST_NAME,
                                            useStatusDescription: props.original.USE_STATUS_DESCRIPTION,
                                            subjectCodeName: props.original.SUBJECT_CODE_NAME,
                                            teacherFirstName: props.original.TEACHER_FIRST_NAME,
                                            teacherLastName: props.original.TEACHER_LAST_NAME,
                                            semesterName: props.original.SEMESTER_NAME,
                                            semesterStatusDescription: props.original.SEMESTER_STATUS_DESCRIPTION,
                                            confirmStatusNo: props.original.CONFIRM_STATUS_NO,
                                            confirmStatusDescription: props.original.CONFIRM_STATUS_DESCRIPTION,
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" disabled={props.original.CONFIRM_STATUS_NO === '1'}><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.dataListClassAttendance ? this.state.dataListClassAttendance : []}
                            defaultPageSize={8}
                            noDataText={'ไม่พบข้อมูล'}
                            previousText={'ก่อนหน้า'}
                            nextText={'ถัดไป'}
                        >
                        </ReactTable>
                    </div>
                </div>
            </div>
        )
    }
}
export default ClassAttendanceSearch;