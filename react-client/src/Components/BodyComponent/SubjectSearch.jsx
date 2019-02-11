import { Map } from 'immutable'
import { Redirect, Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import  login  from './../Prototype/login'
import  subject  from './../Prototype/subject'

class SubjectSearch extends Component {
    constructor() {
        super()
        this.state = {
            search: Map({
                subjectCodeName: '',
                subjectName: '',
                teacherFirstName: '',
                teacherLastName: '',
                subjectStatus: '',
            }),
            tmpSubjectCodeName: '',
            tmpSubjectName: '',
            tmpTeacherFirstName: '',
            tmpTeacherLastName: '',
            tmpSubjectStatus: '',
            dataListSubject: '',
        };
        //stateLocal && (this.state = Object.assign({}, this.state, JSON.parse(stateLocal)))

        this.searchSubject = this.searchSubject.bind(this)
        this.searchSubject1 = this.searchSubject1.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.searchSubject1()
    }

    searchSubject() {
        let search = this.state.search.set('subjectCodeName', this.state.tmpSubjectCodeName)
            .set('subjectName', this.state.tmpSubjectName)
            .set('teacherFirstName', this.state.tmpTeacherFirstName)
            .set('teacherLastName', this.state.tmpTeacherLastName)
            .set('subjectStatus', this.state.tmpSubjectStatus)
            this.setState({ search });
            setTimeout(() => {
        let subjectObj = new subject()
        subjectObj.listSearchSubject(this.state.search)
        window.setTimeout(() => {
            this.setState({ dataListSubject: subjectObj.returnListSearchSubject })
            subjectObj.returnListSearchSubject.length === 0 && alertify.alert('ค้นหา','ไม่พบข้อมูลที่ค้นหา',()=>{
                alertify.error('ไม่พบข้อมูลที่ค้นหา')
            }).show()
            localStorage.setItem('stateSubjectSearch', JSON.stringify(this.state.search));
        }, 1000);
    }, 1000);
        let log = new login()
        log.writeLogLogout('2')
        
    }


    searchSubject1() {
        let stateLocal = localStorage.getItem('stateSubjectSearch')
        let search = Map(JSON.parse(stateLocal))
        this.setState({ search })
        setTimeout(() => {
            let subjectObj = new subject()
            subjectObj.listSearchSubject(this.state.search)
            window.setTimeout(() => {
                this.setState({ dataListSubject: subjectObj.returnListSearchSubject })
            }, 1000);
        }, 1000);
        let log = new login()
        log.writeLogLogout('2')
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_subject_search'><h3>การค้นหาข้อมูล > วิชาเปิดสอน</h3></div>
                <div class='subject_search'>
                    <div class='button'>
                        <Link to='/Subject'> <button type="button" class="btn btn-default navbar-btn">ย้อนกลับ</button></Link>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>รหัสวิชา<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpSubjectCodeName" onChange={this.onChange} /></label>
                            <label>ชื่อวิชา<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpSubjectName" onChange={this.onChange} /></label>
                            <label>ชื่ออาจารย์<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpTeacherFirstName" onChange={this.onChange} /></label>
                            <label>นามสกุลอาจารย์<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpTeacherLastName" onChange={this.onChange} /></label>
                            <label id='status'>สถานะวิชา<select class="selectpicker" name="tmpSubjectStatus" onChange={this.onChange}>
                                <option value='' selected={this.state.tmpSubjectStatus == '' ? true : false}>เลือกทั้งหมด</option>
                                <option value='1' selected={this.state.tmpSubjectStatus == '1' ? true : false}>ใช้งาน</option>
                                <option value='2' selected={this.state.tmpSubjectStatus == '2' ? true : false}>ไม่ใช้งาน</option>
                            </select></label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchSubject}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
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
                                Header: 'ชื่อวิชา',
                                accessor: 'SUBJECT_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'รายละเอียดวิชา',
                                accessor: 'SUBJECT_DESCRIPTION',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                id: 'teacherFullName',
                                Header: 'อาจารย์ประจำวิชา',
                                accessor: d => `${d.TEACHER_FIRST_NAME} ${d.TEACHER_LAST_NAME}`,
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'สถานะวิชา',
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
                                            pathname: "/Subject",
                                            subjectNo: props.original.SUBJECT_NO,
                                            subjectCodeName: props.original.SUBJECT_CODE_NAME,
                                            subjectName: props.original.SUBJECT_NAME,
                                            subjectDescription: props.original.SUBJECT_DESCRIPTION,
                                            teacherNo: props.original.TEACHER_NO,
                                            subjectStatus: props.original.SUBJECT_STATUS,
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.dataListSubject ? this.state.dataListSubject : []}
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

export default SubjectSearch;