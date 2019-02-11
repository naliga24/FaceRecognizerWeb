import { Redirect, Link } from 'react-router-dom';
import React, { Component } from 'react';
const rulogo = require('./../../../server/image_assets/ru_logo.gif')

class HomePage extends Component {
  render() {
    if (!sessionStorage.getItem('token')){ return (<Redirect to={'/'} />) }
    return (
      <div class='homepage'>
      <img id='img' alt='มหาวิทยาลัยรามคำแหง' 
        src={rulogo}  />
      </div>
    )
  }
}
export default HomePage;