import { Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import login from './../Prototype/login';
import semester from './../Prototype/semester';

class Semester extends Component {
    constructor(props) {
        super(props)
        this.state = {
            semesterNo: this.props.location.semesterNo,
            semesterName: this.props.location.semesterName,
            semesterStatusNo: this.props.location.semesterStatusNo,
            oldSemesterName: this.props.location.semesterName,
            oldSemesterStatusNo: this.props.location.semesterStatusNo,
            tmpSemesterTerm: this.props.location.tmpSemesterTerm,
            tmpSemesterYear: this.props.location.tmpSemesterYear,
            flagEdit: this.props.location.flagEdit,
            buttonDisble: this.props.location.flagEdit,
        };
    }

    saveSemester=async()=> {
        if (this.state.tmpSemesterTerm && this.state.tmpSemesterYear) {
            let semesterObj = new semester()
            if ((this.state.semesterName !== this.state.oldSemesterName)
                || (this.state.semesterStatusNo !== this.state.oldSemesterStatusNo)) {
                if (this.state.semesterName !== this.state.oldSemesterName) {
                        if (await semesterObj.checkSemesterName(this.state.semesterName) === '0') {
                            if (this.state.flagEdit) {
                                semesterObj.editSemester(this.state, this.clear)
                                alertify.alert('แก้ไข', `แก้ไขข้อมูลภาคศึกษา "${this.state.semesterName}" เรียบร้อย`, () => {
                                    this.gotoSemesterSearch()
                                }).show()
                            } else {
                                semesterObj.addSemester(this.state.semesterName, this.clear)
                                alertify.alert('เพิ่ม', `เพิ่มข้อมูลข้อมูลภาคศึกษา "${this.state.semesterName}" เรียบร้อย`, () => {
                                    alertify.success(`เพิ่มข้อมูลเรียบร้อย`)
                                }).show()
                            }
                        } else if (await semesterObj.checkSemesterName(this.state.semesterName) === '1' && this.state.flagEdit) {
                            alertify.alert('แก้ไข', `ไม่สามารถแก้ไขข้อมูลภาคศึกษา "${this.state.semesterName}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถแก้ไขข้อมูล')
                            }).show()
                        }
                        else if (await semesterObj.checkSemesterName(this.state.semesterName) === '1' && !this.state.flagEdit) {
                            alertify.alert('เพิ่ม', `ไม่สามารถเพิ่มข้อมูลภาคศึกษา "${this.state.semesterName}" ชื่อมีในระบบแล้ว`, () => {
                                alertify.error('ไม่สามารถเพิ่มข้อมูล')
                            }).show()
                        }
                } else if (this.state.flagEdit) {
                    semesterObj.editSemester(this.state, this.clear)
                    alertify.alert('แก้ไข', `แก้ไขข้อมูลภาคศึกษา "${this.state.semesterName}" เรียบร้อย`, () => {
                        this.gotoSemesterSearch()
                    }).show()
                }
            } else if (this.state.flagEdit) {
                alertify.alert('แก้ไข', `ข้อมูลไม่มีการเปลี่ยนแปลง`, () => {
                    alertify.success(`ข้อมูลไม่มีการเปลี่ยนแปลง`)
                }).show()
            }
        } else if (!this.state.tmpSemesterTerm) {
            alertify.alert('เพิ่ม', `โปรดระบุภาคการศึกษา`, () => {
                alertify.error('โปรดระบุภาคการศึกษา')
            }).show()
        }
        else if (!this.state.tmpSemesterYear) {
            alertify.alert('เพิ่ม', `โปรดระบุปีการศึกษา`, () => {
                alertify.error('โปรดระบุปีการศึกษา')
            }).show()
        }
        let log = new login()
        log.writeLogLogout('3')
    }

    add=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble });
    }

    clear=()=> {
        this.setState({ buttonDisble: !this.state.buttonDisble, flagEdit: false, semesterName: '', tmpSemesterTerm: '', tmpSemesterYear: '', semesterStatusNo: '' })
    }

    onChange=(e)=> {
        this.setState({ [e.target.name]: e.target.value }, () => { this.setState({ semesterName: this.state.tmpSemesterTerm + '/' + this.state.tmpSemesterYear }) })
    }

    gotoSemesterSearch=()=> {
        this.props.history.push('/semesterSearch');
    }

    render() {
        if (!sessionStorage.getItem('token')) { return (<Redirect to={'/'} />) }
        return (
            <div class='outer'>
                <div class="alert alert-info" role="alert" id='header_semester'><h3>การเพิ่มข้อมูล > ภาคการศึกษา</h3></div>
                <div class='semester'>
                    <div class='button'>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.add} disabled={this.state.buttonDisble}>เพิ่มข้อมูล</button>
                        <button type="submit" class="btn btn-default navbar-btn" onClick={this.saveSemester} disabled={!this.state.buttonDisble}>บันทึกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.clear} disabled={!this.state.buttonDisble}>ยกเลิกข้อมูล</button>
                        <button type="button" class="btn btn-default navbar-btn" onClick={this.gotoSemesterSearch}>ค้นหาข้อมูล</button>
                    </div>

                    <div class='status'>
                        <div class='top'>
                            <label id='status'>ภาคการศึกษา<select class="selectpicker" name="tmpSemesterTerm" onChange={this.onChange} disabled={!this.state.buttonDisble}>
                                <option hidden>เลือกภาคการศึกษา</option>
                                <option value='1' selected={this.state.tmpSemesterTerm == '1' ? true : false}>1</option>
                                <option value='2' selected={this.state.tmpSemesterTerm == '2' ? true : false}>2</option>
                                <option value='s' selected={this.state.tmpSemesterTerm == 's' ? true : false}>s</option>
                            </select></label>
                            <h3 id='slash'><b>/</b></h3>
                            <label id='status'>ปีการศึกษา<select class="selectpicker" name="tmpSemesterYear" onChange={this.onChange} disabled={!this.state.buttonDisble}>
                                <option hidden>เลือกปีการศึกษา</option>
                                <option value='61' selected={this.state.tmpSemesterYear == '61' ? true : false}>61</option>
                                <option value='62' selected={this.state.tmpSemesterYear == '62' ? true : false}>62</option>
                                <option value='63' selected={this.state.tmpSemesterYear == '63' ? true : false}>63</option>
                                <option value='64' selected={this.state.tmpSemesterYear == '64' ? true : false}>64</option>
                                <option value='65' selected={this.state.tmpSemesterYear == '65' ? true : false}>65</option>
                                <option value='66' selected={this.state.tmpSemesterYear == '66' ? true : false}>66</option>
                                <option value='67' selected={this.state.tmpSemesterYear == '67' ? true : false}>67</option>
                                <option value='68' selected={this.state.tmpSemesterYear == '68' ? true : false}>68</option>
                                <option value='69' selected={this.state.tmpSemesterYear == '69' ? true : false}>69</option>
                                <option value='70' selected={this.state.tmpSemesterYear == '70' ? true : false}>70</option>
                                <option value='71' selected={this.state.tmpSemesterYear == '71' ? true : false}>71</option>
                                <option value='72' selected={this.state.tmpSemesterYear == '72' ? true : false}>72</option>
                                <option value='73' selected={this.state.tmpSemesterYear == '73' ? true : false}>73</option>
                                <option value='74' selected={this.state.tmpSemesterYear == '74' ? true : false}>74</option>
                                <option value='75' selected={this.state.tmpSemesterYear == '75' ? true : false}>75</option>
                                <option value='76' selected={this.state.tmpSemesterYear == '76' ? true : false}>76</option>
                                <option value='77' selected={this.state.tmpSemesterYear == '77' ? true : false}>77</option>
                                <option value='78' selected={this.state.tmpSemesterYear == '78' ? true : false}>78</option>
                                <option value='79' selected={this.state.tmpSemesterYear == '79' ? true : false}>79</option>
                                <option value='80' selected={this.state.tmpSemesterYear == '80' ? true : false}>80</option>
                            </select></label>
                            <label id='status'>สถานะ<select class="selectpicker" name="semesterStatusNo" onChange={this.onChange} disabled={!this.state.flagEdit || this.state.semesterStatusNo === '1'}>
                                <option value='1' selected={this.state.semesterStatusNo == '1' ? true : false}>ภาคปัจจุบัน</option>
                                <option value='2' selected={this.state.semesterStatusNo == '2' ? true : false}>ภาคผ่านมาแล้ว</option>
                            </select></label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Semester);