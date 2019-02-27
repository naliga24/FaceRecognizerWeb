import { Map } from 'immutable'
import { Redirect, Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import login from './../Prototype/login'
import teacher from './../Prototype/teacher'

class TeacherSearch extends Component {
    constructor() {
        super()

        this.state = {
            search: Map({
                teacherFirstName: '',
                teacherLastName: '',
                teacherClassCount: '',
                teacherStatus: '',
            }),
            tmpTeacherFirstName: '',
            tmpTeacherLastName: '',
            tmpTeacherClassCount: '',
            tmpTeacherStatus: '',
            listSearchTeacher: '',
        };
    }

    componentWillMount = () => {
        this.searchTeacher1()
    }

    searchTeacher = async () => {
        let search = await this.state.search.set('teacherFirstName', this.state.tmpTeacherFirstName)
            .set('teacherLastName', this.state.tmpTeacherLastName)
            .set('teacherClassCount', this.state.tmpTeacherClassCount)
            .set('teacherStatus', this.state.tmpTeacherStatus)
        this.setState({ search });
        let teacherObj = new teacher()
        let listSearchTeacher = await teacherObj.listSearchTeacher(this.state.search)
        this.setState({ listSearchTeacher })
        this.state.listSearchTeacher.length === 0 && alertify.alert('ค้นหา', 'ไม่พบข้อมูลที่ค้นหา', () => {
            alertify.error('ไม่พบข้อมูลที่ค้นหา')
        }).show()
        localStorage.setItem('stateTeacherSearch', JSON.stringify(this.state.search));
        let log = new login()
        log.writeLogLogout('5')
    }

    searchTeacher1 = async () => {
        let stateLocal = localStorage.getItem('stateTeacherSearch')
        let search = await Map(JSON.parse(stateLocal))
        this.setState({ search })
        let teacherObj = new teacher()
        let listSearchTeacher = await teacherObj.listSearchTeacher(this.state.search)
        this.setState({ listSearchTeacher})
        let log = new login()
        log.writeLogLogout('5')
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_teacher_search'><h3>การค้นหาข้อมูล > อาจารย์</h3></div>
                <div class='teacher_search'>
                    <div class='button'>
                        <Link to='/Teacher'> <button type="button" class="btn btn-default navbar-btn">ย้อนกลับ</button></Link>
                    </div>
                    <div class='status'>
                        <div class='top'>
                            <label>ชื่ออาจารย์<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpTeacherFirstName" onChange={this.onChange} /></label>
                            <label>นามสกุล<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpTeacherLastName" onChange={this.onChange} /></label>
                            <label>จำนวนวิชาสอน<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpTeacherClassCount" onChange={this.onChange} /></label>
                            <label id='status'>สถานะ<select class="selectpicker" name="tmpTeacherStatus" onChange={this.onChange}>
                                <option value='' selected={this.state.tmpTeacherStatus == '' ? true : false}>เลือกทั้งหมด</option>
                                <option value='1' selected={this.state.tmpTeacherStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.tmpTeacherStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchTeacher}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
                                Header: 'ชื่ออาจารย์',
                                accessor: 'TEACHER_FIRST_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },

                            },
                            {
                                Header: 'นามสกุล',
                                accessor: 'TEACHER_LAST_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'จำนวนวิชาที่สอน',
                                accessor: 'TEACHER_CLASS_COUNT',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'สถานะ',
                                accessor: 'USE_STATUS_DESCRIPTION',
                                style: {
                                    textAlign: 'center'
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
                                            pathname: "/Teacher",
                                            teacherNo: props.original.TEACHER_NO,
                                            teacherFirstName: props.original.TEACHER_FIRST_NAME,
                                            teacherLastName: props.original.TEACHER_LAST_NAME,
                                            teacherClassCount: props.original.TEACHER_CLASS_COUNT,
                                            teacherStatus: props.original.TEACHER_STATUS,
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.listSearchTeacher ? this.state.listSearchTeacher : []}
                            defaultPageSize={8}
                            noDataText={'ไม่พบข้อมูล'}
                            previousText={'ก่อนหน้า'}
                            nextText={'ถัดไป'}
                        >
                        </ReactTable>
                    </div>
                </div >
            </div>
        );
    }
}

export default TeacherSearch;