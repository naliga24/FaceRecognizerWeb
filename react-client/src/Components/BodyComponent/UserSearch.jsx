import { Map } from 'immutable'
import { Redirect, Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import login from './../Prototype/login'
import user from './../Prototype/user'

class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
            search: Map({
                userLogin: '',
                userName: '',
            }),
            tmpUserLogin: '',
            tmpUserName: '',
            listSearchUser: '',
        };
    }

    componentWillMount = () => {
        this.searchUser1()
    }

    searchUser = async () => {
        let search = await this.state.search.set('userLogin', this.state.tmpUserLogin)
            .set('userName', this.state.tmpUserName)
        this.setState({ search });
        let userObj = new user()
        let listSearchUser = await userObj.searchUser(this.state.search)
        this.setState({ listSearchUser })
        this.state.listSearchUser.length === 0 && alertify.alert('ค้นหา', 'ไม่พบข้อมูลที่ค้นหา', () => {
            alertify.error('ไม่พบข้อมูลที่ค้นหา')
        }).show()
        localStorage.setItem('stateUserSearch', JSON.stringify(this.state.search));
        let log = new login()
        log.writeLogLogout('9')
    }

    searchUser1 = async() => {
        let stateLocal = localStorage.getItem('stateUserSearch')
        let search = await Map(JSON.parse(stateLocal))
        this.setState({ search })
            let userObj = new user()
            let listSearchUser = await userObj.searchUser(this.state.search)
                this.setState({ listSearchUser })
        let log = new login()
        log.writeLogLogout('9')
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_user_search'><h3>การค้นหาข้อมูล > ผู้ใช้งานระบบ</h3></div>
                <div class='user_search'>
                    <div class='button'>
                        <Link to='/User'> <button type="button" class="btn btn-default navbar-btn">ย้อนกลับ</button></Link>
                    </div>
                    <div class='status'>
                        <div class='top'>
                            <label>ชื่อในการเข้าใช้ระบบ<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpUserLogin" onChange={this.onChange} /></label>
                            <label>ชื่อผู้ใช้งานระบบ<input type="text" class="form-control" aria-describedby="sizing-addon1" name="tmpUserName" onChange={this.onChange} /></label>
                            <button type="button" class="btn btn-default navbar-btn" onClick={this.searchUser}>ค้นหา</button>
                        </div>
                    </div>
                    <div class='table'>
                        <ReactTable
                            columns={[{
                                Header: 'ชื่อในการเข้าระบบ',
                                accessor: 'USER_LOGIN',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                },
                            },
                            {
                                Header: 'ชื่อผู้ใช้งานระบบ',
                                accessor: 'USER_NAME',
                                filterable: true,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                Header: 'ประเภทผู้ใช้งานระบบ',
                                accessor: 'USER_TYPE_NAME',
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
                                        <Link onClick={(e) => props.original.USER_TYPE == '0' ? e.preventDefault() : ''} to={{
                                            pathname: "/User",
                                            userNo: props.original.USER_NO,
                                            userLogin: props.original.USER_LOGIN,
                                            userPassword: props.original.USER_PASSWORD,
                                            userName: props.original.USER_NAME,
                                            userType: props.original.USER_TYPE,
                                            userStatus: props.original.USER_STATUS,
                                            flagEdit: true,
                                        }} ><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" disabled={props.original.USER_TYPE == '0'}><span class="glyphicon glyphicon-pencil"></span></button></p>
                                        </Link>
                                    )
                                }
                            },
                            ]}
                            data={this.state.listSearchUser ? this.state.listSearchUser : []}
                            defaultPageSize={8}
                            noDataText={'ไม่พบข้อมูล'}
                            previousText={'ก่อนหน้า'}
                            nextText={'ถัดไป'}
                        >
                        </ReactTable>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSearch;