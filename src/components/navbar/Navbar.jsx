import React, { useEffect, useState } from 'react'
import classes from './navbar.module.css'
import NavItem from './NavItem'
import personSvg from '../../assets/svg/person_FILL1_wght400_GRAD0_opsz24.svg'
import educationSvg from '../../assets/svg/school_FILL1_wght400_GRAD0_opsz24.svg'
import skillSvg from '../../assets/svg/build_FILL1_wght400_GRAD0_opsz24.svg'
import xpSvg from '../../assets/svg/work_FILL1_wght400_GRAD0_opsz24.svg'
import addMoreSvg from '../../assets/svg/add_circle_FILL1_wght400_GRAD0_opsz24.svg'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../store/store'

function Navbar(props) {
    const data = useSelector(state=>state.bioData.data)
    const { personal, education, skills, xp } = data
    const page = useSelector(state=>state.bioData.allSections)
    const restPages = page.slice( 5 )
    function checkValidity(target){
        console.log(target)
      return Object.values(target).every(Boolean)
    }
    const dispatch = useDispatch()
    function navClickHandler(e){
        props.onItemChoose(e.target.id);
        dispatch(bioActions.updateCurrentPage({target: e.target.target}))
    }
  return (
    <nav className={classes.navbarContainer}>
        <div className={classes.navbarBrand}>
            CV.Harbor
        </div>
        <ul className={classes.navUl}>
            <NavItem name={ personSvg } checked={personal.length != 0} id='Personal info' onClick={ navClickHandler } target='0'/>
            <NavItem name={ educationSvg } checked={education.length != 0} id='Education' onClick={ navClickHandler } target='1'/>
            <NavItem name={ skillSvg } checked={skills.length != 0} id='Skills' onClick={ navClickHandler } target='2'/>
            <NavItem name={ xpSvg } checked={xp.length != 0} id='Experience' onClick={ navClickHandler } target='3'/>
            <NavItem name={ addMoreSvg } id='Add more' onClick={ navClickHandler } target={ restPages.length > 0 ? '5' : '4' }/>
        </ul>
    </nav>
  )
}

export default Navbar