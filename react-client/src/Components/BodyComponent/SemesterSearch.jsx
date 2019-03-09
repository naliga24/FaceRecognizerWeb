import { Map } from 'immutable'
import { Redirect, Link,withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import {
    listSearchSemester
} from './../Actions/Semester'
import {
    writeLogLogout
} from './../Actions/Login'

class SemesterSearch extends Component {
    constructor() {
        super()

        this.state = {
            search: Map({
                semesterStatusNo: '',
                semesterTerm: '',
                semesterYear: '',
            }),
            tmpSemesterStatusNo: '',
            tmpSemesterTerm: '',
            tmpSemesterYear: '',
            listSearchSemester: '',
        };
    }

    componentDidMount = () => {
        this.searchSemester1()
    }

    searchSemester = async () => {
        try {
        let search = await this.state.search.set('semesterStatusNo', this.state.tmpSemesterStatusNo)
            .set('semesterTerm', this.state.tmpSemesterTerm)
            .set('semesterYear', this.state.tmpSemesterYear)
        this.setState({ search });
        await this.props.listSearchSemester(this.state.search)
        this.setState({ listSearchSemester: this.props.semester.listSearchSemester })
        this.state.listSearchSemester.length === 0 && alertify.alert('ค้นหา', 'ไม่พบข้อมูลที่ค้นหา', () => {
            alertify.error('ไม่พบข้อมูล')
        }).show()
        localStorage.setItem('stateSemesterSearch', JSON.stringify(this.state.search));
        } catch (err) {
            alertify.alert('ภาคการศึกษา', err, () => {
                alertify.error('เกิดข้อผิดพลาด')
            }).show()
        } finally {
            this.props.writeLogLogout('3')
        }
    }

    searchSemester1 = async () => {
        try {
            let stateLocal = localStorage.getItem('stateSemesterSearch')
            let search = await Map(JSON.parse(stateLocal))
            this.setState({ search })
            await this.props.listSearchSemester(this.state.search)
            this.setState({ listSearchSemester: this.props.semester.listSearchSemester })
        } catch (err) {
            console.log(err)
        } finally {
            this.props.writeLogLogout('3')
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_semester_search'><h3>การค้นหาข้อมูล > ภาคการศึกษา</h3></div>
                <div class='semester_search'>
                    <div class='button'>
                        <Link to='/Semester'> <button type="button" class="btn btn-default navbar-btn">ย้อนกลับ</button></Link>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label>ภาคการศึกษา<input type="text" maxLength='1' class="form-control" aria-describedby="sizing-addon1" name="tmpSemesterTerm" onChange={this.onChange} /></label>
                            <label>ปีการการศึกษา<input type="number" min='0' maxLength='2' class="form-control" aria-describedby="sizing-addon1" name="tmpSemesterYear" onChange={this.onChange} /></label>
                            <label id='status'>สถานะ<select class="selectpicker" name="tmpSemesterStatusNo" onChange={this.onChange} >
                                <option value=''>ทุกภาคการศึกษา</option>
                                <option value='1'>ภาคปัจจุบัน</option>
                                <option value='2'>ภาคผ่านมาแล้ว</option>
                            </select></label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchSemester}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
                                Header: 'ชื่อภาคการศึกษา',
                                accessor: 'SEMESTER_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },

                            },
                            {
                                Header: 'สถานะภาคการศึกษา',
                                accessor: 'SEMESTER_STATUS_DESCRIPTION',
                                filterable: true,
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
                                            pathname: "/Semester",
                                            semesterNo: props.original.SEMESTER_NO,
                                            semesterName: props.original.SEMESTER_NAME,
                                            semesterStatusNo: props.original.SEMESTER_STATUS_NO,
                                            tmpSemesterTerm: props.original.SEMESTER_NAME.substring(0, 1),
                                            tmpSemesterYear: props.original.SEMESTER_NAME.substring(2, 4),
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.listSearchSemester ? this.state.listSearchSemester : []}
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

const mapStateToProps = state => ({
    semester: state.semester
});

export default connect(mapStateToProps,
    {
        listSearchSemester,
        writeLogLogout
    })
    (withRouter(SemesterSearch))