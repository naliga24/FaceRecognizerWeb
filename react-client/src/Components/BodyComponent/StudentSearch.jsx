import { Map } from 'immutable'
import { Redirect, Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import login from './../Prototype/login'
import student from './../Prototype/student'

class StudentSearch extends Component {
    constructor() {
        super()

        this.state = {
            search: Map({
                studentCodeName: '',
                studentFirstName: '',
                studentLastName: '',
                studentStatus: '',
            }),
            tmpStudentCodeName: '',
            tmpStudentFirstName: '',
            tmpStudentLastName: '',
            tmpStudentStatus: '',
            listSearchStudent: '',
        };
    }

    componentWillMount = () => {
        this.searchStudent1()
    }

    searchStudent = async () => {
        try {
            let search = await this.state.search.set('studentCodeName', this.state.tmpStudentCodeName)
                .set('studentFirstNam e', this.state.tmpStudentFirstName)
                .set('studentLastName', this.state.tmpStudentLastName)
                .set('studentStatus', this.state.tmpStudentStatus)
            this.setState({ search });
            let studentObj = new student()
            let listSearchStudent = await studentObj.listSearchStudent(this.state.search)
            this.setState({ listSearchStudent })
            this.state.listSearchStudent.length === 0 && alertify.alert('ค้นหา', 'ไม่พบข้อมูลที่ค้นหา', () => {
                alertify.error('ไม่พบข้อมูลที่ค้นหา')
            }).show()
            localStorage.setItem('stateStudentSearch', JSON.stringify(this.state.search));
        } catch (err) {
            alertify.alert('วิชาเปิดสอน', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            let log = new login()
            log.writeLogLogout('4')
        }
    }

    searchStudent1 = async () => {
        try {
            let stateLocal = localStorage.getItem('stateStudentSearch')
            let search = await Map(JSON.parse(stateLocal))
            this.setState({ search })
            let studentObj = new student()
            let listSearchStudent = await studentObj.listSearchStudent(this.state.search)
            this.setState({ listSearchStudent })
        } catch (err) {
            console.log(err)
        } finally {
            let log = new login()
            log.writeLogLogout('4')
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_student_search'><h3>การค้นหาข้อมูล > นักศึกษา</h3></div>
                <div class='student_search'>
                    <div class='button'>
                        <Link to='/Student'> <button type="button" class="btn btn-default navbar-btn">ย้อนกลับ</button></Link>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>รหัสนักศึกษา<input type="number" maxLength="10" class="form-control" aria-describedby="sizing-addon1" name="tmpStudentCodeName" onChange={this.onChange} /></label>
                            <label>ชื่อ<input type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="tmpStudentFirstName" onChange={this.onChange} /></label>
                            <label>นามสกุล<input type="text" maxLength="50" class="form-control" aria-describedby="sizing-addon1" name="tmpStudentLastName" onChange={this.onChange} /></label>
                            <label id='status'>สถานะ<select class="selectpicker" name="tmpStudentStatus" onChange={this.onChange}>
                                <option value='' selected={this.state.tmpStudentStatus == '' ? true : false}>เลือกทั้งหมด</option>
                                <option value='1' selected={this.state.tmpStudentStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.tmpStudentStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchStudent}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
                                Header: 'รหัสนักศึกษา',
                                accessor: 'STUDENT_CODE_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },

                            },
                            {
                                Header: 'ชื่อ',
                                accessor: 'STUDENT_FIRST_NAME',
                                filterable: true,

                            },
                            {
                                Header: 'นามสกุล',
                                accessor: 'STUDENT_LAST_NAME',
                                filterable: true,

                            },
                            {
                                Header: 'สถานะ',
                                accessor: 'USE_STATUS_DESCRIPTION',
                                style: {
                                    textAlign: 'center'
                                },

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
                                            pathname: "/Student",
                                            studentNo: props.original.STUDENT_NO,
                                            studentCodeName: props.original.STUDENT_CODE_NAME,
                                            studentFirstName: props.original.STUDENT_FIRST_NAME,
                                            studentLastName: props.original.STUDENT_LAST_NAME,
                                            studentStatus: props.original.STUDENT_STATUS,
                                            studentImage: props.original.STUDENT_IMAGE,
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.listSearchStudent ? this.state.listSearchStudent : []}
                            defaultPageSize={8}
                            noDataText={'ไม่พบข้อมูล'}
                        >
                        </ReactTable>
                    </div>
                </div >
            </div>
        );
    }
}

export default StudentSearch;