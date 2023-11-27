import React, { useState } from 'react'
import classes from './navbar.module.css'
import NavItem from './NavItem'
import personSvg from '../../assets/svg/person_FILL1_wght400_GRAD0_opsz24.svg'
import educationSvg from '../../assets/svg/school_FILL1_wght400_GRAD0_opsz24.svg'
import skillSvg from '../../assets/svg/build_FILL1_wght400_GRAD0_opsz24.svg'
import xpSvg from '../../assets/svg/work_FILL1_wght400_GRAD0_opsz24.svg'
import addMoreSvg from '../../assets/svg/add_circle_FILL1_wght400_GRAD0_opsz24.svg'

function Navbar(props) {
    function hoverHandleFunction(e){
        console.log( 'hov');
    }
  return (
    <nav className={classes.navbarContainer}>
        <div className={classes.navbarBrand}>
            CV.Harbor
        </div>
        <ul className={classes.navUl}>
            <NavItem name={ personSvg } checked={true} id='Personal info' />
            <NavItem name={ educationSvg } id='Education' />
            <NavItem name={ skillSvg } id='Skills' />
            <NavItem name={ xpSvg } id='Experience' />
            <NavItem name={ addMoreSvg } id='Add more' />
        </ul>
    </nav>
  )
}

export default Navbar